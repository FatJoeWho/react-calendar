import React from "react";
import { storiesOf } from "@storybook/react";
import Calendar from "components/Calendar";
import Moment from "moment";
import Faker from "faker";

const _date = new Moment(),
	additionalDataTypes = [
		Faker.lorem.word(),
		Faker.lorem.word(),
		Faker.lorem.word()
	];

let test_data = [];

for (var count = 0; count <= _date.daysInMonth(); count++) {
	test_data[count] = {
		type:
			additionalDataTypes[
				Faker.random.number({
					min: 0,
					max: 2
				})
			],
		value: Faker.lorem.word
	};
}

storiesOf("Calendar", module)
	.add("Basic Month", () => <Calendar month={_date} />)
	.add("Calendar with data", () =>
		<Calendar month={_date} additionalDatesData={test_data} />
	)
	.add("Calendar with custom data", () =>
		<Calendar
			month={new Moment("2 August 2017")}
			additionalDatesData={test_data}
			customStyling={props => {
				return {
					border: props.type == additionalDataTypes[1] ? "10px solid blue" : ""
				};
			}}
			onClickCallback={data => {
				if (data.type == additionalDataTypes[2]) {
					return additionalDataTypes[2];
				}
			}}
		/>
	);
