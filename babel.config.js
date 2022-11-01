module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/env',
    [
      '@babel/preset-react',
      { runtime: 'automatic' },
    ],
  ],
  plugins: ['react-refresh/babel'],
};
