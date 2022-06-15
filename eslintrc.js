module.exports = {
    "root": true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
          "space-before-function-paren": ["error", "always"],
          "space-before-blocks": ["error", "always"],
          "quotes": [2, "single", { "avoidEscape": true }]
    }
}
