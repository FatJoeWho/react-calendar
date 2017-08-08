// @flow

import React from "react";
import Moment from "moment";
import CalendarDay from "components/CalendarDay";
import styled from "styled-components";

export default class Calendar extends React.Component {
	props: {
		selected: Array<number>,
		additionalDatesData?: Array<mixed>,
		additionalDayStyling?: string,
		customHandler?: Function
	};

	static defaultProps = {
		momentJsInstance: Moment()
	};

	state = {
		selected: [],
		additionalDatesData: []
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

	makeSelection = (value: number) => {
		let newValue = this.toggleSelectionValue(value);
		this.setState({
			selected: newValue
		});
	};

	clearSelections = () => {
		this.setState({ selected: [] });
	};

	toggleSelectionValue(value) {
		const _return = this.state.selected;
		_return.indexOf(value) == -1
			? _return.push(value)
			: _return.splice(_return.indexOf(value), 1);
		return _return;
	}

	getDayList = () => {
		return Array(this.props.momentJsInstance.daysInMonth())
			.fill()
			.map((_: mixed, dayIndex: number): Array<any> => {
				let dayInstance = this.props.momentJsInstance
					.clone() //clone so that it is disposed in memory garbage collection
					.date(dayIndex + 1); //0 index counting

				return (
					<CalendarDay
						additionalData={
							this.props.additionalDatesData &&
							this.props.additionalDatesData[dayIndex]
								? this.props.additionalDatesData[dayIndex]
								: null
						}
						onClick={e => {
							this.handleOnClick(e, dayIndex);
						}}
						key={dayIndex}
						fromOtherMonth={false}
						gridColumn={dayInstance.day() + 1}
						displayContent={dayInstance.format("D")}
						style={this.getCustomStyling(dayIndex)}
						selected={
							this.state.selected.indexOf(parseInt(dayInstance.format("D"))) >
							-1
						}
					/>
				);
			});
	};

	getCustomStyling(dayIndex) {
		if (
			this.props.additionalDatesData &&
			this.props.additionalDatesData[dayIndex] != null &&
			this.props.customStyling !== undefined
		) {
			return this.props.customStyling(this.props.additionalDatesData[dayIndex]);
		} else {
			return {};
		}
	}

	handleOnClick(e, dayIndex) {
		e.preventDefault();
		this.makeSelection(dayIndex + 1);
		this.props.onClickCallback(this.props.additionalDatesData[dayIndex]);
	}

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
