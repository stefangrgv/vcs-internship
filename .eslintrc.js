module.exports = {
  'root': true,
  'extends': [
      'eslint:recommended',
      'react-app',
      'react-app/jest'
  ],
  'parserOptions': {
        'requireConfigFile': false,
        'ecmaVersion': 6,
        'sourceType': 'module',
        'ecmaFeatures': {
          'modules': true
        },
        'allowImportExportEverywhere': true
  },
  'rules': {
        'camelcase': ['error', {
                                'properties': 'always'
                              }],
        'space-before-function-paren': ['error', 'always'],
        'space-before-blocks': ['error', 'always'],
        'quotes': [2, 'single', {'allowTemplateLiterals': true, 'avoidEscape': true}],
        'space-infix-ops': ['error', {}],
        'no-prototype-builtins': [0],
        'semi': ['error', 'always']
  },
  'env': {
    'browser': true,
    'node': true,
    'jquery': true
  },
};
