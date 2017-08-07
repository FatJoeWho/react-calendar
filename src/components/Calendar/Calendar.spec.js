import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import Calendar from "components/Calendar";
import Moment from "moment";

const fakeEvent = {
	preventDefault: () => {
		return;
	}
};

describe("Calendar", () => {
	it("Should render", () => {
		const _date = new Moment("2 August 2017"),
			component = renderer.create(<Calendar month={_date} />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("Should fetch an array of days", () => {
		const _date = new Moment("2 August 2017"),
			component = mount(<Calendar month={_date} />),
			days = component.instance().getDayList();
		expect(days.length).toEqual(31);
	});

	it("Should go to next and prev month", () => {
		const _date = new Moment("2 August 2017"),
			component = mount(<Calendar month={_date} />);

		expect(component.props().momentJsInstance.format("M")).toEqual("8");
		component.instance().nextMonth(fakeEvent);
		expect(component.props().momentJsInstance.format("M")).toEqual("9");
		component.instance().prevMonth(fakeEvent);
		component.instance().prevMonth(fakeEvent);
		expect(component.props().momentJsInstance.format("M")).toEqual("7");
	});

	it("Should allow dates to be selected and deselected", () => {
		const _date = new Moment("2 August 2017"),
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
		const _date = new Moment("2 August 2017"),
			component = mount(<Calendar month={_date} />);

		component.instance().makeSelection(6);
		expect(component.state("selected").length).toEqual(1);
		expect(component.state("selected").indexOf(6)).toBe(0);
		component.instance().clearSelections();
		expect(component.state("selected").length).toEqual(0);
		expect(component.state("selected").indexOf(6)).toBe(-1);
	});
});
