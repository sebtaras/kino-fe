import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useUserContext } from "../hooks/useUserContext";
import {
	Box,
	Button,
	CircularProgress,
	Container,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useMovieList } from "../hooks/useMovieList";
import { useMovieInfo } from "../hooks/useMovieInfo";
import { useQueryClient } from "react-query";
import { timestampToDate } from "../utils/functions/timestampToDate";
import { usePostReview } from "../hooks/usePostReview";
import { Review } from "../types/FilmInfo";

const Search = () => {
	const navigate = useNavigate();
	const [movieId, setMovieId] = useState<null | number>(null);
	const [rating, setRating] = useState<null | number>(null);
	const [review, setReview] = useState("");
	const { data: movies, isLoading: movieLoading, error: movieListError } = useMovieList();
	const { data: movieInfo, isLoading: infoLoading } = useMovieInfo(movieId!);
	const { mutate: postReview } = usePostReview(movieId!, rating!, review);
	const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const queryClient = useQueryClient();

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
					<Typography>Select a movie to review</Typography>
					<Select
						labelId="demo-simple-select-label"
						style={{ width: "20rem", marginLeft: "1rem" }}
						value={movieId}
						defaultValue={0}
						placeholder={"Pick a movie..."}
						label="Movie"
						onChange={(e) => setMovieId(e.target.value as number)}
					>
						<MenuItem disabled={true}>{"Pick a movie"}</MenuItem>
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
						disabled={infoLoading || movieId === null}
						onClick={() => queryClient.refetchQueries(["movieInfo", movieId])}
					>
						Search
					</Button>
				</Container>
				{movieInfo && (
					<Container
						style={{
							marginTop: "1rem",
							justifyContent: "center",
							flexDirection: "column",
						}}
					>
						<Typography>{movieInfo.title}</Typography>
						<Typography>{movieInfo.durationMinutes}min</Typography>
						<Typography>{movieInfo.genres.join(", ")}</Typography>
					</Container>
				)}
				{localStorage.getItem("user") && movieId && movieInfo && (
					<Container
						style={{
							marginTop: "2rem",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<TextField
							multiline={true}
							style={{ width: "100%" }}
							onChange={(e: any) => {
								setReview(e.target.value as string);
							}}
						>
							{review}
						</TextField>
						<Box
							style={{
								display: "flex",
								justifyContent: "space-between",
								flexWrap: "wrap",
								marginTop: "1rem",
								width: "100%",
							}}
						>
							{ratings.map((option: number) => {
								return (
									<Button
										variant={option === rating ? "contained" : "outlined"}
										onClick={() => {
											setRating(option);
										}}
									>
										{option}
									</Button>
								);
							})}
						</Box>
						<Button
							style={{ maxWidth: "10rem", marginTop: "1rem" }}
							variant="contained"
							disabled={!review || (!rating && rating !== 0)}
							onClick={() => {
								postReview();
								queryClient.refetchQueries(["movieInfo, id"]);
							}}
						>
							Post Review
						</Button>
					</Container>
				)}
				<Container style={{ marginTop: "2rem" }}>
					{movieInfo?.reviews.map((review: Review) => {
						return (
							<Box
								style={{
									marginBottom: "1rem",
									border: "1px solid #777",
									borderRadius: 10,
									padding: "1rem",
								}}
							>
								<Box
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<Typography style={{ flex: 1 }}>JokerReviews</Typography>
									<Typography style={{ flex: 1, marginLeft: "1rem" }}>
										Score: {review.score}/10
									</Typography>
									<Typography style={{ flex: 1, marginLeft: "1rem" }}>
										{timestampToDate(review.createdAt)}
									</Typography>
									<Box style={{ flex: 4 }} />
								</Box>
								<Typography style={{ marginTop: "1.5rem" }}>{review.text}</Typography>
							</Box>
						);
					})}
				</Container>
			</Container>
		</>
	);
};

export default Search;
