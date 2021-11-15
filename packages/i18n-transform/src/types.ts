export type TMode =
  | "normal" // 拉取正式环境
  | "test" // 拉取测试环境
  | "gray"; // 拉取灰度环境

export interface IWebpackOptionsInternal {
  // starling项目唯一apikey
  apikey: string;
  namespace: string[];
  mode: TMode;
  lang: string[];
  langFileName: string;
  langGlobalFuncName: string;
  withOutTransFileName: string;
  verbose: boolean;
}

export interface IWebpackOptionsOut {
  // starling项目唯一apikey
  apikey: string;
  namespace: string[];
  mode?: TMode;
  lang?: string[];
  langFileName?: string;
  langGlobalFuncName?: string;
  withOutTransFileName?: string;
  verbose?: boolean;
}

export interface IViteOptionsInternal extends IWebpackOptionsInternal {
  funcName: string;
}

export interface IViteOptionsOut extends IWebpackOptionsOut {
  funcName?: string;
  test?: (path: string) => boolean;
}

export interface IStore {
  // 语言
  [key: string]: {
    // 命名空间
    [key: string]: [Map<string, string>, Map<string, string>];
  };
}

export interface IStoreUsed {
  // 语言
  [key: string]: {
    // 命名空间
    [key: string]: Record<string, string>;
  };
}

export interface IStoreRecordEqual {
  // 文件名
  [key: string]: Array<{ line: number; column: number }>;
}

export interface IStoreRecord {
  // 文件名
  [key: string]: {
    // 翻译文案对应的 key
    [key: string]: string;
  };
}

export type TParserTranslateCb = (text: string) => string;

export type TParserEqualCb = (line: number, cloumn: number) => void;

export interface ITranslateResult {
  source: string;
  translated: string;
}
