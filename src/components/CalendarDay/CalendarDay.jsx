// @flow

import React from "react";
import styled from "styled-components";

const Div = styled.div`
	text-align: center;
	background: ${props => (props.selected ? "yellow" : "skyblue")};
	opacity: ${props => (props.fromOtherMonth ? "0.5" : "1")};
	grid-column: ${props => props.gridColumn};
	${props => props.styling};
`;

export default class CalendarDay extends React.Component {
	props: {
		displayContent: string,
		gridColumn: number
	};

	state = {
		displayContent: "day",
		gridColumn: 1
	};

	render() {
		return (
			<Div {...this.props}>
				{this.props.displayContent}
				{this.props.children}
			</Div>
		);
	}
}
