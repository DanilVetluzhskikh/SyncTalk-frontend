import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { BuildOptions } from '../types/config';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  return [
    { test: /\.tsx?$/, use: 'ts-loader' },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]],
        },
      },
    },
    {
      test: /\.s[ac]ss$/i,
      exclude: /node_modules/,
      use: [
        options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: (resPath: string) => Boolean(resPath.includes('.module.')),
              localIdentName: options.isDev
                ? '[path][name]__[local]--[hash:base64:5]'
                : '[hash:base64:8]',
            },
          },
        },
        'sass-loader',
      ],
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg|mp3)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      ],
    },
  ];
}
