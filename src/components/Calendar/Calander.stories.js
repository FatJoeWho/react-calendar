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

storiesOf("Calendar", module)
	.add("Basic Month", () => <Calendar month={_date} />)
	.add("Calendar with data", () =>
		<Calendar month={_date} additionalDatesData={testData} />
	)
	.add("Calendar with custom data", () =>
		<Calendar
			month={new Moment("2 August 2017")}
			additionalDatesData={testData}
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
