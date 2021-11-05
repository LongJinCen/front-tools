import type Webpack from "webpack";
import LangManager from "../lang-manager";
import { IOptions, Mode } from "../types";

class WebpackPluginStarling {
  defaultOptions = {
    apikey: "",
    mode: "normal" as Mode,
    namespace: [],
    lang: ["zh", "en", "ja"],
  };
  options: IOptions;
  langManager!: LangManager;

  constructor(options = {}) {
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
            const storeUsedTranslated = JSON.stringify(
              this.langManager.storeUsedTranslated
            );
            const storeUsedNoTranslated = JSON.stringify(
              this.langManager.storeUsedNoTranslated
            );
            const storeUsed = JSON.stringify(this.langManager.storeUsed);

            compilation.emitAsset(
              "lang.json",
              new RawSource(storeUsedTranslated)
            );
            compilation.emitAsset(
              "file-translate-record-no-translate.json",
              new RawSource(storeUsedNoTranslated)
            );
            compilation.emitAsset(
              "file-translate-record-all.json",
              new RawSource(storeUsed)
            );
            callback();
          }
        );
      }
    );
  }
}

export default WebpackPluginStarling;
