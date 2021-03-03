const path = require('path');
const { name, version } = require('./package.json');

module.exports = {
  entries: {
    index: {
      entry: ['./site/web/index.js'],
      template: './site/web/index.html',
      favicon: './site/favicon.ico',
    },
    demo: {
      entry: ['./site/demo/index.js'],
      template: './site/demo/index.html',
      favicon: './site/favicon.ico',
    },
    demo_umd: {
      template: './site/demo/index_umd.html',
      inject: false,
    },
  },
  resolve: {
    alias: {
      zarm: path.join(process.cwd(), 'components'),
      '@': path.join(process.cwd(), '/'),
      '@site': path.join(process.cwd(), 'site'),
    },
  },
  banner: `
    ${name} v${version}
  `,
  setBabelOptions: (options) => {
    options.plugins.push(['import', { libraryName: 'zarm-web', style: true }, 'zarm-web']);
    options.plugins.push([
      'prismjs',
      {
        languages: ['javascript', 'typescript', 'jsx', 'tsx', 'css', 'scss', 'markup', 'bash'],
        theme: 'default',
        css: true,
      },
    ]);
  },
  setRules: (rules) => {
    rules.push({
      test: /\.md$/,
      use: ['raw-loader'],
    });
  },
};
