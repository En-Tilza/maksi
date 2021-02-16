const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",

	output: {
		path: path.join(__dirname, "/public"),
		filename: "index-bundle.js",
		publicPath: '/'
	},

	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
					plugins: [
						['@babel/plugin-proposal-class-properties'],
						['@babel/plugin-transform-runtime']
					]
				}
			}
		}, {
			test: /\.s[ac]ss$/i,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'sass-loader',
					options: {
						implementation: require('sass'),
						sassOptions: {
							fiber: require('fibers'),
						},
					},
				},
			]
		}]
	},

	resolve: {
		alias: {
			components: path.resolve(__dirname, './src/components'),
			pages: path.resolve(__dirname, './src/pages'),
			styles: path.resolve(__dirname, './src/styles'),
			store: path.resolve(__dirname, './src/store'),
			hooks: path.resolve(__dirname, './src/hooks')
		},
		extensions: ['.js', '.jsx', '.css']
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		})
	],

	devServer: {
		contentBase: './public',
		port: 3000,
		historyApiFallback: true
	}
};
