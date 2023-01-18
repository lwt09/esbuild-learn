## learn esbuild process
### http-html-demo
```
node ./http-html-demo/build.js
```
1. http-plugin
   auto import http-resource like `import { render } from 'https://cdn.skypack.dev/react-dom';`
   plugin will download resource including other resource referenced while building the bundle
2. html-template-plugin
   auto generate html with html-template and insert js/css which is the bundle of the building