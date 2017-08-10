import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import Calendar from "components/Calendar";
import Moment from "moment";
import Faker from "faker";

const fakeEvent = {
	preventDefault: () => {
		return;
	}
};

const _date = new Moment(),
	additionalDataTypes = ["", Faker.lorem.word, Faker.lorem.word];

let generateTestDateData = (monthSuffix, numberOfDays) => {
	let testData = [];
	for (let count = 1; count <= numberOfDays; count++) {
		testData[count + monthSuffix] = {
			type:
				additionalDataTypes[
					Faker.random.number({
						min: 0,
						max: 2
					})
				]
		};
	}
	return testData;
};
let testData = generateTestDateData("/8", 31);

describe("Calendar", () => {
	it("Should render", () => {
		const _date = new Moment("2 August 2017", "D MMMM YYYY"),
			component = renderer.create(<Calendar month={_date} />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("Should fetch an array of days", () => {
		const _date = new Moment("2 August 2017", "D MMMM YYYY"),
			component = mount(<Calendar month={_date} />),
			days = component.instance().getDayList();
		expect(days.length).toEqual(31);
	});

	it("Should go to next and prev month", () => {
		const _date = new Moment("2 August 2017", "D MMMM YYYY"),
			component = mount(<Calendar month={_date} />);

		expect(component.props().momentJsInstance.format("M")).toEqual("8");
		component.instance().nextMonth(fakeEvent);
		expect(component.props().momentJsInstance.format("M")).toEqual("9");
		component.instance().prevMonth(fakeEvent);
		component.instance().prevMonth(fakeEvent);
		expect(component.props().momentJsInstance.format("M")).toEqual("7");
	});

	it("Should allow dates to be selected and deselected", () => {
		const _date = new Moment("2 August 2017", "D MMMM YYYY"),
			component = mount(<Calendar month={_date} />);

		component.instance().makeSelection(6);
		expect(component.state("selected").length).toEqual(1);
		expect(component.state("selected").indexOf(6)).toBe(0); //it would be the only item in the array
		component.instance().makeSelection(6);
		component.instance().makeSelection(7);
		expect(component.state("selected").indexOf(6)).toBe(-1); //it should be removed
		expect(component.state("selected").indexOf(7)).toBe(0); //it should have been added
	});

	it("Should clear selected dates", () => {
		const _date = new Moment("2 August 2017", "D MMMM YYYY"),
			component = mount(<Calendar month={_date} />);

		component.instance().makeSelection(6);
		expect(component.state("selected").length).toEqual(1);
		expect(component.state("selected").indexOf(6)).toBe(0);
		component.instance().clearSelections();
		expect(component.state("selected").length).toEqual(0);
		expect(component.state("selected").indexOf(6)).toBe(-1);
	});

	it("Should allow custom functions to operate on passed data", () => {
		const _date = new Moment("2 August 2017", "D MMMM YYYY"),
			component = mount(
				<Calendar
					month={_date}
					additionalDatesData={testData}
					customStyling={props => {
						return { border: "1px solid green" };
					}}
					onClickCallback={data => {
						return "custom call back response";
					}}
				/>
			);

		let componentInstance = component.instance();
		const callbackResult = componentInstance.props.onClickCallback(
			componentInstance.props.additionalDatesData[0]
		);
		expect(callbackResult).toEqual("custom call back response");
	});

	it("Should allow custom styling based on passed data", () => {
		const _date = new Moment("2 August 2017", "D MMMM YYYY"),
			component = mount(
				<Calendar
					month={_date}
					additionalDatesData={testData}
					customStyling={props => {
						return { border: "1px solid green" };
					}}
					onClickCallback={data => {
						return "custom call back response";
					}}
				/>
			);

		let componentInstance = component.instance();
		const callbackResult = componentInstance.props.customStyling();
		expect(callbackResult).toEqual({ border: "1px solid green" });
	});

	it("Should add additional dates data via function", () => {
		let testData2 = generateTestDateData("/2", 28);
		const _date = new Moment("2 August 2017", "D MMMM YYYY"),
			component = mount(
				<Calendar
					month={_date}
					additionalDatesData={testData}
					customStyling={props => {
						return { border: "1px solid green" };
					}}
					onClickCallback={data => {
						return "custom call back response";
					}}
				/>
			);

		let componentInstance = component.instance(),
			originalAdditionalDatesData = Object.assign(
				{},
				componentInstance.props.additionalDatesData
			),
			currentAdditionalDatesData;

		componentInstance.addAdditionalDatesData(testData2);

		currentAdditionalDatesData = componentInstance.props.additionalDatesData;

		expect(
			Object.keys(testData).every(el => {
				return Object.keys(originalAdditionalDatesData).indexOf(el) > -1;
			})
		).toEqual(true); //check testData elements are in the originalAdditionalDatesData array.

		expect(
			Object.keys(testData2).every(el => {
				return Object.keys(originalAdditionalDatesData).indexOf(el) == -1;
			})
		).toEqual(true); //check testData2 elements are not in the originalAdditionalDatesData array.

		expect(
			Object.keys(testData).every(el => {
				return Object.keys(currentAdditionalDatesData).indexOf(el) > -1;
			})
		).toEqual(true); //check testData elements are in the currentAdditionalDatesData array.

		expect(
			Object.keys(testData2).every(el => {
				return Object.keys(currentAdditionalDatesData).indexOf(el) == -1;
			})
		).toEqual(true); //check testData2 elements are not in the currentAdditionalDatesData array.
	});
});
