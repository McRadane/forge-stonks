module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/strict'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'no-console': 'warn',
    'react/button-has-type': 'warn',
    'react/jsx-no-bind': 'warn',
    'react/no-array-index-key': 'warn',
    'react/no-invalid-html-attribute': 'warn',
    'import/no-default-export': 'warn',
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-absolute-path': 'warn',
    'import/no-amd': 'warn',
    'import/no-anonymous-default-export': 'warn',
    'import/no-commonjs': 'warn',
    'import/no-deprecated': 'warn',
    'import/no-dynamic-require': 'warn',
    'import/no-mutable-exports': 'warn',
    'import/no-nodejs-modules': 'warn',
    'import/no-self-import': 'warn',
    'import/no-unassigned-import': 'warn',
    'import/no-unresolved': 'warn',
    'import/no-useless-path-segments': 'warn',
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], 'internal', 'parent', ['sibling', 'index'], 'object'],
        'newlines-between': 'always',
        pathGroups: [{ group: 'internal', pattern: '@bpa*' }]
      }
    ],
    'import/unambiguous': 'warn'
  },
  settings: {
    react: {
      version: '18.2'
    }
  }
};
