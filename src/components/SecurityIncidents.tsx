import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Info, ShieldAlert, CircleChevronRight, Siren } from "lucide-react";
import { DropDownButton } from "uxp/components";
// import "./SecurityIncidents.scss";

interface SecurityIncidentsProps {
	date: string;
	floor: string;
	filter: string; // External filter passed (today, this week, this month, this quarter, this half year, this year)
}

const COLORS = ["#FFD700", "#000000", "#FF6347", "#76c893"];

const generateMockData = (filter: string) => {
	switch (filter) {
		case "Today":
			return {
				totalIncidents: 10,
				securityAlarms: 7,
				breaches: 2,
				otherIncidents: 1,
				incidentData: [
					{ type: "Security Alarms", count: 7 },
					{ type: "Breaches", count: 2 },
					{ type: "Other Incidents", count: 1 },
				],
			};
		case "This Week":
			return {
				totalIncidents: 50,
				securityAlarms: 30,
				breaches: 15,
				otherIncidents: 5,
				incidentData: [
					{ type: "Security Alarms", count: 30 },
					{ type: "Breaches", count: 15 },
					{ type: "Other Incidents", count: 5 },
				],
			};
		case "This Month":
			return {
				totalIncidents: 200,
				securityAlarms: 120,
				breaches: 60,
				otherIncidents: 20,
				incidentData: [
					{ type: "Security Alarms", count: 120 },
					{ type: "Breaches", count: 60 },
					{ type: "Other Incidents", count: 20 },
				],
			};
		case "This Quarter":
			return {
				totalIncidents: 600,
				securityAlarms: 360,
				breaches: 180,
				otherIncidents: 60,
				incidentData: [
					{ type: "Security Alarms", count: 360 },
					{ type: "Breaches", count: 180 },
					{ type: "Other Incidents", count: 60 },
				],
			};
		case "This Half Year":
			return {
				totalIncidents: 1200,
				securityAlarms: 720,
				breaches: 360,
				otherIncidents: 120,
				incidentData: [
					{ type: "Security Alarms", count: 720 },
					{ type: "Breaches", count: 360 },
					{ type: "Other Incidents", count: 120 },
				],
			};
		case "This Year":
			return {
				totalIncidents: 2400,
				securityAlarms: 1440,
				breaches: 720,
				otherIncidents: 240,
				incidentData: [
					{ type: "Security Alarms", count: 1440 },
					{ type: "Breaches", count: 720 },
					{ type: "Other Incidents", count: 240 },
				],
			};
		default:
			return {
				totalIncidents: 0,
				securityAlarms: 0,
				breaches: 0,
				otherIncidents: 0,
				incidentData: [],
			};
	}
};

const SecurityIncidents: React.FC<SecurityIncidentsProps> = (
	{
		// date,
		// floor,
		// filter,
	}
) => {
	let filter = "This Week"; // Default filter
	const [data, setData] = useState({
		totalIncidents: 0,
		securityAlarms: 0,
		breaches: 0,
		otherIncidents: 0,
		incidentData: [],
	});

	useEffect(() => {
		const mockData = generateMockData(filter);
		setData(mockData);
	}, [filter]);

	const pieData = data.incidentData.map((item) => ({
		name: item.type,
		value: item.count,
	}));

	return (
		<div
			className="security-incidents-widget"
			style={{ backgroundColor: "#000", color: "#FFD700" }}
		>
			<div className="header">
				<ShieldAlert size={18} />
				<span>Security Incidents</span>
				<Info size={18} />
			</div>
			<div className="content">
				<div className="location-info">
					<p>Building 1</p>
					<p>Floor 1</p>
				</div>
				<div className="insight-block">
					<div className="insight-section">
						<div className="task-container">
							<p className="task-title">Total Incidents</p>
							<div className="task-number">
								<ShieldAlert size={18} />
								<p>{data.totalIncidents}</p>
							</div>
						</div>
						<span className="divider"></span>
						<div className="task-container">
							<p className="task-title">Security Alarms</p>
							<div className="task-number">
								<Siren size={18} />
								<p>{data.securityAlarms}</p>
							</div>
						</div>
					</div>
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
									fill="#FFD700"
									fontSize={16}
									fontWeight="bold"
								>
									{`${data.totalIncidents}`}
								</text>
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>
				<p className="widget-insight">
					Incident rate {filter} was{" "}
					<span className="insight-numbers">+5%</span> than previous
				</p>
				<DropDownButton
					content={() => (
						<div className="weekly-incidents">
							{data.incidentData.map((item, index) => {
								const previousItem = data.incidentData[index - 1];
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

export default SecurityIncidents;
