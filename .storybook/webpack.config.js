const path = require("path");

module.exports = {
	plugins: [
		// your custom plugins
	],
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: "babel-loader",
				exclude: /node_modules/
			}
		]
	},

	resolve: {
		modules: ["node_modules", "src"],
		extensions: [".js", ".jsx"]
	}
};
