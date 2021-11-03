// 包含中文的字符串
export const isIncludeChinese = (text: string) => /[\u4e00-\u9fa5]+/.test(text);

// 纯中文的字符串
export const isChinese = (text: string) => /^[\u4e00-\u9fa5]+$/.test(text);

/**
 * @description 判断是否是复数，
 *  - 以数字开头
 *  - 非数字部分不能长度不超过5
 * @param text
 * @returns
 */
export const isPlural = (text: string) => {
  if (!/^\d+/.test(text)) {
    return false;
  }
  const textWithOutNumber = text.match(/^\d+(\w\W+)/);
  if (!textWithOutNumber) {
    return false;
  }
  if (textWithOutNumber[1].length > 5) {
    return false;
  }
  return true;
};

// 匹配复数中非数字部分
export const getPlural = (text: string) => {
  const matched = text.match(/^(\d+)(\w\W+)/);
  return {
    number: matched && +matched[1],
    info: matched && matched[2],
  };
};
