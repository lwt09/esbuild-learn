import Server from 'react-dom/server';
import * as React from 'react';

// 测试 sourceMap
debugger;
let Greet = () => <h1>hello world</h1>;
console.log(Server.renderToString(<Greet />));

export const a = 1;
export default () => {
  console.log(2);
};
