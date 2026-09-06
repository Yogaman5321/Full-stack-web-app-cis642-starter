import pluginJs from "@eslint/js";
import globals from "globals";

export default [
  pluginJs.configs.recommended,
  {
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "next",
        },
      ],
    },
  },
];
