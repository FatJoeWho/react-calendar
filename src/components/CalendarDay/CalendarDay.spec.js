import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import CalendarDay from "components/CalendarDay";

describe("CalendarDay", () => {
	it("Should render", () => {
		const component = renderer.create(
			<CalendarDay gridColumn={1} displayContent={1} />
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("Should allow child elements to be passed", () => {
		const sampleFunction = jest.fn();
		const component = mount(
			<CalendarDay gridColumn={1} displayContent={1}>
				<button
					onClick={e => {
						e.preventDefault;
						sampleFunction();
					}}
					className="btn"
				>
					Click me
				</button>
			</CalendarDay>
		);
		expect(component.find(".btn").length).toEqual(1);
		component.find(".btn").simulate("click");
		expect(sampleFunction.mock.calls.length).toBe(1);
	});
});
