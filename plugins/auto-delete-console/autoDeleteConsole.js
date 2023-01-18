const fs = require('fs');
const path = require('path');
const getPath = (key) => {
  return path.resolve(__dirname, key);
};

// 引入
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default
const core = require('@babel/core')

let autoDeletePlugin = {
  name: 'autoDeletePlugin',
  setup(build) {
    build.onResolve({ filter: /\.js$/ }, (args) => ({
      path: args.path,
      namespace: 'autoDeletePlugin',
    }));
    build.onLoad(
      { filter: /.*/, namespace: 'autoDeletePlugin' },
      async (args) => {
        let fileString = await fs.promises.readFile(args.path, 'utf8');

        // Todo: 删除 console.log 当然 这样不好，我看网上的大多用 babel 来处理的。
        // fileString = fileString.replace(/console\.log\([\s\S]*?\);?/, '');

        // 转用 babel
        // 1. 生成 ast 语法树
        const ast = parser.parse(fileString, {
          sourceType: 'module',
        });
        console.log(ast, 11);

        // 2. 遍历 ast 找到 console.log remove
        traverse(ast, {
          CallExpression(path) {
            const memberExpression = path.node.callee
            if (memberExpression.object && memberExpression.object.name === 'console') {
              path.remove()
            }
          }
        })

        // 3. AST 还原为 code
        const { code } = core.transformFromAst(ast)

        return {
          contents: code,
          loader: 'js',
        };
      }
    );
  },
};

require('esbuild').build({
  entryPoints: [getPath('./index.js')],
  bundle: true,
  outfile: getPath('./out.js'),
  plugins: [autoDeletePlugin],
  format: 'esm',
});
