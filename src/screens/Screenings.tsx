import {
	Box,
	Button,
	CircularProgress,
	Container,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useMovieInfo } from "../hooks/useMovieInfo";
import { useMovieList } from "../hooks/useMovieList";
import { OptionalUser } from "../types/OptionalUser";
import { useHalls } from "../hooks/useHalls";
import { Hall, Screening } from "../types/FilmInfo";
import { useScreeningsInHall } from "../hooks/useScreeningsInHall";
import { timestampToHours } from "../utils/functions/timestampToHours";
import { minutesToHours } from "../utils/functions/minutesToHours";
import { useCreateScreening } from "../hooks/useCreateScreening";
import DateTimePicker from "react-datetime-picker";

const Screenings = () => {
	const navigate = useNavigate();
	const [movieId, setMovieId] = useState(0);
	const [hall, setHall] = useState(0);
	const [date, setDate] = useState(new Date());
	const [price, setPrice] = useState(40);
	const { data: movies, isLoading: movieLoading, error: movieListError } = useMovieList();
	const { data: movieInfo, isLoading: infoLoading } = useMovieInfo(movieId!);
	const { data: screenings, isLoading: screeningsLoading } = useScreeningsInHall(
		date,
		hall!
	);
	const { mutate: createScreening } = useCreateScreening(movieId!, hall!, date, price);
	const { data: halls, isLoading: hallsLoading } = useHalls();
	const queryClient = useQueryClient();

	useEffect(() => {
		const user = localStorage.getItem("user") as OptionalUser;
		if (!user || user.isAdmin) {
			navigate("/raspored");
		}
	});

	return (
		<>
			<Header />
			<Container maxWidth={"lg"}>
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
					<Typography>Odaberi film</Typography>
					<Select
						style={{ width: "20rem", marginLeft: "1rem" }}
						value={movieId}
						label="Movie"
						onChange={(e) => {
							setMovieId(e.target.value as number);
							queryClient.refetchQueries(["movieInfo", e.target.value]);
						}}
					>
						<MenuItem disabled={true}>Pick a movie...</MenuItem>
						{movieLoading ? (
							<CircularProgress />
						) : (
							movies.map((movie: any) => {
								return (
									<MenuItem key={movie.id} value={movie.id}>
										{movie.title}
									</MenuItem>
								);
							})
						)}
					</Select>

					<Button
						style={{ marginLeft: "1rem" }}
						variant="contained"
						disabled={movieId === null}
						onClick={() => queryClient.refetchQueries(["movieInfo", movieId])}
					>
						Odaberi
					</Button>
				</Container>
				<Container>
					<Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
						{movieInfo?.durationMinutes && (
							<Typography style={{ marginTop: "1rem" }}>
								Trajanje: {minutesToHours(movieInfo.durationMinutes)}
							</Typography>
						)}
					</Box>
					<Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
						<Typography>Datum i vrijeme</Typography>
						<Box style={{ padding: "1rem" }}>
							<DateTimePicker
								locale="hr-HR"
								clearIcon={null}
								onChange={(date: Date) => {
									console.log("new date", date);
									setDate(date);
								}}
								value={date}
								disableClock={true}
							/>
						</Box>
					</Box>
					<Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
						<Typography>Dvorana</Typography>
						<Select
							value={hall}
							label="Hall"
							style={{ width: "20rem", marginLeft: "1rem" }}
							onChange={(e) => setHall(e.target.value as number)}
						>
							<MenuItem disabled={true}>Pick a hall...</MenuItem>
							{halls &&
								halls.map((hall: Hall) => {
									return (
										<MenuItem key={hall.id} value={hall.id}>
											{hall.name}
										</MenuItem>
									);
								})}
						</Select>
					</Box>
					<Button
						style={{ marginTop: "1rem", marginBottom: "1rem" }}
						disabled={!hall}
						variant="contained"
						onClick={() => {
							queryClient.refetchQueries([
								"screeningsHall",
								date.toLocaleDateString() + hall,
							]);
						}}
					>
						Pregledaj postojece projekcije
					</Button>
					<Box
						style={{
							display: "flex",
							flexWrap: "wrap",
						}}
					>
						{screenings &&
							screenings.map((screening: Screening) => {
								return (
									<Box
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
									>
										<Box>
											<Typography> {timestampToHours(screening.startAt)}</Typography>
										</Box>
										<Typography>-</Typography>
										<Box>
											<Typography>{timestampToHours(screening.endAt)}</Typography>
										</Box>
									</Box>
								);
							})}
						{screenings?.length === 0 && (
							<Typography>Nema projekcija u ovoj dvorani</Typography>
						)}
					</Box>

					<Box>
						<Box
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								marginTop: "1rem",
							}}
						>
							<Typography>Price </Typography>
							<TextField
								style={{ marginLeft: "1rem" }}
								type="number"
								onChange={(e: any) => setPrice(e.target.value as number)}
								value={price}
							></TextField>
						</Box>
					</Box>
					<Button
						style={{ marginTop: "1rem" }}
						variant="contained"
						disabled={!hall || !movieId}
						onClick={() => createScreening()}
					>
						Stvori projekciju
					</Button>
				</Container>
			</Container>
		</>
	);
};

export default Screenings;
