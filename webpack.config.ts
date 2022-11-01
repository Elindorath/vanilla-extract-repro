import path from 'path';
import fs from 'node:fs';

import type Webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Extends the `Webpack.Configuration` type with devServer
import 'webpack-dev-server';

import tsConfig from './tsconfig.json';


const isDevelopment = process.env.NODE_ENV !== 'production';

const distDirectory = path.resolve(__dirname, './dist');
const baseDirectory = path.resolve(__dirname, tsConfig.compilerOptions.baseUrl);
const directoriesInBase = fs.readdirSync(baseDirectory, { withFileTypes: true })
  .filter((dirEntry) => dirEntry.isDirectory())
  .map(({ name }) => ({ name, path: path.resolve(baseDirectory, name) }));


const config: Webpack.Configuration = {
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new VanillaExtractPlugin({ identifiers: isDevelopment ? 'debug' : 'short' }),
    new MiniCssExtractPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean) as Array<Webpack.WebpackPluginInstance>,
  entry: './src/main.tsx',
  output: {
    path: distDirectory,
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: distDirectory,
    },
    hot: true,
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            envName: isDevelopment ? 'development' : 'production',
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.vanilla\.css$/i,
        use: [
          require.resolve('style-loader'),
          // MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: { url: false },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: /\.vanilla\.css$/i,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: directoriesInBase.reduce((aliasMap, { name, path }) => ({
      ...aliasMap,
      [name]: path,
    }), {}),
  },
};

export default config;
