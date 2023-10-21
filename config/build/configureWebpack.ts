import webpack from 'webpack';

import { BuildOptions } from './types/config';
import { buildLoaders } from './loaders/buildLoaders';
import { buildPlugins } from './plugins/buildPlugins';
import { buildResolvers } from './resolvers/buildResolvers';
import { buildDevServer } from './devServer/buildDevServer';

export function configureWebpack(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
      publicPath: '/',
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
