/**
 * @description 去掉字符串两边的空格和换行符
 *  - vue 模板中的字符串在经过编译后两边会存在空格跟字符串的情况
 * @param str
 */
export const normalizeString = (str: string) => str.replace("\n", "").trim();
