const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PATH_BUILD  = path.join(__dirname, '/dist');
const PATH_SOURCE  = path.join(__dirname, '/src');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        index: PATH_SOURCE + '/index.js'
    },
    output:{
        path: PATH_BUILD,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            'transform-class-properties'
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader","css-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                  require.resolve('style-loader'),
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      modules: {
                        localIdentName: '[name]__[local]__[hash:base64:5]'
                      },
                      //localIdentName: '[name]__[local]__[hash:base64:5]'
                    },
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: {
                      // Necessary for external CSS imports to work
                      // https://github.com/facebookincubator/create-react-app/issues/2677
                      ident: 'postcss',
                      plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                          ],
                          flexbox: 'no-2009',
                        }),
                      ],
                    },
                  },
                  {
                    loader: require.resolve('sass-loader'),
                    options: {
                      includePaths: [path.join(__dirname, '/src/styles'),]
                    }
                  }
                ],
              },
            
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ] 
}