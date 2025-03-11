import React, { useState, useEffect } from "react";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	LineChart,
	Line,
} from "recharts";
import {
	Smile,
	Frown,
	Meh,
	Info,
	CircleChevronRight,
	ClipboardList,
	ClipboardCheck,
} from "lucide-react";
import { DropDownButton } from "uxp/components";
// import "./TenantSentiments.scss";

interface TenantSentimentWidgetProps {
	date: string;
	floor: string;
	filter: string; // External filter passed (today, this week, this month, this quarter, this half year, this year)
}

const COLORS = ["#76c893", "#FFD700", "#FF6347", "#d3d3d3"];

const generateMockData = (filter: string) => {
	switch (filter) {
		case "Today":
			return {
				totalTickets: 100,
				completedTickets: 70,
				openTickets: 30,
				averageResolutionTime: 5, // in hours
				sentimentData: [
					{ type: "Positive", count: 70 },
					{ type: "Neutral", count: 20 },
					{ type: "Negative", count: 10 },
				],
				trend: [
					{ value: 50 },
					{ value: 80 },
					{ value: 60 },
					{ value: 90 },
					{ value: 70 },
				],
				percentageChange: 21,
			};
		case "This Week":
			return {
				totalTickets: 700,
				completedTickets: 500,
				openTickets: 200,
				averageResolutionTime: 6, // in hours
				sentimentData: [
					{ type: "Positive", count: 500 },
					{ type: "Neutral", count: 150 },
					{ type: "Negative", count: 50 },
				],
				trend: [
					{ value: 60 },
					{ value: 90 },
					{ value: 70 },
					{ value: 100 },
					{ value: 80 },
				],
				percentageChange: 15,
			};
		case "This Month":
			return {
				totalTickets: 3000,
				completedTickets: 2000,
				openTickets: 1000,
				averageResolutionTime: 7, // in hours
				sentimentData: [
					{ type: "Positive", count: 2000 },
					{ type: "Neutral", count: 700 },
					{ type: "Negative", count: 300 },
				],
				trend: [
					{ value: 70 },
					{ value: 100 },
					{ value: 80 },
					{ value: 110 },
					{ value: 90 },
				],
				percentageChange: 10,
			};
		case "This Quarter":
			return {
				totalTickets: 9000,
				completedTickets: 6000,
				openTickets: 3000,
				averageResolutionTime: 8, // in hours
				sentimentData: [
					{ type: "Positive", count: 6000 },
					{ type: "Neutral", count: 2000 },
					{ type: "Negative", count: 1000 },
				],
				trend: [
					{ value: 80 },
					{ value: 110 },
					{ value: 90 },
					{ value: 120 },
					{ value: 100 },
				],
				percentageChange: 5,
			};
		case "This Half Year":
			return {
				totalTickets: 18000,
				completedTickets: 12000,
				openTickets: 6000,
				averageResolutionTime: 9, // in hours
				sentimentData: [
					{ type: "Positive", count: 12000 },
					{ type: "Neutral", count: 4000 },
					{ type: "Negative", count: 2000 },
				],
				trend: [
					{ value: 90 },
					{ value: 120 },
					{ value: 100 },
					{ value: 130 },
					{ value: 110 },
				],
				percentageChange: 2,
			};
		case "This Year":
			return {
				totalTickets: 36000,
				completedTickets: 24000,
				openTickets: 12000,
				averageResolutionTime: 10, // in hours
				sentimentData: [
					{ type: "Positive", count: 24000 },
					{ type: "Neutral", count: 8000 },
					{ type: "Negative", count: 4000 },
				],
				trend: [
					{ value: 100 },
					{ value: 130 },
					{ value: 110 },
					{ value: 140 },
					{ value: 120 },
				],
				percentageChange: -1,
			};
		default:
			return {
				totalTickets: 0,
				completedTickets: 0,
				openTickets: 0,
				averageResolutionTime: 0,
				sentimentData: [],
				trend: [],
				percentageChange: 0,
			};
	}
};

const TenantSentimentWidget: React.FC<TenantSentimentWidgetProps> = (
	{
		// date,
		// floor,
		// filter,
	}
) => {
	let filter = "This Week";
	const [data, setData] = useState({
		totalTickets: 0,
		completedTickets: 0,
		openTickets: 0,
		averageResolutionTime: 0,
		sentimentData: [],
		trend: [],
		percentageChange: 0,
	});

	useEffect(() => {
		const mockData = generateMockData(filter);
		setData(mockData);
	}, [filter]);

	const pieData = data.sentimentData.map((item) => ({
		name: item.type,
		value: item.count,
	}));

	return (
		<div className="tenant-sentiment-widget">
			<div className="header">
				<Smile size={18} />
				<span>Tenant Sentiments</span>
				<Info size={18} />
			</div>
			<div className="content">
				<div className="location-info">
					<p>Building 1</p>
					<p>Floor 1</p>
				</div>
				<div className="insight-block">
					<div className="chart-container">
						<ResponsiveContainer width={100} height={100}>
							<PieChart>
								<Pie
									data={pieData}
									cx="50%"
									cy="50%"
									innerRadius={30}
									outerRadius={40}
									fill="#8884d8"
									paddingAngle={5}
									dataKey="value"
								>
									{pieData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
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
									{`${data.sentimentData.reduce(
										(acc, item) => acc + item.count,
										0
									)}`}
								</text>
							</PieChart>
						</ResponsiveContainer>
					</div>
					<div className="insight-section">
						<div className="task-container">
							<div className="task-number">
								<ClipboardList size={10} />
								<p>{data.totalTickets}</p>
							</div>
							<p className="task-title">Total Tickets</p>
						</div>

						<div className="task-container">
							<div className="task-number">
								<ClipboardCheck size={10} />
								<p>{data.completedTickets}</p>
							</div>
							<p className="task-title">Completed Tickets</p>
						</div>
						{/* <span className="divider"></span>
						<div className="task-container">
							<p className="task-title">Open Tickets</p>
							<div className="task-number">
								<ClipboardList size={10} />
								<p>{data.openTickets}</p>
							</div>
						</div> */}

						<div className="task-container">
							<div className="task-number">
								<ClipboardList size={10} />
								<p>{data.averageResolutionTime} hrs</p>
							</div>
							<p className="task-title">Avg Resolution Time</p>
						</div>
					</div>
				</div>
				{/* <div className="chart-container">
					<ResponsiveContainer width="100%" height={100}>
						<LineChart data={data.trend}>
							<Line
								type="monotone"
								dataKey="value"
								stroke="#B4EC51"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div> */}
				{/* <p className="widget-insight">
					Sentiment change {filter} was{" "}
					<span
						className={data.percentageChange >= 0 ? "positive" : "negative"}
					>
						{data.percentageChange >= 0
							? `+${data.percentageChange}%`
							: `${data.percentageChange}%`}
					</span>{" "}
					vs last month
				</p> */}
				<DropDownButton
					content={() => (
						<div className="weekly-tasks">
							{data.sentimentData.map((item, index) => {
								const previousItem = data.sentimentData[index - 1];
								const percentageChange = previousItem
									? ((item.count - previousItem.count) / previousItem.count) *
									  100
									: 0;
								const isHigh = percentageChange >= 0;
								return (
									<div key={item.type} className="day">
										<span>{item.type}</span>
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

export default TenantSentimentWidget;
