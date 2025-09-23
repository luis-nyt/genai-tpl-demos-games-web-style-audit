const path = require('path');

const packageDir = [__dirname, path.join(__dirname, '../..')];

module.exports = {
  extends: ['../foundation/web/.eslintrc.cjs', 'plugin:storybook/recommended'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': ['error', { packageDir }],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@nyt/foundation',
            importNames: ['ColorBehaviorProps', 'ReactProps', 'Style', 'Sx', 'useSx'],
            message:
              "Don't import this type from @nyt/foundation; import the local `CommonProps` or `CommonWithAsProps` types instead, or for Sx, import the local `TplSx` and `useTplSxProp` hook instead",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['src/**/*.stories.*', 'src/stories/**/*'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            packageDir,
            /** Allow Storybook stories to import devDependencies */
            devDependencies: true,
          },
        ],
      },
    },
  ],
};
