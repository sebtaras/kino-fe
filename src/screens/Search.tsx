import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useUserContext } from "../hooks/useUserContext";
import {
	Container,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";

const Search = () => {
	const navigate = useNavigate();
	const [movie, setMovie] = useState("");
	const dummyMovies = ["harry 1", "harry 2", "harry 3", "harry 5", "ironman"];

	useEffect(() => {
		if (!localStorage.getItem("user")) {
			navigate("/login");
		}
	});

	return (
		<>
			<Header />
			<Container
				maxWidth={"lg"}
				style={{
					display: "flex",
					alignItems: "Center",
					borderWidth: 10,
					borderColor: "black",
					marginTop: "2rem",
				}}
			>
				<Typography>Select a movie to review</Typography>
				<Select
					labelId="demo-simple-select-label"
					style={{ width: "20rem", marginLeft: "2rem" }}
					value={movie}
					label="Movie"
					onChange={(e) => setMovie(e.target.value as string)}
				>
					{dummyMovies.map((movie) => {
						return <MenuItem value={movie}>{movie}</MenuItem>;
					})}
				</Select>
			</Container>
		</>
	);
};

export default Search;
