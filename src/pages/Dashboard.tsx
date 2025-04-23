import React, { useEffect, useState } from "react";
import {
	Card,
	Statistic,
	Table,
	Tag,
	Select,
	message,
	Form,
	Button,
	Switch
} from "antd";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Legend
} from "recharts";
import axios from "axios";
import "../styles/Dashboard.css";
import { calculateRiskScore } from "../utils/calculateRiskScore";
import { Customer } from "../types/Customer";
import { DashboardProps } from "../types/DashboardProps";


const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, setIsDarkMode }) => {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [loading, setLoading] = useState(true);
	const [sortField, setSortField] = useState<keyof Customer | null>(null);
	const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>(null);
	const [filterColumn, setFilterColumn] = useState<string>("name");
	const [filterValue, setFilterValue] = useState<string>("");

	useEffect(() => {
		axios.get("http://localhost:5000/api/customers").then(res => {
			const scoredData = res.data.map((c: Customer) => ({
				...c,
				riskScore: calculateRiskScore(c)
			}));
			setCustomers(scoredData);
			setLoading(false);
		});
	}, []);

	const handleStatusChange = async (value: string, record: Customer) => {
		const updated = customers.map(c =>
			c.customerId === record.customerId ? { ...c, status: value } : c
		);
		setCustomers(updated);
		try {
			await axios.post("http://localhost:5000/api/status", {
				customerId: record.customerId,
				status: value
			});
			message.success("Status updated");
			if (record.riskScore && record.riskScore > 70) {
				await axios.post("http://localhost:5000/api/alerts", { customerId: record.customerId });
			}
		} catch {
			message.error("Update failed");
		}
	};

	const handleSort = (field: keyof Customer) => {
		const order = sortField === field && sortOrder === 'ascend' ? 'descend' : 'ascend';
		setSortField(field);
		setSortOrder(order);
	};

	const filteredData = customers.filter((c) => {
		if (!filterValue) return true;

		if (filterColumn === "name") {
			return c.name.toLowerCase().includes(filterValue.toLowerCase());
		}
		if (filterColumn === "creditScore") {
			return c.creditScore?.toString().includes(filterValue);
		}
		if (filterColumn === "riskScore") {
			const score = c.riskScore ?? 0;
			if (filterValue === "Low") return score >= 0 && score <= 40;
			if (filterValue === "Medium") return score >= 41 && score <= 70;
			if (filterValue === "High") return score >= 71;
			return true;
		}
		if (filterColumn === "status") {
			return c.status === filterValue;
		}
		return true;
	});



	const columns = [
		{
			title: (
				<span onClick={() => handleSort("name")}>
					Name {sortField === "name" ? (sortOrder === "ascend" ? "△" : "▽") : "△▽"}
				</span>
			),
			dataIndex: "name",
		},
		{
			title: (
				<span onClick={() => handleSort("creditScore")}>
					Credit Score {sortField === "creditScore" ? (sortOrder === "ascend" ? "△" : "▽") : "△▽"}
				</span>
			),
			dataIndex: "creditScore",
		},
		{
			title: (
				<span onClick={() => handleSort("riskScore")}>
					Risk Score {sortField === "riskScore" ? (sortOrder === "ascend" ? "△" : "▽") : "△▽"}
				</span>
			),
			dataIndex: "riskScore",
			render: (score: number) => (
				<Tag color={score > 70 ? "red" : score > 40 ? "orange" : "green"}>{score}</Tag>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (_: any, record: Customer) => (
				<Form
					layout="inline"
					initialValues={{ status: record.status }}
					onFinish={values => handleStatusChange(values.status, record)}
				>
					<Form.Item name="status" noStyle>
						<Select style={{ width: 120 }}>
							<Select.Option value="Review">Review</Select.Option>
							<Select.Option value="Approved">Approved</Select.Option>
							<Select.Option value="Rejected">Rejected</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item style={{ marginLeft: "10px" }}>
						<Button type="primary" htmlType="submit" size="small">
							Update
						</Button>
					</Form.Item>
				</Form>
			),
		},
	];


	const riskDistribution = [
		{ name: "Low", value: customers.filter(c => c.riskScore !== undefined && c.riskScore <= 40).length },
		{ name: "Medium", value: customers.filter(c => c.riskScore !== undefined && c.riskScore > 40 && c.riskScore <= 70).length },
		{ name: "High", value: customers.filter(c => c.riskScore !== undefined && c.riskScore > 70).length },
	];


	const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];
	const incomeVsExpenses = customers.map(c => ({
		name: c.name,
		Income: c.monthlyIncome,
		Expenses: c.monthlyExpenses
	}));

	return (
		<div className={`app-container ${isDarkMode ? "dark" : ""}`}>
			<div className={`dashboard-header ${isDarkMode ? "dark" : ""}`}>
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
					<span >Finance Dashboard</span></div>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
					<span style={{ fontSize: "14px" }}>{isDarkMode ? "Dark" : "Light"} Mode</span>
					<Switch
						checked={isDarkMode}
						onChange={(checked: boolean) => setIsDarkMode(checked)}
						checkedChildren="🌙"
						unCheckedChildren="☀️"
					/>
				</div>
			</div>
			<div className="dashboard-container">
				<Card title="Financial Summary">
					<Statistic valueStyle={{ fontSize: "5rem", lineHeight: 1, textAlign: "center", color: "#4CAF50" }} title="Total Customers" value={customers.length} />
				</Card>

				<Card title="Income vs Expenses" >
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={incomeVsExpenses}>
							<XAxis dataKey="name"
								scale="point"
								padding={{ left: 50, right: 50 }}
							/>
							<YAxis />
							<Tooltip />
							<Legend />
							<Line type="monotone" dataKey="Income" stroke="#795548" />
							<Line type="monotone" dataKey="Expenses" stroke="#8884d8" />
						</LineChart>
					</ResponsiveContainer>
				</Card>

				<Card
					title="Risk Score Distribution"
					style={{ padding: "1rem", justifyContent: "center", alignItems: "center" }}
				>
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						<PieChart width={350} height={300}>
							<Pie
								data={riskDistribution}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								labelLine={false}
								label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
								outerRadius={100}
							>
								{riskDistribution.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip
								contentStyle={{
									backgroundColor: "#fff",
									borderRadius: "8px",
									border: "1px solid #ccc",
									padding: "10px"
								}}
								itemStyle={{ color: "#333", fontSize: "14px" }}
								formatter={(value: number, name: string) => [`${value}`, `${name}`]}
							/>
						</PieChart>
					</div>
				</Card>

				<Card title="Customer Table" className="col-span-2">
					<div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
						<Select
							value={filterColumn}
							onChange={(value) => {
								setFilterColumn(value);
								setFilterValue("");
							}}
							style={{ width: 200 }}
						>
							<Select.Option value="name">Name</Select.Option>
							<Select.Option value="creditScore">Credit Score</Select.Option>
							<Select.Option value="riskScore">Risk Score</Select.Option>
							<Select.Option value="status">Status</Select.Option>
						</Select>

						{filterColumn === "riskScore" ? (
							<Select
								value={filterValue}
								onChange={setFilterValue}
								style={{ width: 200 }}
								placeholder="Select risk score"
							>
								<Select.Option value="Low">Low</Select.Option>
								<Select.Option value="Medium">Medium</Select.Option>
								<Select.Option value="High">High</Select.Option>
							</Select>
						) : filterColumn === "status" ? (
							<Select
								value={filterValue}
								onChange={setFilterValue}
								style={{ width: 200 }}
								placeholder="Select status"
							>
								<Select.Option value="Review">Review</Select.Option>
								<Select.Option value="Approved">Approved</Select.Option>
								<Select.Option value="Rejected">Rejected</Select.Option>
							</Select>
						) : (
							<input
								type="text"
								value={filterValue}
								onChange={(e) => setFilterValue(e.target.value)}
								placeholder={`Enter ${filterColumn}`}
								style={{
									width: 200,
									padding: "6px 12px",
									border: "1px solid #ccc",
									borderRadius: "4px"
								}}
							/>
						)}
					</div>

					<Table
						columns={columns}
						dataSource={[...filteredData].sort((a, b) => {
							if (!sortField) return 0;
							const aValue = a[sortField]!;
							const bValue = b[sortField]!;
							if (typeof aValue === 'number' && typeof bValue === 'number') {
								return sortOrder === 'ascend' ? aValue - bValue : bValue - aValue;
							}
							return sortOrder === 'ascend'
								? String(aValue).localeCompare(String(bValue))
								: String(bValue).localeCompare(String(aValue));
						})}

						rowKey="customerId"
						loading={loading}
						pagination={{ pageSize: 5 }}
					/>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
