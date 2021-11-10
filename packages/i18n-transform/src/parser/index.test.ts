import parser from "./index";

describe("parser 处理普通 case", () => {
  test("普通赋值", () => {
    const source = "const text = '测试'";
    const { code } = parser(
      source,
      "",
      "$at",
      () => "key",
      () => {}
    );
    expect(code).toBe('const text = $at("key");');
  });

  test("三元运算符", () => {
    const source = `
      const flag = true;
      const text = flag ? '发的说法是' : '浮点数的是'
    `;
    const { code } = parser(
      source,
      "",
      "$at",
      () => "key",
      () => {}
    );
    expect(code).toBe(
      `const flag = true;
const text = flag ? $at("key") : $at("key");`
    );
  });

  test("对象属性", () => {
    const source = `
      const obj = {
        name: '测试',
        info: { name: '测试' }
      }
    `;
    const { code } = parser(
      source,
      "",
      "$at",
      () => "key",
      () => {}
    );
    expect(code).toBe(`const obj = {
  name: $at("key"),
  info: {
    name: $at("key")
  }
};`);
  });

  test("或运算符", () => {
    const source = `
      const msg = '';
      const text = msg || '测试测试'
    `;
    const { code } = parser(
      source,
      "",
      "$at",
      () => "key",
      () => {}
    );
    expect(code).toBe(`const msg = '';
const text = msg || $at("key");`);
  });

  test("与运算符", () => {
    const source = `
      const msg = '';
      const text = msg && '测试测试'
    `;
    const { code } = parser(
      source,
      "",
      "$at",
      () => "key",
      () => {}
    );
    expect(code).toBe(`const msg = '';
const text = msg && $at("key");`);
  });

  test("纯模板字符串", () => {
    const source = "const text = `测试`";
    const { code } = parser(
      source,
      "",
      "$at",
      () => "key",
      () => {}
    );
    expect(code).toBe('const text = $at("key");');
  });

  test("字符串中带空格、换行", () => {
    const source = "const text = ' \\n 测试 \\n'";
    const { code } = parser(
      source,
      "",
      "$at",
      () => "key",
      () => {}
    );
    expect(code).toBe('const text = " \\n " + $at("key") + " \\n";');
  });
});

describe("parser 处理普通字符串的特殊 case", () => {
  test("普通字符串相加", () => {
    const source = "const text = '测试1' + '测试2'";
    const { code } = parser(
      source,
      "",
      "$at",
      () => "key",
      () => {}
    );
    expect(code).toBe('const text = $at("key");');
  });

  test("普通字符串相加中带变量、表达式等", () => {
    const source = `
      const value = 10
      const arr = [1, 2, 3]
      const text = '测试' + value + '测试1' + (arr.length || 0) + '测试2'
    `;
    const { code } = parser(
      source,
      "",
      "$at",
      () => "key",
      () => {}
    );
    expect(code).toBe(`const value = 10;
const arr = [1, 2, 3];
const text = $at("key", [value, arr.length || 0]);`);
  });
});

describe("parser 处理模板字符串的特殊 case", () => {
  test("纯模板字符串相加不会被处理，应该合并", () => {
    const source = "const text = `测试1` + `测试2`";
    const { code } = parser(
      source,
      "",
      "$at",
      () => "key",
      () => {}
    );
    expect(code).toBe('const text = $at("key") + $at("key");');
  });

  test("模板字符串带变量", () => {
    const source = `
      const value = 10
      const arr = [1, 2, 3]
      const text = \`测试\${value}测试1\${(arr.length || 0)}测试2\`
    `;
    const { code } = parser(
      source,
      "",
      "$at",
      () => "key",
      () => {}
    );
    expect(code).toBe(`const value = 10;
const arr = [1, 2, 3];
const text = $at("key", [value, arr.length || 0]);`);
  });
});
