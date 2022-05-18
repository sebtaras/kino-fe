import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useUserContext } from "../hooks/useUserContext";

const Schedule = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("user")) {
			navigate("/login");
		}
	});

	return (
		<>
			<Header />
			<div>bokte mazo buraz</div>
		</>
	);
};

export default Schedule;
