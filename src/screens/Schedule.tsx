import {
	Box,
	Button,
	CircularProgress,
	Container,
	MenuItem,
	Select,
	TextField,
	CardMedia,
	Typography,
	Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getDate } from "../utils/functions/getDate";
import { useFilmsScreenings } from "../hooks/useFilmsScreenings";
import { useQueryClient } from "react-query";
import { FilmInfo, Hall, Screening } from "../types/FilmInfo";
import { timestampToHours } from "../utils/functions/timestampToHours";

const Schedule = () => {
	const [selectedTab, setSelectedTab] = useState(getDate(0));
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setSelectedTab(newValue);
		queryClient.refetchQueries(["filmsScreenings", newValue]);
	};

	const { data: films, isLoading: filmsLoading } = useFilmsScreenings(selectedTab);
	const dates = [
		getDate(0),
		getDate(1),
		getDate(2),
		getDate(3),
		getDate(4),
		getDate(5),
		getDate(6),
	];

	return (
		<>
			<Header />
			<Container maxWidth={"lg"} style={{ marginTop: "1rem" }}>
				<Tabs value={selectedTab} onChange={handleChange} centered>
					{dates.map((date) => {
						return <Tab key={date} label={date} value={date} />;
					})}
				</Tabs>
				<Container maxWidth={"md"} style={{ marginTop: "1rem" }}>
					{films &&
						films.map((film: FilmInfo) => {
							return (
								<>
									<Box
										key={film.id}
										style={{
											padding: "1rem",
											display: "flex",
											flexWrap: "wrap",
										}}
									>
										<CardMedia
											style={{ width: "10rem", height: "15rem", marginRight: "1rem" }}
											image={film.imageUrl}
										/>
										<Box style={{}}>
											<Typography variant="h5">{film.title}</Typography>
											<Typography>Trajanje: {film.durationMinutes}min</Typography>
											<Typography>Zanr: {film.genres.join(", ")}</Typography>
											<Typography
												style={{ maxWidth: "35rem", minWidth: "10rem", flexWrap: "wrap" }}
											>
												Opis: {film.description}
											</Typography>
										</Box>
									</Box>

									<Container
										style={{
											display: "flex",
											flexWrap: "wrap",
											marginLeft: "1rem",
											marginBottom: "2rem",
										}}
									>
										{film.screenings.map((screening: Screening) => {
											return (
												<Button
													key={screening.id}
													style={{
														marginRight: "1rem",
														border: "1px solid #888",
														borderRadius: 10,
														padding: 5,
														display: "flex",
														flexDirection: "row",
														alignItems: "center",
													}}
													onClick={() => navigate(`/screening/${screening.id}`)}
												>
													<Box>
														<Typography>
															{" "}
															{timestampToHours(screening.startAt)}
														</Typography>
													</Box>
												</Button>
											);
										})}
										{/* {screenings?.length === 0 && (
											<Typography>Nema projekcija u ovoj dvorani</Typography>
										)} */}
									</Container>
								</>
							);
						})}
				</Container>
			</Container>
		</>
	);
};

export default Schedule;
