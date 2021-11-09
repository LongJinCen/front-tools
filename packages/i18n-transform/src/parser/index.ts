import { parse } from "@babel/parser";
import { TParserCallback } from "Src/types";
import babelGenerate from "@babel/generator";
import traverse from "@babel/traverse";
import plusTransform from "./plus-transform";
import { isIncludeChinese, isPlural, getPlural, splitText } from "./regular";
import { generateReplaceNode, judgeBinaryExpreIncludeChinese } from "./tool";
import {
  BinaryExpression,
  arrayExpression,
  numericLiteral,
  Expression,
  isTemplateElement,
  TemplateElement,
} from "@babel/types";

function I18nParser(
  source: string,
  sourceFilename: string,
  funcName: string,
  callback: TParserCallback
) {
  const AST = parse(source, {
    sourceFilename,
    sourceType: "module",
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
      const { before, middle: finalText, after } = splitText(node.value);
      // 处理复数
      if (isPlural(finalText)) {
        const { number, info } = getPlural(finalText);
        const key = callback(`{0}${info}`);
        const replaceNode = generateReplaceNode(
          key,
          before,
          after,
          funcName,
          arrayExpression([numericLiteral(number as number)])
        );
        path.replaceWith(replaceNode);
        path.skip();
        return;
      }
      // 处理普通字符串
      const key = callback(finalText);
      const replaceNode = generateReplaceNode(
        key,
        before,
        after,
        funcName,
        undefined
      );
      path.replaceWith(replaceNode);
      path.skip();
    },
    TemplateLiteral(path) {
      const { node, parent, parentPath } = path;
      // 不包含中文不处理
      const hasChinese = node.quasis.some((item) =>
        isIncludeChinese(item.value.cooked || item.value.raw)
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
        // 将 expressions 跟 quasis 部分合并到一起并进行排序
        const sortedElement = node.expressions
          .concat(node.quasis as any)
          .filter((item) => {
            if (
              isTemplateElement(item) &&
              !(item as TemplateElement).value.raw
            ) {
              return false;
            }
            return true;
          })
          .sort((a, b) => ((a.start || 0) > (b.start || 0) ? 1 : -1));
        // 生成源文案对应的 key
        let index = 0;
        sortedElement.forEach((item) => {
          if (isTemplateElement(item)) {
            beforeTranslate =
              beforeTranslate + (item as TemplateElement).value.cooked;
          } else {
            beforeTranslate = beforeTranslate + `{${index++}}`;
          }
        });
        const { before, middle: finalText, after } = splitText(beforeTranslate);
        const key = callback(finalText);
        const replaceNode = generateReplaceNode(
          key,
          before,
          after,
          funcName,
          arrayExpression(node.expressions as Expression[])
        );
        path.replaceWith(replaceNode);
        return;
      }
      // `发多少的` 普通模板字符串处理
      const {
        before,
        middle: finalText,
        after,
      } = splitText(node.quasis[0].value.cooked || node.quasis[0].value.raw);
      const key = callback(finalText);
      const replaceNode = generateReplaceNode(
        key,
        before,
        after,
        funcName,
        undefined
      );
      path.replaceWith(replaceNode);
      path.skip();
    },
    BinaryExpression(path) {
      if (path.node.operator !== "+") {
        return;
      }
      if (!judgeBinaryExpreIncludeChinese(path.node)) {
        return;
      }
      plusTransform(path, callback, funcName);
    },
  });
  return babelGenerate(AST);
}

export default I18nParser;
