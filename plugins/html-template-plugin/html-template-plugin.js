const {
  generateHTML,
  createScript,
  createLink,
} = require('../../utils/index.js');

const path = require('path');
const fs = require('fs');

module.exports = (option = {}) => {
  return {
    name: 'htmlPlugin',
    setup(build) {
      build.onEnd(async (result) => {
        // 这个变量里面会带着 输入 和 产物的信息

        if (result.errors.length) return;

        // 把产物放到html里面 js css
        const scripts = [];
        const links = [];
        const assets = Object.keys(result.metafile.outputs);

        assets.map((assetPath) => {
          if (assetPath.endsWith('.js')) {
            scripts.push(
              createScript(
                option.basePath
                  ? path.resolve(option.basePath, assetPath)
                  : assetPath
              )
            );
          } else if (assetPath.endsWith('.css')) {
            links.push(
              createLink(
                option.basePath
                  ? path.resolve(option.basePath, assetPath)
                  : assetPath
              )
            );
          }
        });

        // 插入到html
        const templateContent = generateHTML(scripts, links);
        // 3. HTML 写入磁盘
        const templatePath = option.basePath
          ? path.resolve(option.basePath, 'index.html')
          : path.join(process.cwd(), 'index.html');
        await fs.promises.writeFile(templatePath, templateContent);
      });
    },
  };
};
