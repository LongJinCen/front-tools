import xslx from "node-xlsx";
import { Plugin } from "rollup";
import { forEach } from "lodash";
import { Buffer } from "buffer";
import { defaultOptions } from "./../const";
import LangManager from "../lang-manager";
import { IViteOptionsInternal, IViteOptionsOut } from "../types";
import parser from "../parser";

const i18nTransform = (options: IViteOptionsOut): Plugin => {
  const normalizedOptions = Object.assign(
    defaultOptions,
    options
  ) as IViteOptionsInternal;
  const {
    apikey,
    namespace,
    lang,
    mode,
    funcName = "$at",
    langFileName,
    langGlobalFuncName,
    withOutTransFileName,
  } = normalizedOptions;
  const langManager = new LangManager(namespace, lang, apikey, mode);
  return {
    name: "i18n-transform",
    async buildStart() {
      return new Promise<void>((resolve, reject) => {
        langManager
          .loadData()
          .then(() => resolve())
          .catch((error) => reject(error));
      });
    },
    buildEnd(error) {
      // 语言包生成
      const storeUsedTranslated = JSON.stringify(
        langManager.storeUsedTranslated
      );
      const storeUsedNoTranslated = JSON.stringify(
        langManager.storeUsedNoTranslated
      );
      const storeUsed = JSON.stringify(langManager.storeUsed);
      // 生成语言包
      this.emitFile({
        type: "asset",
        fileName: `assets/${langFileName}`,
        source: `var ${langGlobalFuncName} = ${storeUsedTranslated}`,
      });
      // 所有的替换记录，包括已翻译跟未翻译的
      this.emitFile({
        type: "asset",
        fileName: `replace-record.json`,
        source: storeUsed,
      });
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
      const noDuplicate = langManager.getNoTranslateWithOutDuplicate();
      forEach(noDuplicate, (value, key) => {
        excelData.push([key, value]);
      });
      const arrayBuffer = xslx.build([
        {
          name: withOutTransFileName,
          data: excelData,
        },
      ]);
      const uint8Array = new Uint8Array(Buffer.from(arrayBuffer));
      this.emitFile({
        type: "asset",
        fileName: `${withOutTransFileName}.xlsx`,
        source: uint8Array,
      });
      // 生成未翻译的文案，按文件维度划分，方便开发人员查看
      this.emitFile({
        type: "asset",
        fileName: `${withOutTransFileName}.json`,
        source: storeUsedNoTranslated,
      });
    },
    transform(code: string, id: string) {
      if (/node_modules/.test(id)) {
        return code;
      }
      if (!/\.(js|ts|vue)$/.test(id)) {
        return code;
      }
      if (/\/tools\/machine-audit\.ts/.test(id)) {
        console.log("enter");
      }
      // 通过 babel 进行转换
      const callback = (text: string) => langManager.getKeyByText(text, id);
      const transformedSurce = parser(code, id, funcName, callback);
      return transformedSurce.code;
    },
  };
};

export default i18nTransform;
