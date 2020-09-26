module.exports = {
  root: true,
  env: {
    node: true
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

    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],

    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error', { 'before': true, 'after': true }],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'class',  // EX: class ProductService {}
        'format': ['PascalCase']
      },
      {
        'selector': 'interface', // EX: interface IProductService {}
        'format': ['PascalCase']
      },
      {
        'selector': 'variableLike',
        'format': ['strictCamelCase', 'UPPER_CASE']
      },
      {
        'selector': 'variable',
        'modifiers': ['const'],
        'format': ['strictCamelCase', 'UPPER_CASE', 'PascalCase']
      }
    ],

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

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn'
  }
};
