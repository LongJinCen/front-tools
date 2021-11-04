import parser from "./index";

const code = `
  const b = 1
  const a1 = b ? '发的说法是' : '浮点数的是'
  const a2 = '范德萨范德萨'
  const a3 = {
      b: '范德萨范德萨',
      c: {
          d: '范德萨范德萨'
      }
  }
  a2 = '范德萨范德萨'
  const a4 = msg || '范德萨范德萨'
  const d = msg && '范德萨范德萨'
`;

const code1 = `
  const e = '字符串' + b + '相加' + (b || 2) + '带表达式'
`;

const code2 =
  "const value = { name: '' }; const a = `插值的${value.name}-模板字符串-${value.name}`; const b = `纯模板字符串`;";

const code3 = "const text = '\\n 带空格和换行符：\\n'";

const code4 =
  "const value = false; const a = `已反馈：${value ? '准确' : '不准确'}`";

const code5 =
  "const value = 1; const placeholder = `请输入文本摘要，限${value}-${value}字。摘要覆盖越多业务相关词，将能传递越多有效信息。如：新闻客户端免费下载`";

const result = parser(code5, "", () => "key");
console.log(result);
