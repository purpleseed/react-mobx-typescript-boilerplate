const webpack = require('webpack')
const path = require('path')

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development'
}

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// variables
const isProduction =
  process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production'

module.exports = ({ config }) => {
  config.resolve = {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, '../src/app'),
      'react-dom': '@hot-loader/react-dom',
    },
    modules: [
      ...(config.resolve.modules || []),
      path.resolve('./'),
    ]
  }

  const rules = [
    // .ts, .tsx
    {
      test: /\.tsx?$/,
      use: [
        !isProduction && {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                require.resolve('babel-plugin-module-resolver'),
                {
                  root: [process.cwd()],
                  alias: {
                    app: ['src/app'],
                    'app/*': ['src/app/*'],
                  }
                }
              ],
              'react-hot-loader/babel',
              'emotion',
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true
                }
              ],
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: true
                }
              ],
            ],
            presets: ['react-app', '@emotion/babel-preset-css-prop'],
          },
        },
        'ts-loader',
      ].filter(Boolean),
    },
    // static assets
    { test: /\.html$/, use: 'html-loader' },
    { test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
    {
      test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
      use: 'file-loader',
    },
  ]

  rules.forEach(rule => config.module.rules.push(rule))
  return config
}
