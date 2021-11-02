export interface IOptions {
  projectName: string;
  namespace: string[];
  lang: string[];
}

export interface IStore {
  [key: string]: {
    // 语言
    [key: string]: Array<Map<string, string>>; // 命名空间
  };
}

export interface IStoreUsed {
  [key: string]: {
    // 语言
    [key: string]: Record<string, string>; // 命名空间
  };
}

export interface IStoreNoTranslate {
  [key: string]: {
    // 文件名
    [key: string]: string; // key
  };
}
