/**
 * @description 包含中文的字符串
 * @param text
 * @returns
 */
export const isIncludeChinese = (text: string): boolean =>
  /[\u4e00-\u9fa5]+/.test(text);

/**
 * 纯中文的字符串
 * @param text
 * @returns
 */
export const isChinese = (text: string): boolean =>
  /^[\u4e00-\u9fa5]+$/.test(text);

/**
 * @description 判断是否是复数，
 *  - 以数字开头
 *  - 非数字部分不能长度不超过5
 * @param text
 * @returns
 */
export const isPlural = (text: string): boolean => {
  if (!/^\d+/.test(text)) {
    return false;
  }
  const textWithOutNumber = /^\d+([\u4e00-\u9fa5]+)/.exec(text);
  if (!textWithOutNumber) {
    return false;
  }
  if (textWithOutNumber[1].length > 5) {
    return false;
  }
  return true;
};

/**
 * @description 匹配复数中非数字部分
 * @param text
 * @returns
 */
export const getPlural = (text: string) => {
  const matched = /^(\d+)([\u4e00-\u9fa5]+)/.exec(text);
  return {
    number: matched && +matched[1],
    info: matched && matched[2],
  };
};

/**
 * @de  将 text 分割为三部分，分别开头的空格和换行符、中间的文案部分、末尾的空格和换行符
 * @param text
 */
export const splitText = (text: string) => {
  const matched = /^(\s*)([\w\W]+?)(\s*)$/.exec(text) as RegExpMatchArray;

  return {
    before: matched[1],
    middle: matched[2],
    after: matched[3],
  };
};
