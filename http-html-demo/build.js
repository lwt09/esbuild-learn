const { getPath } = require('../utils/index');

// plugins
const httpPlugin = require('../plugins/http-plugin/http-plugin.js');
const htmlPlugin = require('../plugins/html-template-plugin/html-template-plugin');

require('esbuild').build({
  entryPoints: [getPath(__dirname, './src/index.jsx')],
  bundle: true,
  outfile: getPath(__dirname, './dist/out.js'),
  plugins: [httpPlugin(), htmlPlugin()],
  format: 'esm',
  sourcemap: true,

  // onEnd 时候能够拿到 meatfile
  metafile: true,
});
