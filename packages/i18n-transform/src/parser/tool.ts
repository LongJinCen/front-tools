import {
  callExpression,
  identifier,
  stringLiteral,
  binaryExpression,
  BinaryExpression,
  isBinaryExpression,
  ArrayExpression,
  Node,
  isStringLiteral,
} from "@babel/types";
import { isIncludeChinese } from "./regular";

/**
 * @description 去掉字符串两边的空格和换行符
 *  - vue 模板中的字符串在经过编译后两边会存在空格跟字符串的情况
 * @param str
 */
export const normalizeString = (str: string): string =>
  str.replace("\n", "").trim();

/**
 * @param key 翻译文案对应的 key
 * @param extraParams 如果有翻译插值，需要通过 [xx,xxx] 的方式传入
 * @param before 前面是否有包含空格跟换行符的字符串
 * @param after 后面是否有包含空格跟换行符的字符串
 * @returns 替换的节点
 */
export const generateReplaceNode = (
  key: string,
  before: string,
  after: string,
  funcName: string,
  extraParams?: ArrayExpression
) => {
  let callFunc;
  if (extraParams) {
    callFunc = callExpression(identifier(funcName), [
      stringLiteral(key),
      extraParams,
    ]);
  } else {
    callFunc = callExpression(identifier(funcName), [stringLiteral(key)]);
  }
  let replaceNode;
  if (before) {
    replaceNode = binaryExpression("+", stringLiteral(before), callFunc);
  } else {
    replaceNode = callFunc;
  }
  if (after) {
    replaceNode = binaryExpression("+", replaceNode, stringLiteral(after));
  }
  return replaceNode;
};

/**
 * 判断相加运算中是否包含中文
 * @param node
 */
export const judgeBinaryExpreIncludeChinese = (
  node: BinaryExpression
): boolean => {
  let result = false;
  function traverse(_node: Node | undefined | null) {
    if (!_node) {
      return;
    }
    if (isBinaryExpression(_node)) {
      traverse(_node.left);
      traverse(_node.right);
    }
    if (isStringLiteral(_node) && isIncludeChinese(_node.value)) {
      result = true;
    }
  }
  traverse(node);
  return result;
};

// (function () {
//   var matched = document.cookie.match(/locale=(\w+)/);
//   var locale = (matched && matched[1]) || "zh";
//   window.$at = function (key, args) {
//     args = args || [];
//     var keys = [locale].concat(key.split("."));
//     function findTranslated(lang) {
//       var flag = true;
//       return keys.reduce(function (pre, cur) {
//         if (!flag || !pre[cur]) {
//           flag = false;
//           return;
//         }
//         return pre[cur];
//       }, lang);
//     }
//     var translated =
//       findTranslated(window.platform_component_lang) ||
//       findTranslated(window.platform_future_lang);
//     var index = 0;
//     return translated.replace(/\{\d+?\}/g, function () {
//       return args[index++];
//     });
//   };
// })();
