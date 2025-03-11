import React from "react";
import {
	Button,
	DateRangePicker,
	eventDispatcher,
	FilterPanel,
	Select,
} from "uxp/components";
import { IContextProvider } from "../../uxp";
import { IWDDesignModeProps } from "widget-designer/components";

interface FilterComponentProps {
	// selectedDd: string | null;
	// setSelectedDd: (value: string | null) => void;
	uxpContext?: IContextProvider;
	instanceId?: string;
	designer?: IWDDesignModeProps;
	uiProps?: any;
}

const FilterComponent: React.FC<FilterComponentProps> = (props) => {
	let sdt = new Date();
	let dt = new Date(sdt);
	dt.setMonth(dt.getMonth() - 4); // Subtract 2 months
	dt.setUTCHours(0, 0, 0, 0); // Set time to midnight UTC

	let formattedDt = dt.toISOString().split(".")[0] + "Z"; // Format as 2024-06-02T00:00:00Z

	let stdx = new Date(dt.setHours(0, 0, 0, 0));
	let endx = new Date(dt.setHours(23, 59, 59, 999));
	let prevStartDate = new Date(stdx);
	prevStartDate.setDate(prevStartDate.getDate() - 1);
	prevStartDate.setHours(0, 0, 0, 0); // Set to start of the previous day

	let prevEndDate = new Date(endx);
	prevEndDate.setDate(prevEndDate.getDate() - 1);
	prevEndDate.setHours(23, 59, 59, 999); // Set to end of the previous day
	let [start, setStart] = React.useState(stdx);
	let [end, setEnd] = React.useState(endx);
	const [DateRange, setDateRange] = React.useState({
		prevStart: prevStartDate,
		prevEnd: prevEndDate,
	});
	//Value to be received from props
	let [selectedDd, setSelectedDd] = React.useState<any>("Today"); //static drop down
	let [flag, setflag] = React.useState<any>(false);
	let [selectedOption, setSelectedOption] = React.useState<any>([]);

	let [holidayFlag, setholidayFlag] = React.useState<any>(false);
	let [holiday, setholiday] = React.useState<string>("");
	let [pastholidayOption, setpastholidayOption] = React.useState<string>(null);
	let [holidayOption, setholidayOption] = React.useState<string>(null);

	let dropdownOptions: { value: string; label: string }[] = [
		{ value: "Today", label: "Today" },
		{ value: "This Week", label: "This Week" },
		{ value: "This Month", label: "This Month" },
		{ value: "This Quarter", label: "This Quarter" },
		{ value: "This Half Year", label: "This Half Year" },
		{ value: "This Year", label: "This Year" },
		{ value: "Custom", label: "Custom" },
	];
	let [YearList, setYearList] = React.useState([]);
	let [selectedYear, setSelectedYear] = React.useState<any>("2024");
	const [selectedRadio, setSelectedRadio] = React.useState(true);
	const [building, setBuilding] = React.useState<any>(null);
	const [floor, setFloor] = React.useState<any>(null);
	const onDateChange = (newStart: any, newEnd: any) => {
		// console.log(newStart, "newStart");
		// console.log(newEnd, "newEnd");
		// setholidayFlag(false);
		setStart(newStart);
		setEnd(newEnd);
		// setflag(true);

		if (selectedRadio == true) {
			// Only update start and end, do not change newPrevStart and newPrevEnd
			setStart(newStart);
			setEnd(newEnd);
		} else if (flag) {
			// console.log(flag, "flag");

			// Proceed to update newPrevStart and newPrevEnd only if selectedRadio is false
			const diffDays =
				(newEnd.getTime() - newStart.getTime()) / (1000 * 60 * 60 * 24);

			// Calculate previous date range
			const newPrevStart = new Date(newStart);
			newPrevStart.setDate(newPrevStart.getDate() - diffDays);
			newPrevStart.setUTCHours(0, 0, 0, 0);

			const newPrevEnd = new Date(newEnd);
			newPrevEnd.setDate(newPrevEnd.getDate() - diffDays);
			newPrevEnd.setUTCHours(23, 59, 59, 999);

			// Adjust newPrevEnd to be one day earlier
			newPrevEnd.setDate(newPrevEnd.getDate() - 1);
			// console.log(newPrevStart, "newPrevStart123");
			// console.log(newPrevEnd, "newPrevEnd123");
			setDateRange({ prevStart: newPrevStart, prevEnd: newPrevEnd });
			// setPrevStart(newPrevStart);
			// setPrevEnd(newPrevEnd);
		}
	};

	const handleRadioChange = (event: any) => {
		const isChecked = event.target.checked;
		setSelectedRadio(isChecked); // Set selectedRadio to true if checked, false if unchecked
		// console.log("Radiovalue", isChecked);
	};

	const selectHandler = async (data: any) => {
		setholidayOption(data);
		// console.log(data, "PP");
		let date = new Date(data);
		date.setHours(0, 0, 0, 0);
		setStart(date);
		setEnd(date);
		setflag(true);
		setholidayFlag(true);
		// console.log(date.toString(), "DateData");
	};

	const selectPastHandler = async (Pdata: any) => {
		setpastholidayOption(Pdata);
		setholidayFlag(true);
		let date = new Date(Pdata);
		setDateRange({ prevStart: date, prevEnd: date });
		// setPrevStart(date);
		// setPrevEnd(date);
		setflag(true);
	};

	const setDateFunction = (date: any) => {
		console.log(date, "date");
		setSelectedDd(date);
		eventDispatcher(props.instanceId, "date-dispatcher", {
			msg: "date range dispatcher",
			dd: selectedDd, // Send selected dropdown value
			// pickerDate: pickerDate,
		});
	};
	// function exportHolidayData() {
	//     let sheetName = "Queue Management Holiday List";
	//     let fileName = `Queue Management Holiday List Data`;
	//     exportToExcel({ [sheetName]: Holidaydata }, fileName);
	//     //exportToExcel(apidata);
	//   }

	return (
		<FilterPanel>
			<div style={{ marginBottom: "10px" }}>
				<div>
					<Select
						onChange={setBuilding}
						options={[
							{ label: "Building 1", value: "Building 1" },
							{ label: "Building 2", value: "Building 2" },
						]}
						labelField="label"
						valueField="value"
						selected={building}
						placeholder="Select Building"
					/>
				</div>
				<div style={{ marginTop: "15px" }}>
					<Select
						onChange={setFloor}
						options={[
							{ label: "Floor 1", value: "Floor 1" },
							{ label: "Floor 2", value: "Floor 2" },
						]}
						labelField="label"
						valueField="value"
						selected={floor}
						placeholder="Select Floor"
					/>
				</div>

				<div style={{ marginTop: "15px" }}>
					<Select
						onChange={(newValue) => {
							setDateFunction(newValue);
						}}
						options={dropdownOptions}
						labelField={"label"}
						valueField={"value"}
						selected={selectedDd}
					/>
				</div>
				{selectedDd == "Custom" && (
					<div>
						<div style={{ display: "flex" }}>
							<div style={{ marginTop: "15px" }}>
								<DateRangePicker
									title="Date Range"
									startDate={start}
									endDate={end}
									closeOnSelect
									onChange={onDateChange}
								/>
							</div>
						</div>
						<div className="radioButton">
							<input
								type="checkbox"
								value="CustomDate"
								id="CustomDate"
								name="source"
								onChange={(e) => handleRadioChange(e)}
								defaultChecked={selectedRadio}
							/>
							Enable Compare with Previous DateRange
						</div>
					</div>
				)}
				{selectedRadio == true && selectedDd === "Custom" && (
					<div>
						<div>
							<Select
								onChange={(newValue, option) => {
									setSelectedYear(newValue);
									// handleChange(newValue);
								}}
								selected={selectedYear}
								options={YearList}
								// onChange={setSelectedYear}
							/>
						</div>
						<div style={{ display: "flex" }}>
							<div>
								<Select
									labelField="label"
									valueField="date"
									onChange={(newValue, option) => {
										selectHandler(newValue);
										setholiday(option.label);
									}}
									options={selectedOption}
									selected={holidayOption}
									placeholder="Select Holiday"
								/>
							</div>
							{/* <div style={{ marginLeft: "10px" }}>
								<Button
									title=""
									className="download-button"
									onClick={() => {
										exportHolidayData();
									}}
								/>
							</div> */}
						</div>
					</div>
				)}
			</div>
		</FilterPanel>
	);
};

export default FilterComponent;
