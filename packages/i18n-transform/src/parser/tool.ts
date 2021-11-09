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
export const normalizeString = (str: string) => str.replace("\n", "").trim();

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
  function traverse(node: Node | undefined | null) {
    if (!node) {
      return;
    }
    if (isBinaryExpression(node)) {
      traverse(node.left);
      traverse(node.right);
    }
    if (isStringLiteral(node) && isIncludeChinese(node.value)) {
      result = true;
    }
  }
  traverse(node);
  return result;
};
