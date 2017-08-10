// @flow

import React from "react";
import Moment from "moment";
import CalendarDay from "components/CalendarDay";
import styled from "styled-components";

export default class Calendar extends React.Component {
	props: {
		selected: Array<number>,
		additionalDatesData?: Array<mixed>,
		customHandler?: Function,
		customStyling?: Function,
		momentJsInstance: mixed
	};

	static defaultProps = {
		momentJsInstance: Moment()
	};

	state = {
		selected: [],
		additionalDatesData: []
	};

	nextMonth = (e: Event) => {
		e.preventDefault();
		this.setState({
			momentJsInstance: this.props.momentJsInstance.add(1, "M")
		});
	};

	prevMonth = (e: Event) => {
		e.preventDefault();
		this.setState({
			momentJsInstance: this.props.momentJsInstance.subtract(1, "M")
		});
	};

	makeSelection = (value: string) => {
		let newValue = this.toggleSelectionValue(value);
		this.setState({
			selected: newValue
		});
	};

	clearSelections = () => {
		this.setState({ selected: [] });
	};

	toggleSelectionValue(value: string) {
		const _return = this.state.selected;
		_return.indexOf(value) == -1
			? _return.push(value)
			: _return.splice(_return.indexOf(value), 1);
		return _return;
	}

	getDayList = () => {
		const monthIndex: number = this.props.momentJsInstance.format("M");
		return Array(this.props.momentJsInstance.daysInMonth())
			.fill()
			.map((_: mixed, dayIndex: number): Array<any> => {
				let dayInstance: mixed = this.props.momentJsInstance
					.clone() //clone so that it is disposed in memory garbage collection
					.date(dayIndex + 1); //0 index counting

				return (
					<CalendarDay
						additionalData={
							this.props.additionalDatesData &&
							this.props.additionalDatesData[dayIndex + "/" + monthIndex]
								? this.props.additionalDatesData[dayIndex + "/" + monthIndex]
								: null
						}
						onClick={(e: Event) => {
							this.handleOnClick(e, dayIndex + "/" + monthIndex);
						}}
						key={dayIndex}
						fromOtherMonth={false}
						gridColumn={dayInstance.day() + 1}
						displayContent={dayInstance.format("D")}
						style={this.getCustomStyling(dayIndex + "/" + monthIndex)}
						selected={
							this.state.selected.indexOf(dayIndex + "/" + monthIndex) > -1
						}
					/>
				);
			});
	};

	getCustomStyling(dateIndex: string) {
		if (
			this.props.additionalDatesData &&
			this.props.additionalDatesData[dateIndex] != null &&
			this.props.customStyling !== undefined
		) {
			return this.props.customStyling(
				this.props.additionalDatesData[dateIndex]
			);
		} else {
			return {};
		}
	}

	handleOnClick(e: Event, dateIndex: string) {
		e.preventDefault();
		this.makeSelection(dateIndex);
		this.props.onClickCallback(this.props.additionalDatesData[dateIndex]);
	}

	addAdditionalDatesData = (newData: mixed) => {
		let newArray: Array<mixed> = Object.assign(
			{},
			this.props.additionalDatesData,
			newData
		);
		this.setState({ additionalDatesData: newArray });
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
