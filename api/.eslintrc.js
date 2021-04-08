/** @type {import('eslint').Linter.Config} */
const config = {
  ignorePatterns: ['**/dist/**', "**/node_modules/**"],
  extends: ['iamyth/preset/node'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  }
};

module.exports = config;
