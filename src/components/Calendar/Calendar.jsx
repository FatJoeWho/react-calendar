// @flow

import React from "react";
import Moment from "moment";
import CalendarDay from "components/CalendarDay";
import styled from "styled-components";

export default class Calendar extends React.Component {
	static defaultProps = {
		momentJsInstance: Moment()
	};

	nextMonth = e => {
		e.preventDefault();
		this.setState({
			momentJsInstance: this.props.momentJsInstance.add(1, "M")
		});
	};

	prevMonth = e => {
		e.preventDefault();
		this.setState({
			momentJsInstance: this.props.momentJsInstance.subtract(1, "M")
		});
	};

	getDayList = () => {
		return Array(this.props.momentJsInstance.daysInMonth())
			.fill()
			.map((_: mixed, dayNumber: number): Array<any> => {
				let dayInstance = this.props.momentJsInstance
					.clone() //clone so that it is disposed in memory garbage collection
					.date(dayNumber + 1); //0 index counting
				return (
					<CalendarDay
						key={dayNumber}
						fromOtherMonth={false}
						gridColumn={dayInstance.day() + 1}
						displayContent={dayInstance.format("D")}
					/>
				);
			});
	};

	render() {
		const dayList = this.getDayList();
		return (
			<div>
				<header>
					<button onClick={this.prevMonth}>&larr;</button>
					<div>
						{this.props.momentJsInstance.format("MMMM YYYY")}
					</div>
					<button onClick={this.nextMonth}>&rarr;</button>
				</header>
				<DayHeadersDiv>
					<div>Sun</div>
					<div>Mon</div>
					<div>Tues</div>
					<div>Wed</div>
					<div>Thurs</div>
					<div>Fri</div>
					<div>Sat</div>
				</DayHeadersDiv>
				<MonthDiv>
					{dayList}
				</MonthDiv>
			</div>
		);
	}
}

const DayHeadersDiv = styled.div`
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 10px;
		grid-auto-rows: minmax(1fr, auto);
		text-align: center;
	`,
	MonthDiv = styled.div`
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 10px;
		border: 1px solid black;
	`;
