module.exports = {
    "root": true,
    "extends": [
        "eslint"
    ],
    "parser": "@typescript-eslint/parser",
    "rules": {
          "space-before-function-paren": ["error", "always"],
          "space-before-blocks": ["error", "always"],
          "quotes": [2, "single", { "avoidEscape": true }]
    }
}
