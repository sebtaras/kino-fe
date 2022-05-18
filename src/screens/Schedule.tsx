import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useUserContext } from "../hooks/useUserContext";
import { Container } from "@mui/material";

const Schedule = () => {
	const navigate = useNavigate();
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);
	useEffect(() => {
		if (!localStorage.getItem("user")) {
			navigate("/login");
		}
	});
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setSelectedTabIndex(newValue);
	};
	return (
		<>
			<Header />
			<Container maxWidth={"lg"}>
				<div>bokte mazo buraz</div>
				<Tabs value={selectedTabIndex} onChange={handleChange} centered>
					<Tab label={"dns"} />
					<Tab label={"stra"} />
					<Tab label={"dan iza"} />
				</Tabs>
			</Container>
		</>
	);
};

export default Schedule;
