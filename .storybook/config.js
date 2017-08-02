import React from "react";
import { configure, addDecorator } from "@storybook/react";

const req = require.context("../stories", true, /.stories.js$/);

function loadStories() {
	req.keys().forEach(filename => req(filename));
}

addDecorator(story =>
	<div style={{ padding: "8px" }}>
		{story()}
	</div>
);

configure(loadStories, module);
