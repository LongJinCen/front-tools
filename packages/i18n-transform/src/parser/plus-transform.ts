import { NodePath } from "@babel/traverse";
import {
  arrayExpression,
  BinaryExpression,
  isStringLiteral,
  isBinaryExpression,
} from "@babel/types";
import { TParserTranslateCb } from "Src/types";
import { splitText } from "./regular";
import { generateReplaceNode } from "./tool";

/**
 * @description 处理字符串相加的情况: '总共' + value + '个西瓜和' + value1[index] + '南瓜' + a || b
 *  - 源文案：'总共${0}个西瓜和{1}个南瓜{2}'
 *  - 替换后: $at('key', [value, value1[index], a||b])
 * @param path
 * @returns
 */
function plusTransform(
  path: NodePath<BinaryExpression>,
  callback: TParserTranslateCb,
  funcName: string
): void {
  // 字符串数组
  let textArr: string[] = [];
  // 插值
  const variable = arrayExpression();
  // 遍历 BinaryExpression
  let current = path.node;
  while (current) {
    if (isStringLiteral(current.right)) {
      textArr.unshift(current.right.value);
    } else if (current.right) {
      variable.elements.unshift(current.right);
      textArr.unshift("{}");
    }
    if (!isBinaryExpression(current.left)) {
      if (isStringLiteral(current.left)) {
        textArr.unshift(current.left.value);
      } else if (current.left) {
        variable.elements.unshift(current.left as any);
        textArr.unshift("{}");
      }
    }
    current = current.left as BinaryExpression;
  }
  // 源文案
  let beforeTranslate = "";
  let index = 0;
  textArr.forEach((item) => {
    if (item === "{}") {
      beforeTranslate += `{${index++}}`;
    } else {
      beforeTranslate += item;
    }
  });
  // 源文案前后可能会存在空格、换行符，需要处理
  const { before, middle: finalText, after } = splitText(beforeTranslate);
  // 通过源文案得到 key
  const key = callback(finalText);
  // $at('key', [xxx])
  const replaceNode = generateReplaceNode(
    key,
    before,
    after,
    funcName,
    variable.elements.length ? variable : undefined
  );
  // 将字符串相加替换为 $at('key', [xxx])
  path.replaceWith(replaceNode);
}

export default plusTransform;
