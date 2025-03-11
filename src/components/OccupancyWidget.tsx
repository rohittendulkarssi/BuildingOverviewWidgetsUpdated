// import React from "react";
// import { LineChart, Line, ResponsiveContainer } from "recharts";
// import { Info, Clock } from "lucide-react";
// import { PieChart, Pie, Cell } from "recharts";
// // import "./OccupancyWidget.scss";

// interface OccupancyWidgetProps {
// 	date: string;
// 	floor: string;
// }

// const COLORS = ["#76c893", "#d3d3d3"];

// const getOccupancyColor = (rate: number) => {
// 	if (rate <= 70) return "#76c893"; // Green
// 	if (rate <= 85) return "#FFD700"; // Yellow
// 	return "#FF6347"; // Red
// };

// const OccupancyWidget: React.FC<OccupancyWidgetProps> = ({ date, floor }) => {
// 	const occupiedSpace = 150; // Static data
// 	const totalSpace = 200; // Static data
// 	const occupancyRate = ((occupiedSpace / totalSpace) * 100).toFixed(1);
// 	const occupancyRateNumber = parseFloat(occupancyRate); // Convert to number

// 	const data = [
// 		{ name: "Occupied", value: occupancyRateNumber },
// 		{ name: "Available", value: 100 - occupancyRateNumber },
// 	];

// 	return (
// 		<div className="occupancy-widget">
// 			<div className="header">
// 				<Clock size={18} />
// 				{/* <span>Occupancy ({floor})</span> */}
// 				<span>Occupancy This Week</span>
// 				<Info size={18} />
// 			</div>
// 			<div className="content">
// 				<div className="location-info">
// 					{/* <p>{floor}</p> */}
// 					<p>Building 1</p>
// 					<p>Floor 1</p>
// 				</div>
// 				<div className="chart-container">
// 					<ResponsiveContainer width={100} height={100}>
// 						<PieChart>
// 							<Pie
// 								data={data}
// 								cx="50%"
// 								cy="50%"
// 								innerRadius={30}
// 								outerRadius={40}
// 								fill="#8884d8"
// 								paddingAngle={5}
// 								dataKey="value"
// 							>
// 								{data.map((entry, index) => (
// 									<Cell
// 										key={`cell-${index}`}
// 										fill={
// 											index === 0
// 												? getOccupancyColor(occupancyRateNumber)
// 												: COLORS[1]
// 										}
// 									/>
// 								))}
// 							</Pie>
// 							<text
// 								x="50%"
// 								y="50%"
// 								dy={8}
// 								textAnchor="middle"
// 								fill="#333"
// 								fontSize={16}
// 								fontWeight="bold"
// 							>
// 								{`${occupancyRate}%`}
// 							</text>
// 						</PieChart>
// 					</ResponsiveContainer>
// 				</div>
// 				<p>Utilization This Week</p>
// 				<div className="weekly-occupancy">
// 					{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
// 						(day, index) => {
// 							const dailyRate = data[index % data.length].value;
// 							const isHigh = dailyRate >= occupancyRateNumber;
// 							console.log(
// 								"daily rate and occupancy Rate",
// 								dailyRate,
// 								occupancyRateNumber
// 							);
// 							return (
// 								<div key={day} className="day">
// 									<span>{day}</span>
// 									<span className={`rate ${isHigh ? "high" : "low"}`}>
// 										{dailyRate}%
// 										<span className={`icon ${isHigh ? "green" : "red"}`} />
// 									</span>
// 								</div>
// 							);
// 						}
// 					)}
// 				</div>
// 				{/* <ResponsiveContainer width="100%" height={40}>
//                     <LineChart data={data}>
//                         <Line
//                             type="monotone"
//                             dataKey="value"
//                             stroke="#76c893"
//                             strokeWidth={2}
//                             dot={false}
//                         />
//                     </LineChart>
//                 {/* <p>Utilization for {date}</p> */}
// 			</div>
// 		</div>
// 	);
// };

// export default OccupancyWidget;

import React, { useState, useEffect } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { Info, Clock, CircleChevronRight } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import { DropDownButton, useEventSubscriber } from "uxp/components";
import { IContextProvider } from "../uxp";
import { IWDDesignModeProps } from "widget-designer/components";
// import "./OccupancyWidget.scss";

interface OccupancyWidgetProps {
	date: string;
	floor: string;
	filter: string; // External filter passed (today, this week, this month, this quarter, this half year, this year)
	uxpContext?: IContextProvider;
	instanceId?: string;
	designer?: IWDDesignModeProps;
	uiProps?: any;
}

const COLORS = ["#76c893", "#d3d3d3"];

const getOccupancyColor = (rate: number, threshold: number) => {
	if (rate < threshold) return "#A52A2A"; // Brown for underutilized
	if (rate > threshold) return "#FF6347"; // Red for overutilized
	return "#76c893"; // Green for normal
};

const OccupancyWidget: React.FC<OccupancyWidgetProps> = (props) => {
	let filter = "This Week"; // Default filter
	// let filter; // Default filter
	const capacity = 200; // Static data for capacity
	const occupancyThreshold = 70; // Static data for occupancy threshold
	const occupiedSpace = 150; // Static data for occupied space
	const occupancyRate = ((occupiedSpace / capacity) * 100).toFixed(1);
	const occupancyRateNumber = parseFloat(occupancyRate); // Convert to number

	const data = [
		{ name: "Occupied", value: occupancyRateNumber },
		{ name: "Available", value: 100 - occupancyRateNumber },
	];

	const [weeklyData, setWeeklyData] = useState([]);
	// const [filter, setFilter] = useState(props.filter);

	// useEventSubscriber(props.instanceId, "date-dispatcher", (filter) => {
	// 	console.log("event received", filter);
	// 	const generateMockData = () => {
	// 		switch (filter.dd) {
	// 			case "Today":
	// 				return [];
	// 			case "This Week":
	// 				return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	// 			case "This Month":
	// 				return ["Week 1", "Week 2", "Week 3", "Week 4"];
	// 			case "This Quarter":
	// 				return [
	// 					"Jan 1–Mar 31",
	// 					"Apr 1–Jun 30",
	// 					"Jul 1–Sep 30",
	// 					"Oct 1–Dec 31",
	// 				];
	// 			case "This Half Year":
	// 				return ["Jan 1–Jun 30", "Jul 1–Dec 31"];
	// 			case "This Year":
	// 				return [
	// 					"Jan",
	// 					"Feb",
	// 					"Mar",
	// 					"Apr",
	// 					"May",
	// 					"Jun",
	// 					"Jul",
	// 					"Aug",
	// 					"Sep",
	// 					"Oct",
	// 					"Nov",
	// 					"Dec",
	// 				];
	// 			default:
	// 				return [];
	// 		}
	// 	};

	// 	setWeeklyData(generateMockData());
	// });

	useEffect(() => {
		console.log("filter", filter);
		const generateMockData = () => {
			switch (filter) {
				case "Today":
					return [];
				case "This Week":
					return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
				case "This Month":
					return ["Week 1", "Week 2", "Week 3", "Week 4"];
				case "This Quarter":
					return [
						"Jan 1–Mar 31",
						"Apr 1–Jun 30",
						"Jul 1–Sep 30",
						"Oct 1–Dec 31",
					];
				case "This Half Year":
					return ["Jan 1–Jun 30", "Jul 1–Dec 31"];
				case "This Year":
					return [
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec",
					];
				default:
					return [];
			}
		};

		setWeeklyData(generateMockData());
	}, [props.filter]);

	return (
		<div className="occupancy-widget">
			<div className="header">
				<Clock size={18} />
				{/* <span>Occupancy ({floor})</span> */}
				<span>Occupancy {filter}</span>
				<Info size={18} />
			</div>
			<div className="content">
				<div className="location-info">
					{/* <p>{floor}</p> */}
					<p>Building 1</p>
					<p>Floor 1</p>
				</div>
				<div className="insight-block">
					<div className="capacity-container">
						<p>Floor Capacity</p>
						<p>250</p>
					</div>
					<div className="chart-container">
						<ResponsiveContainer width={100} height={100}>
							<PieChart>
								<Pie
									data={data}
									cx="50%"
									cy="50%"
									innerRadius={30}
									outerRadius={40}
									fill="#8884d8"
									paddingAngle={5}
									dataKey="value"
								>
									{data.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={
												index === 0
													? getOccupancyColor(
															occupancyRateNumber,
															occupancyThreshold
													  )
													: COLORS[1]
											}
										/>
									))}
								</Pie>
								<Tooltip />
								<text
									x="50%"
									y="50%"
									dy={8}
									textAnchor="middle"
									fill="#333"
									fontSize={16}
									fontWeight="bold"
								>
									{`${occupancyRate}%`}
								</text>
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>
				<p className="widget-insight">
					Utilization {filter} was <span className="insight-numbers">+5%</span>{" "}
					than previous
				</p>
				<DropDownButton
					content={() => (
						<div className="weekly-occupancy">
							{weeklyData.map((day, index) => {
								const dailyRate = data[index % data.length].value;
								const isHigh = dailyRate >= occupancyRateNumber;
								return (
									<div key={day} className="day">
										<span>{day}</span>
										<span className={`rate ${isHigh ? "high" : "low"}`}>
											{dailyRate}%
											<span
												className={`icon-indicator ${isHigh ? "green" : "red"}`}
											/>
										</span>
									</div>
								);
							})}
						</div>
					)}
					position="right center"
				>
					<CircleChevronRight />
				</DropDownButton>
				{/* <div className="weekly-occupancy">
					{weeklyData.map((day, index) => {
						const dailyRate = data[index % data.length].value;
						const isHigh = dailyRate >= occupancyRateNumber;
						return (
							<div key={day} className="day">
								<span>{day}</span>
								<span className={`rate ${isHigh ? "high" : "low"}`}>
									{dailyRate}%
									<span
										className={`icon-indicator ${isHigh ? "green" : "red"}`}
									/>
								</span>
							</div>
						);
					})}
				</div> */}
				{/* <ResponsiveContainer width="100%" height={40}>
                    <LineChart data={data}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#76c893"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                {/* <p>Utilization for {date}</p> */}
			</div>
		</div>
	);
};

export default OccupancyWidget;
