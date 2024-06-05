import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
        }
    },
    {
        languageOptions: {
            globals: globals.browser
        }
    },
    {
        plugins: {
            "@stylistic/js": stylisticJs
        },
        rules: {
            "@stylistic/js/indent": ["error", 4],
            "@stylistic/js/linebreak-style": ["error", "unix"],
            "@stylistic/js/quotes": ["error", "double"],
            "@stylistic/js/semi": ["error", "always"]
        }
    },
    {
        rules: {
            "semi": ["error", "always"],
            "no-unused-vars": ["error", {
                "argsIgnorePattern": "^_"
            }
            ],
        },
    },
    pluginJs.configs.recommended,
];