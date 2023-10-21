import webpack from "webpack";

export function buildResolvers(): webpack.Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    }
}