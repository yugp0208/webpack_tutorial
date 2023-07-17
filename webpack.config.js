//webpackの設定ファイル
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //出力したCSSを別ファイルにするプラグイン
const HtmlWebpackPlugin = require('html-webpack-plugin'); //HTMLを出力するプラグイン
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //distフォルダに残ったゴミファイルを削除してくれる

module.exports = {
    mode: 'development', //本番公開用に、distにファイルを出力したい場合は、productionに設定する
    devtool: 'source-map', //jsのデバッグ改善
    entry : './src/javascripts/main.js', //出力するファイル
    output : {
        path : path.resolve(__dirname, './dist/'), //出力するディレクトリ //絶対パスを取得して指定
        filename : './javascripts/main.js', //出力するファイルの名前を指定
    },
    module : {
        rules:[
            {
                //jsの為の記述
                test: /\.js/,
                exclude: '/node_modules/', //Babelでトランスパイルする必要のないフォルダの為、除外
                use : [
                    {
                        loader:'babel-loader',
                        options:{
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                //scssとcssの為の記述
                test: /\.(css|sass|scss)/,
                use : [
                    //cssをバンドルする
                    {
                        loader : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader : 'css-loader',
                        options : {
                            sourceMap:false, //scssのデバック改善
                        },
                    },
                    {
                        loader : 'sass-loader',
                    }
                ],
            },
            {
                //画像出力の為の記述
                test:/\.(jpg|png|jpeg|webp)/,
                type : 'asset/resource',
                generator:{
                    filename: 'images/[name][ext]'
                },
                use: [
                    {
                        loader : 'image-webpack-loader',
                        options : {
                            mozjpeg: {
                                progressive : true,
                                quality: 65
                            },
                            webp: {
                                quality:75,
                            }
                        },
                    }
                ],
            },
            {
                //pug・HTMLの為の記述
                test: /\.html/,
                use:[
                    {
                        loader:'html-loader',
                    },
                ]
            }
        ],
    },
    plugins : [
        new MiniCssExtractPlugin({
            filename : './stylesheets/main.css', //distフォルダの中身の命名を指定
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    //npm-dev-serverの為の記述
    devServer: {
        static: path.resolve(__dirname, 'src'),
    },
}