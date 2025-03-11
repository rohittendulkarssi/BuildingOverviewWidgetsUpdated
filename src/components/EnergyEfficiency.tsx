import React, { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	ReferenceLine,
	Cell,
} from "recharts";
import { Building, CircleChevronRight, Info } from "lucide-react";
import { DropDownButton } from "uxp/components";
// import "./EnergyEfficiency.scss";

interface EnergyEfficiencyProps {
	date: string;
	floor: string;
	filter: string;
}

const generateMockData = (filter: string) => {
	switch (filter) {
		case "Today":
			return {
				spaceArea: 1200,
				baseLine: 500,
				threshold: 85,
				consumptionData: [
					{ timePeriod: "00:00", energyConsumption: 300 },
					{ timePeriod: "06:00", energyConsumption: 450 },
					{ timePeriod: "12:00", energyConsumption: 600 },
					{ timePeriod: "18:00", energyConsumption: 750 },
					{ timePeriod: "24:00", energyConsumption: 900 },
				],
			};
		case "This Week":
			return {
				spaceArea: 1200,
				baseLine: 750,
				threshold: 85,
				consumptionData: [
					{ timePeriod: "Mon", energyConsumption: 300 },
					{ timePeriod: "Tue", energyConsumption: 450 },
					{ timePeriod: "Wed", energyConsumption: 600 },
					{ timePeriod: "Thu", energyConsumption: 750 },
					{ timePeriod: "Fri", energyConsumption: 900 },
					{ timePeriod: "Sat", energyConsumption: 1050 },
					{ timePeriod: "Sun", energyConsumption: 1200 },
				],
			};
		case "This Month":
			return {
				spaceArea: 1200,
				baseLine: 3050,
				threshold: 85,
				consumptionData: [
					{ timePeriod: "Week 1", energyConsumption: 2100 },
					{ timePeriod: "Week 2", energyConsumption: 3150 },
					{ timePeriod: "Week 3", energyConsumption: 4200 },
					{ timePeriod: "Week 4", energyConsumption: 5250 },
				],
			};
		case "This Quarter":
			return {
				spaceArea: 1200,
				baseLine: 10000,
				threshold: 85,
				consumptionData: [
					{ timePeriod: "Jan 1–Mar 31", energyConsumption: 6300 },
					{ timePeriod: "Apr 1–Jun 30", energyConsumption: 9450 },
					{ timePeriod: "Jul 1–Sep 30", energyConsumption: 12600 },
					{ timePeriod: "Oct 1–Dec 31", energyConsumption: 15750 },
				],
			};
		case "This Half Year":
			return {
				spaceArea: 1200,
				baseLine: 20000,
				threshold: 85,
				consumptionData: [
					{ timePeriod: "Jan 1–Jun 30", energyConsumption: 18900 },
					{ timePeriod: "Jul 1–Dec 31", energyConsumption: 25200 },
				],
			};
		case "This Year":
			return {
				spaceArea: 1200,
				baseLine: 3000,
				threshold: 2800,
				consumptionData: [
					{ timePeriod: "Jan", energyConsumption: 2100 },
					{ timePeriod: "Feb", energyConsumption: 1800 },
					{ timePeriod: "Mar", energyConsumption: 2200 },
					{ timePeriod: "Apr", energyConsumption: 2400 },
					{ timePeriod: "May", energyConsumption: 2600 },
					{ timePeriod: "Jun", energyConsumption: 2800 },
					{ timePeriod: "Jul", energyConsumption: 3000 },
					{ timePeriod: "Aug", energyConsumption: 3200 },
					{ timePeriod: "Sep", energyConsumption: 3400 },
					{ timePeriod: "Oct", energyConsumption: 3600 },
					{ timePeriod: "Nov", energyConsumption: 3800 },
					{ timePeriod: "Dec", energyConsumption: 4000 },
				],
			};
		default:
			return {
				spaceArea: 1200,
				baseLine: 100,
				threshold: 85,
				consumptionData: [],
			};
	}
};

const formatNumber = (num: number) => {
	if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
	if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
	if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
	return num.toString();
};

const EnergyEfficiency: React.FC<EnergyEfficiencyProps> = ({ date, floor }) => {
	const [data, setData] = useState({
		spaceArea: 0,
		baseLine: 0,
		threshold: 0,
		consumptionData: [],
	});
	let filter = "This Month";

	useEffect(() => {
		const mockData = generateMockData(filter);
		setData(mockData);
	}, [filter]);

	const totalConsumption = data.consumptionData.reduce(
		(sum, item) => sum + item.energyConsumption,
		0
	);
	return (
		<div className="energy-efficiency-widget">
			<div className="header">
				<Building size={18} />
				{/* <span>Occupancy ({floor})</span> */}
				<span>Energy Efficiency Overview</span>
				<Info size={18} />
			</div>
			<div className="content">
				<div className="location-info">
					{/* <p>{floor}</p> */}
					<p>Building 1</p>
					<p>Floor 1</p>
				</div>
				<div className="info-section">
					<div className="floor-space-info">
						<p>Space Area</p>
						<p>1200 sqm</p>
					</div>
					<div className="overall-consumption-info">
						<p>Total Consumption</p>
						<p>{formatNumber(totalConsumption)} kWH</p>
					</div>
				</div>
				<div className="chart-container">
					{/* <ResponsiveContainer width="100%" height={200}>
						<BarChart data={data}>
							<XAxis dataKey="location" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="energyConsumption" fill="#8884d8" />
						</BarChart>
					</ResponsiveContainer> */}
					<ResponsiveContainer width="100%" height={100}>
						<BarChart data={data.consumptionData}>
							<XAxis dataKey="timePeriod" />
							<YAxis />
							<ReferenceLine
								y={data.baseLine}
								stroke="#000"
								strokeDasharray="3 3"
								label="Baseline"
							/>
							<Tooltip />
							<Bar dataKey="energyConsumption">
								{data.consumptionData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={
											entry.energyConsumption > data.baseLine
												? "#FF6347"
												: "#0fca7a"
											// : "#8884d8"
										}
									/>
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
					{/* <ResponsiveContainer width="100%" height={100}>
						<BarChart data={data}>
							<XAxis dataKey="month" stroke="#666" />
							<YAxis domain={[0, 100]} stroke="#666" />
							{thresholdValue !== null && (
								<ReferenceLine
									y={thresholdValue}
									stroke="#000"
									strokeDasharray="3 3"
									label="Baseline"
								/>
							)}
							<Bar dataKey="score" radius={[4, 4, 0, 0]}>
								{scoreData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer> */}
				</div>
				{/* <p className="widget-insight">
					Consumption {filter} was <span className="insight-numbers">+5%</span>{" "}
					than previous
				</p> */}
				<DropDownButton
					content={() => (
						<div className="weekly-occupancy">
							{data.consumptionData.map((item, index) => {
								const previousItem = data.consumptionData[index - 1];
								const percentageChange = previousItem
									? ((item.energyConsumption - previousItem.energyConsumption) /
											previousItem.energyConsumption) *
									  100
									: 0;
								const isHigh = percentageChange >= 0;
								return (
									<div key={item.timePeriod} className="day">
										<span>{item.timePeriod}</span>
										<span className={`rate ${isHigh ? "high" : "low"}`}>
											{percentageChange.toFixed(1)}%
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
			</div>
		</div>
	);
};
export default EnergyEfficiency;

// interface AppProps {
//     timePeriod: string;
// }

// const App: React.FC<AppProps> = ({ timePeriod }) => {
//     const data = generateMockData(timePeriod);
//     return <EnergyEfficiency data={data} />;
// };

// // Example usage with time period prop
// const ExampleUsage = () => {
//     return <App timePeriod="thisMonth" />;
// };

// export default ExampleUsage;
