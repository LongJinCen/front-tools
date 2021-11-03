import axios from "axios";
import { forEach, set, get } from "lodash";
import { IStore, IStoreNoTranslate, IStoreUsed } from "./types";

class LangManager {
  public store: IStore = {};
  public storeUsed: IStoreUsed = {};
  public storeNoTranslate: IStoreNoTranslate = {};

  constructor(
    public namespace: string[],
    public lang: string[],
    public apikey: string,
    public mode: string
  ) {
    // 初始化 store
    lang.forEach((locale) => {
      this.store[locale] = {};
      this.storeUsed[locale] = {};
      namespace.forEach((space) => {
        // 使用 map 降低时间复杂度
        this.store[locale][space] = [new Map(), new Map()];
        this.storeUsed[locale][space] = {};
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
   * 根据中文获取对应的 key。会遍历所有的命名空间，在任何一个空间找到文案就停止
   * @param text
   * @returns string
   */
  getKeyByText(text: string, filePath: string) {
    let keyPath = "";
    // 从中文下的命名空间中查找即可
    forEach(this.store.zh, (value, namespace) => {
      const current = value[1].get(text);
      if (current) {
        keyPath = `${namespace}.${current}`;
        return false;
      }
    });
    // 没有则生成一个 key, 将未翻译的文案存储起来, 默认存储到 namespace[0] 中
    if (!keyPath) {
      const newKey = `${Date.now().toString().slice(-6)}`;
      keyPath = `${this.namespace[0]}.${newKey}`;
      (this.storeNoTranslate[filePath] ||
        (this.storeNoTranslate[filePath] = {}))[newKey] = text;
      // 每次访问 getKeyByText 传入的文案表示当前需要使用
    } else {
      this.copyStore2UsedStore(keyPath);
    }
    return keyPath;
  }

  /**
   * 将使用到的文案 copy 到 storeUsed 当中
   * @param keyPath
   */
  copyStore2UsedStore(keyPath: string) {
    forEach(this.store, (value, lang) => {
      const translated = get(value, keyPath);
      set(this.storeUsed, `${lang}.${keyPath}`, translated);
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
}

export default LangManager;
