const path = require("path");
const fs = require("fs");

const srcFolder = path.join(__dirname, "src", "components");
const components = fs.readdirSync(srcFolder);

const files = [];
const entries = {};
components.forEach(component => {
	const name = component.split(".")[0];
	const file = `./src/components/${name}`;
	files.push(file);
	entries[name] = file;
});

module.exports = {
	entry: entries,
	output: {
		filename: "[name].js",
		path: path.join(__dirname, "dist/components/")
	},
	module: {
		rules: [
			{
				test: /\.js/,
				loader: "babel-loader",
				include: path.join(__dirname, "src")
			},
			{
				test: /\.jsx/,
				loader: "babel-loader",
				include: path.join(__dirname, "src")
			}
		]
	},
	resolve: {
		modules: ["node_modules", "src"],
		extensions: [".js", ".jsx"]
	}
};
