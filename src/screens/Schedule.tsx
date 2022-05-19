import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useUserContext } from "../hooks/useUserContext";
import { Container } from "@mui/material";
import { timestampToDate } from "../utils/functions/timestampToDate";
import { getDate } from "../utils/functions/getDate";

const Schedule = () => {
	const navigate = useNavigate();
	const [selectedTab, setSelectedTab] = useState(getDate(0));
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		console.log(newValue);
		setSelectedTab(newValue);
	};
	const dates = [
		getDate(0),
		getDate(1),
		getDate(2),
		getDate(3),
		getDate(4),
		getDate(5),
		getDate(6),
	];
	const date = timestampToDate(new Date().toISOString());
	console.log(date);
	return (
		<>
			<Header />
			<Container maxWidth={"lg"} style={{ marginTop: "1rem" }}>
				<Tabs value={selectedTab} onChange={handleChange} centered>
					{dates.map((date) => {
						return <Tab key={date} label={date} value={date} />;
					})}
				</Tabs>
			</Container>
		</>
	);
};

export default Schedule;
