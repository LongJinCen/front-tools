import xslx from "node-xlsx";
import { forEach } from "lodash";
import { Buffer } from "buffer";
import { Plugin } from "vite";
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
    verbose,
  } = normalizedOptions;
  const langManager = new LangManager(namespace, lang, apikey, mode);
  let base: string;
  return {
    name: "i18n-transform",
    async buildStart() {
      await langManager.loadData();
    },
    configResolved(config) {
      base = config.base || "";
    },
    async buildEnd(error) {
      // 翻译未翻译的语言
      await langManager.handleNoTranslate();

      // 生成语言包
      const storeUsedTranslated = JSON.stringify(
        langManager.storeUsedTranslated
      );
      this.emitFile({
        type: "asset",
        fileName: langFileName,
        source: `var ${langGlobalFuncName} = ${storeUsedTranslated}`,
      });

      if (!verbose) {
        return;
      }

      // 所有的替换记录，包括已翻译跟未翻译的
      const storeUsed = JSON.stringify(langManager.storeUsed);
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
      const storeUsedNoTranslated = langManager.storeUsedNoTranslated;
      forEach(storeUsedNoTranslated, (record) => {
        forEach(record, (value, key) => {
          excelData.push([key, value]);
        });
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
        source: JSON.stringify(storeUsedNoTranslated),
      });

      // 生成包含比较运算的记录文件
      const storeEqualRecord = JSON.stringify(langManager.storeEqualRecord);
      this.emitFile({
        type: "asset",
        fileName: `equal-record.json`,
        source: storeEqualRecord,
      });
    },
    transform(code: string, id: string) {
      if (/node_modules/.test(id)) {
        return code;
      }
      if (!/\.(js|ts|vue)$/.test(id)) {
        return code;
      }
      // 通过 babel 进行转换
      const translateCb = (text: string) => langManager.getKeyByText(text, id);
      const equalRecordCb = (line: number, cloumn: number) =>
        langManager.recordRequal(id, line, cloumn);
      const transformedSurce = parser(
        code,
        id,
        funcName,
        translateCb,
        equalRecordCb
      );
      return transformedSurce.code;
    },
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: `${base}${langFileName}`,
            },
          },
        ],
      };
    },
  };
};

export default i18nTransform;
