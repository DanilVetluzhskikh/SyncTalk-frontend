import { BuildOptions } from "../types/config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

export function buildPlugins(options: BuildOptions): webpack.Configuration['plugins'] {
    return [
        new HtmlWebpackPlugin({
          template: options.paths.html
        }),
        new webpack.ProgressPlugin(),
    ]
}