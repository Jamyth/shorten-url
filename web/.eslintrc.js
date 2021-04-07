const path = require('path')
/** @type {import('eslint').Linter.Config} */
const config = {
    ignorePatterns: ["**/build/**"],
    extends: ["iamyth/preset/react"],
    parserOptions: {
        project: ['./config/tsconfig.base.json','./config/tsconfig.src.json'],
        tsconfigRootDir: path.join(__dirname, './config')
    }
}

export default config