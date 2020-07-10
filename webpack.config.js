// @ts-check

const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction', isProduction);

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: [
    `${__dirname}/src/index.js`,
  ],
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      features: `${__dirname}/src/features`,
      components: `${__dirname}/src/components`,
      routes$: `${__dirname}/src/routes.js`,
      serverAPI$: `${__dirname}/src/serverAPI.js`,
      constants$: `${__dirname}/src/constants.js`,
      utils$: `${__dirname}/src/utils.js`,
      AppContext$: `${__dirname}/src/AppContext.js`,
    },
  },
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
