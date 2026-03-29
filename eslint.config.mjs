// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Ignore generated/third-party directories
  {
    ignores: ['node_modules/**', 'openspec/**', '.agents/**'],
  },

  // TypeScript strict + stylistic for all TS/TSX files
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  // Disable all ESLint rules that Prettier owns — must come last
  eslintConfigPrettier,

  // Project-specific overrides
  {
    rules: {
      // Require explicit return types on exported functions (PROJECT.md rule)
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      // No console.log in committed code
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
)
