import { Mode } from "./types";

export const defaultOptions = {
  apikey: "",
  namespace: [],
  mode: "normal" as Mode,
  lang: ["zh", "en", "ja"],
  langFileName: "lang.js",
  withOutTransFileName: "not-translate",
};
