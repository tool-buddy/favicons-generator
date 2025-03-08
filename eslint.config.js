/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    // Ignore patterns
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    // For TypeScript files
    files: ['**/*.ts'],
    languageOptions: {
      parser: await import('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default,
      'prettier': (await import('eslint-plugin-prettier')).default
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off' // Since this is a CLI tool, console logs are expected
    }
  }
];
