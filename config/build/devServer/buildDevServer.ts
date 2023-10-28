import webpack from 'webpack';

import { BuildOptions } from '../types/config';

export function buildDevServer(
  options: BuildOptions,
): webpack.Configuration['devServer'] {
  return {
    open: true,
    historyApiFallback: true,
    hot: true,
    port: options.port,
    host: '0.0.0.0',
  };
}
