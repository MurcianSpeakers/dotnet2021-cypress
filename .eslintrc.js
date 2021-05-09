module.exports = {
    env: {
      browser: true,
      node: true,
      es6: true,
      jest: true
    },
    parserOptions: {
      warnOnUnsupportedTypeScriptVersion: false,
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      ecmaFeatures: {
        jsx: true // Allows for the parsing of JSX
      }
    },
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
      'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    plugins: ['@typescript-eslint', 'react-hooks', 'react'],
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      'react-hooks/rules-of-hooks': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'info']
        }
      ],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/display-name': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true
        }
      ],
      '@typescript-eslint/no-non-null-assertion': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  };
  