module.exports = {
  'root': true,
  'extends': [
      'eslint:recommended'
  ],
  'parserOptions': {
        'requireConfigFile': false,
        'ecmaVersion': 6,
        'sourceType': 'script',
        'ecmaFeatures': {}
  },
  'rules': {
        'camelcase': ['error', {
                                'properties': 'always'
                              }],
        'space-before-function-paren': ['error', 'always'],
        'space-before-blocks': ['error', 'always'],
        'quotes': [2, 'single', {'allowTemplateLiterals': true, 'avoidEscape': true}],
        'space-infix-ops': ['error', {}],
  },
  'env': {
    'browser': true,
    'node': true,
  },
}
