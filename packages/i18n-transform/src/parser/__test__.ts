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
  const e = '发多少' + b + '发多少' + (b || 2) + '发多少'
`;

const result = parser(code1, "", () => "key");
console.log(result);
