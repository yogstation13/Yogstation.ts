module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:node/recommended",
    "prettier"
  ],
  rules: {
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "node/no-missing-import": "off",
    "import/no-unresolved": "off"
  }
};