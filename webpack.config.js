const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const pages = ['develop'];

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';
    const isDev = !isProd;

    return {  
        mode: isProd ? 'production' : 'development',
        entry: './src/index.js',
        output: {
            filename: isProd ? 'assets/scripts.[contenthash].js' : 'assets/scripts.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[hash][ext][query]'
                    }
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[hash][ext][query]'
                    }
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/pages/index.ejs',
                filename: 'index.html',
            }),
            ...pages.map(page =>
                new HtmlWebpackPlugin({
                    template: `./src/pages/${page}.html`,
                    filename: `${page}.html`,
                })
            ),
            new MiniCssExtractPlugin({
                filename: isProd ? 'styles.[contenthash].css' : 'assets/styles.css',
            }),
        ],
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
            ],
        },
        devServer: {
            static: './dist',
            port: 3001,
            open: true,
        },
        devtool: 'inline-source-map',
    }
};