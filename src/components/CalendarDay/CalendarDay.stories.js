import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CalendarDay from "components/CalendarDay";

storiesOf("Calendar Day", module)
	.add("Basic day", () => <CalendarDay displayContent={1} gridColumn={1} />)
	.add("Day with additional elements", () =>
		<CalendarDay displayContent={1} girdColumn={1}>
			<button
				onClick={e => {
					e.preventDefault;
					alert("Thank you");
				}}
			>
				Click me
			</button>
		</CalendarDay>
	)
	.add("Day with additional styling", () =>
		<CalendarDay
			displayContent={1}
			girdColumn={1}
			styling={"border: 20px solid green;"}
		/>
	);
