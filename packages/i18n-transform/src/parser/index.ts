import { parse } from "@babel/parser";
import { TParserCallback } from "Src/types";
import babelGenerate from "@babel/generator";
import traverse from "@babel/traverse";
import plusTransform from "./plus-transform";
import { isIncludeChinese, isPlural, getPlural } from "./regular";
import { normalizeString } from "./tool";
import {
  BinaryExpression,
  callExpression,
  identifier,
  stringLiteral,
  arrayExpression,
  numericLiteral,
} from "@babel/types";

function I18nParser(
  source: string,
  sourceFilename: string,
  callback: TParserCallback
) {
  const AST = parse(source, {
    sourceFilename,
  });
  traverse(AST, {
    StringLiteral(path) {
      const { node, parent, parentPath } = path;
      // 不包含中文不处理
      if (!isIncludeChinese(node.value)) {
        return;
      }
      // 比较运算不处理
      if (
        parentPath.isBinaryExpression() &&
        ["==", "==="].includes((parent as BinaryExpression).operator)
      ) {
        return;
      }
      // 处理相加运算符
      if (
        parentPath.isBinaryExpression() &&
        (parent as BinaryExpression).operator === "+"
      ) {
        plusTransform(path, callback);
        return;
      }
      // 处理复数
      if (isPlural(node.value)) {
        const { number, info } = getPlural(node.value);
        const key = callback(`{0}${info}`);
        path.replaceWith(
          callExpression(identifier("$at"), [
            stringLiteral(key),
            arrayExpression([numericLiteral(number as number)]),
          ])
        );
        return;
      }
      // 处理普通字符串
      const str = normalizeString(node.value);
      const key = callback(str);
      path.replaceWith(callExpression(identifier("$at"), [stringLiteral(key)]));
    },
    TemplateLiteral(path) {
      const { node, parent, parentPath } = path;
      // 不包含中文不处理
      const hasChinese = node.quasis.some((item) =>
        isIncludeChinese(item.value.raw)
      );
      if (!hasChinese) {
        return;
      }
      // 比较运算不处理
      if (
        parentPath.isBinaryExpression() &&
        ["==", "==="].includes((parent as BinaryExpression).operator)
      ) {
        return;
      }
      // `发顺丰${value}` 模板字符串包含属性的处理
      if (node.expressions.length) {
        let beforeTranslate = "";
        node.quasis.forEach((item, index) => {
          beforeTranslate = beforeTranslate + item + `{${index}}`;
        });
        const key = callback(beforeTranslate);
        path.replaceWith(
          callExpression(identifier("$at"), [
            stringLiteral(key),
            node.expressions as any,
          ])
        );
      }
      // `发多少的` 普通模板字符串处理
      const key = callback(node.quasis[0].value.raw);
      path.replaceWith(callExpression(identifier("$at"), [stringLiteral(key)]));
    },
  });
  return babelGenerate(AST);
}

export default I18nParser;
