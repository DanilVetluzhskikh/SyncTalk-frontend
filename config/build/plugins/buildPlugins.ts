import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

import { BuildOptions } from '../types/config';

export function buildPlugins(
  options: BuildOptions,
): webpack.Configuration['plugins'] {
  return [
    new HtmlWebpackPlugin({
      template: options.paths.html,
    }),
    new webpack.ProgressPlugin(),
  ];
}
