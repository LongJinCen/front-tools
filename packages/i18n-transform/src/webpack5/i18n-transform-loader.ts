import { LoaderContext } from "webpack";
import parser from "../parser";
import LangManager from "../lang-manager";

function I18nTransformLoader(this: LoaderContext<any>, source: string) {
  if (/node_modules/.test(this.resourcePath)) {
    return source;
  }
  const langManager: LangManager = (this._compiler as any).langManager;
  const filename = this.resourcePath;
  const transformedSurce = parser(source, filename, (text) =>
    langManager.getKeyByText(text, filename)
  );
  return transformedSurce.code;
}

export default I18nTransformLoader;
