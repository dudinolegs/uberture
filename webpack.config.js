const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const pages = [
    'ui', 'mainpage', 'dealer', 'support', 'buy', 'team', 'job', 'contacts', 'error', 'about', 'history', 'search',
    'personal-profile'
];

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
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[hash][ext][query]'
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                },
                {
                    test: /\.css$/i,
                    use: [
                        isDev 
                        ? 'style-loader' 
                        : MiniCssExtractPlugin.loader, 'css-loader'
                    ]
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[hash][ext][query]'
                    }
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/pages/index.ejs',
                filename: 'index.html',
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                },
            }),
            ...pages.map(page =>
                new HtmlWebpackPlugin({
                    template: `./src/pages/${page}.ejs`,
                    filename: `${page}.html`,
                    minify: {
                        collapseWhitespace: true,
                        removeComments: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                    },
                })
            ),
            new MiniCssExtractPlugin({
                filename: isProd ? 'assets/styles.[contenthash].css' : 'assets/styles.css',
            }),
            new webpack.DefinePlugin({
                IS_DEV: isDev,
            }),
            ...(isDev ? [
                new CopyWebpackPlugin({
                    patterns: [
                        { from: path.resolve(__dirname, "src/assets/modals"), to: "assets/modals", noErrorOnMissing: true },
                        { from: path.resolve(__dirname, "src/assets/files"), to: "assets/files", noErrorOnMissing: true }
                    ],
                })
            ] : []),
            new FaviconsWebpackPlugin({
                logo: './src/assets/images/favicon.png',
                cache: true,
                inject: true,
                prefix: 'assets/favicons/'
            }),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                '...',
                new CssMinimizerPlugin(),
            ],
        },
        devServer: {
            static: './dist',
            port: 3001,
            open: true,
        },
    }
};