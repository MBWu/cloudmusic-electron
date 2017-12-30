const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CleanWbpackPlugin = require( 'clean-webpack-plugin' );
const webpack = require( 'webpack' );
const UglifyJs = require ( 'uglifyjs-webpack-plugin' );
module.exports = {

    entry: {
        main: [
            'babel-polyfill',
            path.join( __dirname, './src/index.js' ),
        ],
        ventor: ['react','react-dom','react-redux','redux','react-keeper','redux-logger','redux-thunk','redux-promise-middleware']
    },

    output: {

        path: path.join( __dirname, './dist' ),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },

    module: {

        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join( __dirname, './src' )
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(jpg|gif|png|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options:{
                        limit: 8192
                    }
                }]
                
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
             }
         }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join( __dirname, './src/index.html' )
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new CleanWbpackPlugin(['dist']),
        new UglifyJs()
    ]
}