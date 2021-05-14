module.exports = {
     env: {
          browser: true,
          commonjs: true,
          es6: true,
     },
     extends: ['prettier'],
     plugins: ['prettier'],
     parserOptions: {
          ecmaVersion: 2018,
     },
     rules: {
          'linebreak-style': ['error', 'windows'],
          quotes: ['error', 'single'],
          semi: ['error', 'always'],
          'prettier/prettier': 'error',
     },
};
