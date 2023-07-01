//webpackの設定ファイル
const path = require('path');

module.exports = {
    entry : './src/index.js', //出力するファイル
    output : {
        path : path.resolve(__dirname, './dist/'), //出力するディレクトリ //絶対パスを取得して指定
        filename : 'main.js' //出力するファイルの名前を指定
    },
    module : {
        rules:[
            
            {
                //.cssが見つかれば、useの中を適用するという指示
                test: /\.css/,
                use : [
                    //cssをバンドルする
                    {
                        loader : 'style-loader',
                    },
                    {
                        loader : 'css-loader',
                    },
                ],
            },

        ],
    },
}