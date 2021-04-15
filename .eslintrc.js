module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-extra-semi": "error",
    "space-before-blocks": ["warn", { "functions": "always" }],
    "comma-dangle": ["error", "never"],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }]
  }
};
