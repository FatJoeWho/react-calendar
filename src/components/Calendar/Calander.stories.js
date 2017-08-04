import React from "react";
import { storiesOf } from "@storybook/react";
import Calendar from "components/Calendar";
import Moment from "moment";

const _date = new Moment();

storiesOf("Calendar", module).add("Basic Month", () =>
	<Calendar month={_date} />
);
