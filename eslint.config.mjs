import _import from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from 'typescript-eslint';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/coverage/**/*", "**/dist/**/*", "**/node_modules/**/*", "**/docs/**/*"],
}, ...compat.extends("plugin:@typescript-eslint/recommended"), {
    plugins: {
        "@typescript-eslint": tseslint.plugin,
        import: fixupPluginRules(_import),
    },
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
        parser: tseslint.parser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },

    rules: {
        indent: ["error", "tab"],
        quotes: ["error", "single"],

        "no-tabs": ["error", {
            allowIndentationTabs: true,
        }],

        "max-len": ["error", {
            code: 160,
        }],

        "no-console": "error",
        curly: "error",
        "comma-dangle": ["error", "never"],

        "array-bracket-newline": ["error", {
            multiline: true,
            minItems: 5,
        }],

        "array-element-newline": ["error", {
            multiline: true,
            minItems: 5,
        }],

        "object-curly-newline": ["error", {
            ObjectExpression: {
                multiline: true,
                minProperties: 3,
            },

            ObjectPattern: {
                multiline: true,
                minProperties: 3,
            },

            ImportDeclaration: {
                multiline: true,
                minProperties: 5,
            },

            ExportDeclaration: {
                multiline: true,
                minProperties: 5,
            },
        }],

        "object-curly-spacing": ["error", "always"],
        "@typescript-eslint/no-explicit-any": "error",

        "import/order": [2, {
            alphabetize: {
                order: "asc",
            },

            groups: [
                ["builtin", "external"],
                ["internal", "unknown"],
                ["parent", "sibling", "index"],
            ],

            "newlines-between": "always",
        }],
    },
}];