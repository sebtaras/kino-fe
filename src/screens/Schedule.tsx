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
	IconButton,
	Dialog,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getDate } from "../utils/functions/getDate";
import { useFilmsScreenings } from "../hooks/useFilmsScreenings";
import { useQueryClient } from "react-query";
import { FilmInfo, Hall, Screening } from "../types/FilmInfo";
import { timestampToHours } from "../utils/functions/timestampToHours";
import { loadUser } from "../utils/functions/loadUser";
import { useDeleteScreening } from "../hooks/useDeleteScreening";
import { timestampToDate } from "../utils/functions/timestampToDate";

const Schedule = () => {
	const [selectedTab, setSelectedTab] = useState(getDate(0));
	const [selectedScreening, setSelectedScreening] = useState<null | Screening>(null);
	const [selectedTitle, setSelectedTitle] = useState("");
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const user = loadUser();
	const { mutate: deleteScreening } = useDeleteScreening(selectedScreening!);
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
			<Dialog open={open} onClose={() => setOpen(false)}>
				<Box
					style={{
						margin: "1rem",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography variant="h5">{selectedTitle}</Typography>
					{selectedScreening && (
						<>
							<Typography>
								{timestampToDate(selectedScreening.startAt)}{" "}
								{timestampToHours(selectedScreening.startAt)}
							</Typography>
							<Typography>{selectedScreening.hallName}</Typography>
						</>
					)}
				</Box>
				<Button
					style={{ margin: "2rem", marginTop: "0" }}
					variant="contained"
					onClick={() => {
						deleteScreening();
						setOpen(false);
					}}
				>
					Potvrdi brisanje projekcije
				</Button>
			</Dialog>
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
								<Box key={film.id}>
									<Box
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
											marginBottom: "2rem",
										}}
									>
										{film.screenings.map((screening: Screening) => {
											return (
												<Box
													style={{
														display: "flex",
														border: "1px solid #888",
														borderRadius: 10,
														marginRight: "1rem",
														justifyContent: "center",
													}}
												>
													<Button
														key={screening.id}
														style={{
															padding: "0.2rem",
															minHeight: 0,
															minWidth: "2.2rem",
															margin: "0.2rem",
															display: "flex",
															flexDirection: "row",
															alignItems: "center",
														}}
														onClick={() => navigate(`/projekcije/${screening.id}`)}
													>
														<Box>
															<Typography>
																{timestampToHours(screening.startAt)}
															</Typography>
														</Box>
													</Button>
													{user?.isAdmin && (
														<IconButton
															style={{
																padding: "0.2rem",
																minHeight: 0,
																minWidth: "2.2rem",
																margin: "0.2rem",
															}}
															onClick={() => {
																setOpen(true);
																setSelectedScreening(screening);
																setSelectedTitle(film.title);
															}}
														>
															<DeleteIcon />
														</IconButton>
													)}
												</Box>
											);
										})}
									</Container>
								</Box>
							);
						})}
				</Container>
			</Container>
		</>
	);
};

export default Schedule;
