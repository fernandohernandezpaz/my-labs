/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig, globalIgnores } = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const typescriptEslintEslintPlugin = require('@typescript-eslint/eslint-plugin');
const _import = require('eslint-plugin-import');
const sortKeys = require('eslint-plugin-sort-keys');
const prettier = require('eslint-plugin-prettier');
const typescriptSortKeys = require('eslint-plugin-typescript-sort-keys');

const { fixupPluginRules } = require('@eslint/compat');

const globals = require('globals');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
    allConfig: js.configs.all,
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

module.exports = defineConfig([
    {
        extends: compat.extends(
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
        ),

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },

            parser: tsParser,

            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: __dirname,
            },

            sourceType: 'module',
        },

        plugins: {
            '@typescript-eslint': typescriptEslintEslintPlugin,
            import: fixupPluginRules(_import),
            prettier,
            'sort-keys': sortKeys,
            'typescript-sort-keys': typescriptSortKeys,
        },

        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/no-explicit-any': 'off',

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            'arrow-body-style': ['error', 'as-needed'],

            'import/no-cycle': 'error',

            'import/no-default-export': 'error',
            'import/prefer-default-export': 'off',

            'lines-between-class-members': [
                'error',
                'always',
                {
                    exceptAfterSingleLine: true,
                },
            ],

            'max-classes-per-file': 'off',
            'no-console': 'warn',
            'no-duplicate-imports': 'error',
            'no-else-return': [
                'error',
                {
                    allowElseIf: false,
                },
            ],
            'no-return-await': 'error',
            'no-underscore-dangle': 'off',
            'no-unused-vars': 'off',
            'object-shorthand': ['error', 'properties'],

            'prefer-template': 'error',

            'prettier/prettier': 'error',

            'sort-keys': 'error',

            'sort-keys/sort-keys-fix': [
                'error',
                'asc',
                {
                    minKeys: 5,
                    natural: true,
                },
            ],

            'typescript-sort-keys/string-enum': ['error'],
        },
    },
    globalIgnores(['**/.eslintrc.js', '**/migrations']),
]);
