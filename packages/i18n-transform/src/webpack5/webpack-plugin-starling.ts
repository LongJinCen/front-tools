import { forEach } from "lodash";
import type Webpack from "webpack";
import xslx from "node-xlsx";
import { Buffer } from "buffer";
import LangManager from "../lang-manager";
import { IWebpackOptionsInternal, IWebpackOptionsOut } from "../types";
import { defaultOptions } from "../const";

class WebpackPluginStarling {
  defaultOptions = defaultOptions;
  options: IWebpackOptionsInternal;
  langManager!: LangManager;

  constructor(options: IWebpackOptionsOut) {
    this.options = Object.assign(this.defaultOptions, options);
    if (!this.options.lang.includes("zh")) {
      this.options.lang.push("zh");
    }
    this.langManager = new LangManager(
      this.options.namespace,
      this.options.lang,
      this.options.apikey,
      this.options.mode
    );
  }

  apply(compiler: Webpack.Compiler) {
    // 拉取 starling 数据，挂载到 compiler 上
    compiler.hooks.beforeRun.tapAsync(
      "WebpackPluginStarling",
      async (compiler, callback) => {
        (compiler as any).langManager = this.langManager;
        try {
          await this.langManager.loadData();
        } catch (error: any) {
          callback(error);
        }
        callback();
      }
    );
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;
    // 生成 starling 语言包
    compiler.hooks.thisCompilation.tap(
      "WebpackPluginStarling",
      (compilation) => {
        compilation.hooks.processAssets.tapAsync(
          {
            name: "WebpackPluginStarling",
            stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
          },
          async (assets, callback) => {
            await this.langManager.handleNoTranslate();
            const storeUsedTranslated = JSON.stringify(
              this.langManager.storeUsedTranslated
            );
            const storeUsedNoTranslated = JSON.stringify(
              this.langManager.storeUsedNoTranslated
            );
            const storeUsed = JSON.stringify(this.langManager.storeUsed);
            // 生成语言包
            compilation.emitAsset(
              this.options.langFileName,
              new RawSource(
                `var ${this.options.langGlobalFuncName} = ${storeUsedTranslated}`
              )
            );
            // 所有的替换记录，包括已翻译跟未翻译的
            compilation.emitAsset(
              "replace-record.json",
              new RawSource(storeUsed)
            );
            // 生成未翻译的 excel，可用于上传 starling
            const excelData: Array<string[]> = [];
            excelData.push([
              "keys",
              "source",
              "length limit",
              "context",
              "en",
              "ja",
              "zh",
            ]);
            const noDuplicate =
              this.langManager.getNoTranslateWithOutDuplicate();
            forEach(noDuplicate, (value, key) => {
              excelData.push([key, value]);
            });
            const arrayBuffer = xslx.build([
              {
                name: this.options.withOutTransFileName,
                data: excelData,
              },
            ]);
            compilation.emitAsset(
              `${this.options.withOutTransFileName}.xlsx`,
              new RawSource(Buffer.from(arrayBuffer))
            );
            // 生成未翻译的文案，按文件维度划分，方便开发人员查看
            compilation.emitAsset(
              `${this.options.withOutTransFileName}.json`,
              new RawSource(storeUsedNoTranslated)
            );
            callback();
          }
        );
      }
    );
  }
}

export default WebpackPluginStarling;
