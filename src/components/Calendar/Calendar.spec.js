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
});
