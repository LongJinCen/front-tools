import { Mode } from "./types";

export const defaultOptions = {
  apikey: "",
  namespace: [],
  mode: "normal" as Mode,
  lang: ["zh", "en", "ja"],
  langFileName: "lang.js",
  langGlobalFuncName: "global_lang_package",
  withOutTransFileName: "not-translate",
  verbose: false,
};
