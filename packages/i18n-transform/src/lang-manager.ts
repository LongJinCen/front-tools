import axios from "axios";
import { forEach, set, get } from "lodash";
import {
  IStore,
  IStoreRecord,
  IStoreRecordEqual,
  IStoreUsed,
  ITranslateResult,
} from "./types";

class LangManager {
  // store 用于查找，存储初始化接口返回的原始数据
  public store: IStore = {};
  // 记录已翻译的文案
  public storeUsedTranslated: IStoreUsed = {};
  // 记录未翻译的文案
  public storeUsedNoTranslated: IStoreRecord = {};
  // 所有的替换记录，按文件维度换分，包含已翻译和未翻译的
  public storeUsed: IStoreRecord = {};
  // 记录包含中文等运算的位置
  public storeEqualRecord: IStoreRecordEqual = {};

  constructor(
    public namespace: string[],
    public lang: string[],
    public apikey: string,
    public mode: string
  ) {
    // 初始化 store
    lang.forEach((locale) => {
      this.store[locale] = {};
      this.storeUsedTranslated[locale] = {};
      namespace.forEach((space) => {
        // 使用 map 降低时间复杂度
        this.store[locale][space] = [new Map(), new Map()];
        this.storeUsedTranslated[locale][space] = {};
      });
    });
  }

  /**
   * @description 添加语言包
   * @param namepspace 命名空间
   * @param lang 语言类型
   * @param source 语言包
   */
  addLangPackage(
    namepspace: string,
    lang: string,
    source: Record<string, string>
  ) {
    const langMaps = this.store[lang][namepspace];
    forEach(source, (value, key) => {
      langMaps[0].set(key, value);
      langMaps[1].set(value, key);
    });
  }

  /**
   * 记录文件中包含比较运算的代码位置
   * @param filePath
   * @param line
   * @param cloumn
   */
  recordRequal(filePath: string, line: number, cloumn: number) {
    if (!this.storeEqualRecord[filePath]) {
      this.storeEqualRecord[filePath] = [];
    }
    this.storeEqualRecord[filePath].push({
      line: line,
      column: cloumn,
    });
  }

  /**
   * 根据中文获取对应的 key。会遍历所有的命名空间，在任何一个空间找到文案就停止
   * @param text
   * @returns string
   */
  getKeyByText(text: string, filePath: string) {
    let keyPath = "";
    let key = "";
    // 从中文下的命名空间中查找即可
    forEach(this.store.zh, (value, namespace) => {
      const current = value[1].get(text);
      if (current) {
        key = current;
        keyPath = `${namespace}.${current}`;
        return false;
      }
    });
    // 没有则生成一个 key, 将未翻译的文案存储起来, 默认存储到 namespace[0] 中
    if (!keyPath) {
      const random = Math.random().toString().slice(-5);
      const newKey = (key = `${random}_${Date.now().toString().slice(-6)}`);
      keyPath = `${this.namespace[0]}.${newKey}`;
      // 记录未翻译的文案跟对应的 key。方便后续机翻和输出未翻译的记录
      (this.storeUsedNoTranslated[filePath] ||
        (this.storeUsedNoTranslated[filePath] = {}))[newKey] = text;
      // 每次访问 getKeyByText 传入的文案表示当前需要使用
    } else {
      this.copyStore2UsedStore(keyPath);
    }
    // 记录每个文件的翻译文案跟对应的 key
    (this.storeUsed[filePath] || (this.storeUsed[filePath] = {}))[key] = text;
    return keyPath;
  }

  /**
   * 将使用到的文案 copy 到 storeUsedTranslated 当中
   * @param keyPath
   */
  copyStore2UsedStore(keyPath: string) {
    forEach(this.store, (value, lang) => {
      const keyArr = keyPath.split(".");
      const prePath = keyArr.slice(0, keyArr.length - 1).join(".");
      const finalKey = keyArr.slice(keyArr.length - 1, keyArr.length).join("");
      const translated = get(value, prePath)[0].get(finalKey);
      set(this.storeUsedTranslated, `${lang}.${keyPath}`, translated);
    });
  }

  /**
   * 拉取语言包的 url
   * @param namespace
   * @param lang
   */
  starlingUrl(namespace: string, lang: string) {
    return `https://starling.snssdk.com/check_and_get_text/${this.apikey}/${this.mode}/${namespace}?lang=${lang}`;
  }

  /**
   * @description 根据 namespace 跟 Lang 拉取文案
   */
  async loadData() {
    for (const space of this.namespace) {
      for (const locale of this.lang) {
        const {
          data: {
            message: { Data },
          },
        } = await axios({
          url: this.starlingUrl(space, locale),
        });
        this.addLangPackage(space, locale, Data);

        if (!Data) {
          throw new Error(`
          拉取文案失败：
            - 空间: ${space}
            - 语言：${locale}
          `);
        }
      }
    }
  }

  /**
   * storeUsedNoTranslated 中会存在重复的中文文案，做去重处理
   */
  getNoTranslateWithOutDuplicate() {
    const record = new Map();
    const result: Record<string, string> = {};
    forEach(this.storeUsedNoTranslated, (value) => {
      forEach(value, (text, key) => {
        if (record.get(text)) {
          return;
        }
        result[key] = text;
        record.set(text, key);
      });
    });
    return result;
  }

  /**
   * 将 storeUsedNoTranslated 未翻译的文案进行翻译 存储到 storeUsedTranslated 中
   */
  async handleNoTranslate() {
    const record = new Map<string, string>();
    const textList: string[] = [];
    forEach(this.storeUsedNoTranslated, (value) => {
      forEach(value, (text, key) => {
        record.set(text, key);
        textList.push(text);
      });
    });
    const translateLang = this.lang.slice(1);
    for (let i = 0; i < translateLang.length; i++) {
      const { data } = await axios({
        url: "https://cloudapi.bytedance.net/faas/services/tttrpy/invoke/translate",
        method: "POST",
        data: {
          textList,
          targetLang: translateLang[i],
        },
      });
      (data as Array<ITranslateResult>).forEach((item) => {
        const key = record.get(item.source) as string;
        this.storeUsedTranslated[translateLang[i]][this.namespace[0]][key] =
          item.translated;
      });
    }
  }
}

export default LangManager;
