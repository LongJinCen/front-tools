export type Mode =
  | "normal" // 拉取正式环境
  | "test" // 拉取测试环境
  | "gray"; // 拉取灰度环境

export interface IOptions {
  // starling项目唯一apikey
  apikey: string;
  mode: Mode;
  namespace: string[];
  lang: string[];
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

export interface IStoreNoTranslate {
  // 文件名
  [key: string]: {
    // 翻译文案对应的 key
    [key: string]: string;
  };
}
