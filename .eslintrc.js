module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks', 'jest'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/issues/2483
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',

    'react/jsx-uses-react': 'off',
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-restricted-imports': ['error', { patterns: ['../*', 'test/**', '*.test.tsx', '*.test.ts'] }],
    'import/first': 'warn',
    'import/no-useless-path-segments': 'warn',
    'prettier/prettier': 'warn',
    'comma-dangle': ['warn', 'never'],
    'react/display-name': 'warn',
    'prefer-template': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prefer-const': [
      'error',
      {
        destructuring: 'all'
      }
    ],
    'eol-last': ['warn'],
    'no-trailing-spaces': ['warn'],
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreStrings: true
      }
    ],
    'arrow-body-style': ['warn', 'as-needed'],
    'prefer-arrow-callback': 'warn',
    'func-names': ['error', 'never'],
    'func-style': ['error', 'expression'],
    'no-use-before-define': 'warn',
    '@typescript-eslint/no-explicit-any': 'error'
  },
  overrides: [
    {
      files: ['./src/test/**', '*.test.tsx', '*.test.ts'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'no-restricted-imports': ['error', { patterns: ['../*'] }],
        'jest/no-conditional-expect': 'off',
        'jest/no-export': 'off'
      },
      env: {
        jest: true
      }
    }
  ],
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
};
