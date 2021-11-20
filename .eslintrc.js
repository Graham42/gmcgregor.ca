/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // I disagree with using const, it's not generally that useful and switching
    // things back and forth causes extra churn
    "prefer-const": "off",
    // This isn't needed for Remix
    "react/react-in-jsx-scope": "off",
  },
  ignorePatterns: [
    // TODO figure out configuration to lint {server,api}/index.js
    "server/index.js",
    "api/index.js",
  ],
};
