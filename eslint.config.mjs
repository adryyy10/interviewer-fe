import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
    {files: ["**/*.{js,mjs,cjs,jsx}"]},
    {rules: {
        "indent": ["error", 4],
        "no-unused-vars": ["warn"],
        "semi": ["error", "always"],
        "no-console": ["warn", { "allow": ["warn", "error"] }]
    }},
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
];