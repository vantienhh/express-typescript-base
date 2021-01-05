module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.json'
    ]
  },
  plugins: ['@typescript-eslint', 'security'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:security/recommended'
  ],
  rules: {
    'semi': 'off',
    '@typescript-eslint/semi': ['error'],
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': ['error'],

    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error'],

    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': ['error'],

    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],

    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error', { 'before': false, 'after': true }],

    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error'],

    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': [
      'error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always'
      }
    ],

    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error', { 'before': true, 'after': true }],

    'arrow-spacing': ['error', { 'before': true, 'after': true }],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'class',  // EX: class ProductService {}
        'format': ['PascalCase']
      },
      {
        'selector': 'interface', // EX: interface IProductService {}
        'format': ['PascalCase']
      }
      // {
      //   'selector': 'variableLike',
      //   'format': ['strictCamelCase', 'UPPER_CASE']
      // },
      // {
      //   'selector': 'variable',
      //   'modifiers': ['const'],
      //   'format': ['strictCamelCase', 'UPPER_CASE', 'PascalCase']
      // }
    ],

    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': ['error'],

    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { 'exceptAfterOverload': true }],

    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': ['error'],

    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],

    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/unified-signatures': 'error',

    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { 'checksConditionals': false }
    ],

    '@typescript-eslint/await-thenable': 'error',
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'error',

    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn'
  }
};
