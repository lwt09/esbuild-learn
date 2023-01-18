const fs = require('fs');
const path = require('path');
const getPath = (key) => {
  return path.resolve(__dirname, key);
};

const axios = require('axios');

module.exports = () => {
  return {
    name: 'httpPlugin',
    setup(build) {
      build.onResolve({ filter: /^https?/ }, (args) => ({
        path: args.path,
        namespace: 'httpPlugin',
      }));

      build.onResolve({ filter: /.*/, namespace: 'httpPlugin' }, (args) => {
        return {
          // 重写路径
          path: new URL(args.path, args.importer).toString(),
          namespace: 'httpPlugin',
        };
      });

      build.onLoad({ filter: /.*/, namespace: 'httpPlugin' }, async (args) => {
        // 下载下来 http 内容 content 内容替换为 http 内容
        const { data: content } = await axios.get(args.path);

        console.log(typeof content, 11111);

        return {
          contents: content,
        };
      });
    },
  };
};
