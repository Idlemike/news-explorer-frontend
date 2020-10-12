const presets = [
  [
    '@babel/env',
    {
      targets: { // указать цели, для полифилов
        edge: '15',
        ie: '11',
        firefox: '56',
        chrome: '62',
        safari: '11.1',
        android: '56',
        opera: '48',

      },
      useBuiltIns: 'usage', // эта настройка babel-polyfill, если стоит значение usage, то будут подставлятся полифилы для версий браузеров которые указали ниже.
      corejs: '3.4.1', // явно проставить версию corejs
    },
  ],
];

const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
];

module.exports = { presets, plugins };
