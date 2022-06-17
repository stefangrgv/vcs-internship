module.exports = {
    'root': true,
    'extends': [
        'eslint:recommended'
    ],
    'parserOptions': {
          'requireConfigFile': false
    },
    'rules': {
          'camelcase': ['error', {
                                  'properties': 'always'
                                }],
          'space-before-function-paren': ['error', 'always'],
          'space-before-blocks': ['error', 'always'],
          'quotes': [2, 'single', { 'avoidEscape': true }],
          'no-prototype-builtins': [0],
    },
    'env': {
      'browser': true,
      'node': true,
    }
}
