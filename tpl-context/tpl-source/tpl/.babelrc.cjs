const { legacyImportRewrites } = require('../../tools/utils/legacy-css.js');
const isCJS = !!process.env.BABEL_MODULES;
const isLegacyBuild = !!process.env.LEGACY;

module.exports = (api) => ({
  ignore: ['src/**/*.stories.tsx', 'src/stories/**/*'],
  /**
   * Don't transpile test files (non-test builds only) or Jest .snap files. Note: we also have to
   * add `.snap` to Babel CLI's `--extensions` option so that this `ignore` setting prevents it
   * from copying `.snap` files to the build directory.
   * @see https://github.com/babel/babel/issues/12008
   * @see https://github.com/babel/babel/issues/6226
   */
  ignore: [!api.env('test') && /\.test\.[jt]sx?$/, /\.snap$/].filter(Boolean),
  targets: {
    /**
     * The web browsers that libraries built with this Babel config need to support. The string below
     * is an approximate compatibility target based on nytimes.com traffic as of September 6th, 2021.
     * By targeting a smaller set of browsers (that is representative of our audience), we avoid
     * bloating the resulting code with additional helpers and polyfills.
     *
     * @see https://docs.google.com/document/d/1PSRw3UCi8kNXiCKWHukG5iWc-cZZCeDTzxXEsGHHdYQ/edit
     * @see https://babeljs.io/docs/en/options#targets
     */
    browsers:
      'safari >= 14, ios >= 14, chrome >= 84, firefox >= 91, android >= 92, edge >= 92, samsung >= 14',
    node: 'current',
  },
  presets: [
    /**
     * Don't configure `useBuiltIns` or `corejs` here for `@babel/preset-env`; that could introduce
     * polyfills that pollute the global scope, which we don't want this library's code to do.
     */
    [
      '@babel/preset-env',
      {
        /** We want CommonJS modules for `BABEL_MODULES=commonjs` & `BABEL_ENV=test`, ESM otherwise */
        modules: process.env.BABEL_MODULES === 'commonjs' || api.env('test') ? 'commonjs' : false,
      },
    ],
    ['@babel/preset-react', { development: api.env('development') }],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    /**
     * Manually add plugins for transpiling optional chaining and nullish coalescing syntaxes.
     *
     * `@babel/preset-env` is already configured to automatically add the optional chaining and
     * nullish coalescing plugins based on our `targets`:
     * @see https://github.com/babel/babel/blob/v7.15.8/packages/babel-compat-data/scripts/data/plugin-features.js#L144
     *
     * However, with our current browser targets, `@babel/preset-env` may not enable these plugins.
     * This works great for those browsers, but webpack 4.x in the nytimes/news monorepo currently
     * uses a version of acorn, the JavaScript parser library, which doesn't natively support these
     * two syntaxes. Thus, apps in the monorepo that use webpack 4, not to mention other apps that
     * use this library, may encounter a parse error when ingesting this library.
     *
     * It appears that the Storybook team ran into a similar issue, which they've described here:
     * @see https://github.com/storybookjs/storybook/blob/v6.3.9/lib/core-common/src/utils/babel.ts#L26-L33
     *
     * TODO: Remove these manually added plugins when all dependent apps have upgraded to webpack 5
     */
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    /**
     * Transform imports for dependencies with legacy builds.
     */
    isLegacyBuild && ['babel-plugin-transform-import', legacyImportRewrites()],
    isLegacyBuild && [
      '@nyt/babel-plugin-css-modules',
      {
        bundleOutputDir: isCJS ? `${__dirname}/legacy-cjs` : `${__dirname}/legacy`,
        browserslist: undefined,
        outputBundleName: `tpl-[hash:6].css`,
        cacheDirectory: `${__dirname}/../../.caches/babel-loader`,
      },
    ],
    'babel-plugin-add-react-displayname',
  ].filter(Boolean),
  env: {
    development: {
      plugins: [['pretty-lights/babel', { sourceMap: true, autoLabel: true }]],
    },
    test: {
      plugins: [['pretty-lights/babel', { hoist: true, autoLabel: true }]],
    },
    production: {
      plugins: [
        ['pretty-lights/babel', { hoist: true }],
        // Add a React-specific plugin / optimization for `BABEL_ENV=production` builds
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
  },
});
