import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import onlyWarnPlugin from 'eslint-plugin-only-warn';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import promisePlugin from 'eslint-plugin-promise';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import sonarjsPlugin, { configs as sonarjsConfigs } from 'eslint-plugin-sonarjs';
import webPlugin from 'eslint-plugin-web';
import globals from 'globals';
import path from 'path';
import tseslint, { parser as typescriptParser } from 'typescript-eslint';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const legacyPlugin = (name, alias = name) => {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias];

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
  }

  return fixupPluginRules(plugin);
};

const baseRules = [
  {
    files: ['**/*.cjs', '**/*.mjs', '**/*.js', '**/*.ts', '**/*.tsx'],
    ignores: ['coverage/**', 'test/**', 'build/**', 'dist/**', '.yarn/**', '**/*.d.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: { 'only-warn': onlyWarnPlugin },
    name: 'Global Include and Ignore'
  },
  {
    name: 'ESLint Recommended',
    ...eslint.configs.recommended
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: { parser: typescriptParser, sourceType: 'module' },
    // ignores: ['jest.config.ts', '**/*.d.ts'],
    name: 'typescript-eslint',
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/triple-slash-reference': 'error',
      'constructor-super': 'off',
      'getter-return': 'off',
      'no-array-constructor': 'off',
      'no-class-assign': 'off',
      'no-const-assign': 'off',
      'no-dupe-args': 'off',
      'no-dupe-class-members': 'off',
      'no-dupe-keys': 'off',
      'no-func-assign': 'off',
      'no-import-assign': 'off',
      'no-new-native-nonconstructor': 'off',
      'no-new-symbol': 'off',
      'no-obj-calls': 'off',
      'no-redeclare': 'off',
      'no-setter-return': 'off',
      'no-this-before-super': 'off',
      'no-undef': 'off',
      'no-unreachable': 'off',
      'no-unsafe-negation': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error'
    }
  },
  {
    name: 'React Hooks Plugin',
    plugins: {
      'react-hooks': fixupPluginRules(reactHooksPlugin)
    },
    rules: reactHooksPlugin.configs.recommended.rules
  },
  {
    name: 'React Plugin',
    plugins: {
      react: reactPlugin
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/prop-types': 'off'
    }
  },
  prettier,
  {
    name: 'Web Plugin',
    plugins: {
      web: webPlugin
    },
    rules: webPlugin.configs.all.rules
  },
  ...compat.extends('plugin:import/typescript'),
  {
    name: 'JSX A11y Plugin',
    plugins: {
      'jsx-a11y': jsxA11yPlugin
    },
    rules: jsxA11yPlugin.configs.recommended.rules
  },
  {
    name: 'Promise Plugin',
    plugins: {
      promise: legacyPlugin('eslint-plugin-promise', 'promise')
    },
    rules: promisePlugin.configs.recommended.rules
  },
  {
    name: 'Perfecionist plugin',
    plugins: { perfectionist: perfectionistPlugin },
    rules: {
      ...perfectionistPlugin.configs['recommended-natural'].rules
    }
  },
  {
    ignores: ['jest.config.ts', '**/*.d.ts'],
    name: 'SonarLint Plugin',
    plugins: {
      sonarjs: sonarjsPlugin
    },
    rules: {
      ...sonarjsConfigs.recommended.rules,
      'sonarjs/arguments-usage': 'warn',
      'sonarjs/array-constructor': 'warn',
      'sonarjs/class-prototype': 'warn',
      'sonarjs/cognitive-complexity': 'warn',
      'sonarjs/destructuring-assignment-syntax': 'warn',
      'sonarjs/file-name-differ-from-class': 'warn',

      'sonarjs/max-switch-cases': 'warn',
      'sonarjs/max-union-size': 'warn',
      'sonarjs/nested-control-flow': 'warn',
      'sonarjs/no-all-duplicated-branches': 'warn',
      'sonarjs/no-built-in-override': 'warn',
      'sonarjs/no-collapsible-if': 'warn',
      'sonarjs/no-collection-size-mischeck': 'warn',
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/no-duplicated-branches': 'warn',
      'sonarjs/no-element-overwrite': 'warn',
      'sonarjs/no-empty-collection': 'warn',
      'sonarjs/no-empty-function': ['warn', { allow: [] }], // The default parameter is not set
      'sonarjs/no-empty-interface': 'warn',
      'sonarjs/no-extra-arguments': 'warn',
      'sonarjs/no-for-in-iterable': 'warn',
      'sonarjs/no-function-declaration-in-block': 'warn',
      'sonarjs/no-gratuitous-expressions': 'warn',
      'sonarjs/no-identical-conditions': 'warn',
      'sonarjs/no-identical-expressions': 'warn',
      'sonarjs/no-identical-functions': 'warn',
      'sonarjs/no-ignored-return': 'warn',
      'sonarjs/no-implicit-dependencies': 'warn',
      'sonarjs/no-incorrect-string-concat': 'warn',
      'sonarjs/no-inverted-boolean-check': 'warn',
      'sonarjs/no-nested-incdec': 'warn',
      'sonarjs/no-nested-switch': 'warn',
      'sonarjs/no-nested-template-literals': 'warn',
      'sonarjs/no-one-iteration-loop': 'warn',
      'sonarjs/no-redundant-boolean': 'warn',
      'sonarjs/no-redundant-jump': 'warn',
      'sonarjs/no-return-type-any': 'warn',
      'sonarjs/no-same-line-conditional': 'warn',

      'sonarjs/no-small-switch': 'warn',
      'sonarjs/no-this-alias': 'warn',
      'sonarjs/no-unused-collection': 'warn',
      'sonarjs/no-unused-expressions': [
        'warn',
        {
          allowShortCircuit: false,
          allowTaggedTemplates: false,
          allowTernary: false,
          enforceForJSX: false
        }
      ],
      'sonarjs/no-unused-function-argument': 'warn',
      'sonarjs/no-use-of-empty-return-value': 'warn',
      'sonarjs/no-useless-catch': 'warn',
      'sonarjs/non-existent-operator': 'warn',
      'sonarjs/object-shorthand': 'warn',
      'sonarjs/prefer-immediate-return': 'warn',
      'sonarjs/prefer-object-literal': 'warn',
      'sonarjs/prefer-single-boolean-return': 'warn',
      'sonarjs/prefer-template': 'warn',
      'sonarjs/prefer-while': 'warn',
      'sonarjs/strings-comparison': 'warn',
      'sonarjs/switch-without-default': 'warn',
      'sonarjs/too-many-break-or-continue-in-loop': 'warn',
      'sonarjs/unicode-aware-regex': 'warn'
    }
  }
];

const config = tseslint.config(...baseRules);

export default config;
