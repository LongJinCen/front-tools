import { LoaderContext } from "webpack";
import parser from "../parser";
import LangManager from "../lang-manager";

function I18nTransformLoader(this: LoaderContext<any>, source: string) {
  const { funcName = "$at", test } = this.getOptions();
  if (test && !test(this.resourcePath)) {
    return source;
  }
  if (/node_modules/.test(this.resourcePath)) {
    return source;
  }
  const langManager: LangManager = (this._compiler as any).langManager;
  const filename = this.resourcePath;
  const transformedSurce = parser(source, filename, funcName, (text) =>
    langManager.getKeyByText(text, filename)
  );
  return transformedSurce.code;
}

export default I18nTransformLoader;
