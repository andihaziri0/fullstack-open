import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["dist/", "node_modules/"]
  },
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: { 
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node 
    },
  },
  {
    files: ["**/*.mjs"],
    languageOptions: { 
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node 
    },
  },
  js.configs.recommended,
];
