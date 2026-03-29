// apps/mobile/babel.config.js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      // expo preset handles React Native + TypeScript + JSX transform
      ['babel-preset-expo', { jsxImportSource: 'react' }],
    ],
    plugins: [
      // Path aliasing — maps @tt/shared to the actual package
      // This is needed because Metro doesn't always resolve pnpm symlinks
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            // Internal app alias (optional but useful)
            '@': './src',
            // Workspace package — point directly to the source entry
            // DECISION: if @tt/shared has a build step, point to `./dist` instead
            '@tt/shared': '../../packages/shared/src',
          },
        },
      ],
    ],
  };
};
