import Header from "../components/Header";
import {
	Box,
	Button,
	Container,
	IconButton,
	TableCell,
	TableRow,
	TextField,
	Collapse,
	Typography,
	Dialog,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowDownward, Edit } from "@material-ui/icons";
import { useFilms } from "../hooks/useFilms";
import { FilmInfo } from "../types/FilmInfo";
import { useEditMovie } from "../hooks/useEditMovie";
import { useDeleteMovie } from "../hooks/useDeleteMovie";
import { useCreateMovie } from "../hooks/useCreateMovie";

const Films = () => {
	const [openId, setOpenId] = useState<null | number>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [duration, setDuration] = useState("");
	const [imgUrl, setImageUrl] = useState("");
	const [genres, setGenres] = useState("");

	const { data: films, isLoading } = useFilms();
	const { mutate: editMovie } = useEditMovie(
		openId!,
		title,
		imgUrl,
		description,
		duration,
		genres
	);
	const { mutate: deleteMovie } = useDeleteMovie(openId!);
	const { mutate: createMovie } = useCreateMovie(
		title,
		imgUrl,
		description,
		duration,
		genres
	);
	return (
		<>
			<Dialog open={isOpenDelete} onClose={() => setIsOpenDelete(false)}>
				<Button
					style={{ margin: "2rem" }}
					onClick={() => {
						deleteMovie();
						setIsOpenDelete(false);
					}}
					variant="contained"
				>
					POTVRDI BRISANJE FILMA
				</Button>
			</Dialog>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
				<Container maxWidth="lg" style={{ display: "flex", flexDirection: "column" }}>
					<TextField
						style={{ margin: "1rem" }}
						label="title"
						value={title}
						onChange={(e: any) => {
							setTitle(e.target.value as string);
						}}
					>
						{title}
					</TextField>
					<TextField
						style={{ margin: "1rem" }}
						label="description"
						multiline
						value={description}
						onChange={(e: any) => {
							setDescription(e.target.value as string);
						}}
					>
						{description}
					</TextField>
					<TextField
						style={{ margin: "1rem" }}
						label="duration (min)"
						value={duration}
						type="number"
						onChange={(e: any) => {
							setDuration(e.target.value as string);
						}}
					>
						{duration}
					</TextField>
					<TextField
						style={{ margin: "1rem" }}
						label="image link"
						value={imgUrl}
						onChange={(e: any) => {
							setImageUrl(e.target.value as string);
						}}
					>
						{imgUrl}
					</TextField>
					<TextField
						style={{ margin: "1rem" }}
						label="genres"
						value={genres}
						onChange={(e: any) => {
							setGenres(e.target.value as string);
						}}
					>
						{genres}
					</TextField>
					<Button
						style={{ margin: "1rem", maxWidth: "10rem" }}
						variant="contained"
						disabled={!title || !duration || !description || !imgUrl || !genres}
						onClick={() => {
							createMovie();
							setIsOpen(false);
						}}
					>
						CREATE
					</Button>
				</Container>
			</Dialog>
			<Header />
			<Container maxWidth={"lg"}>
				<Container maxWidth={"lg"} style={{ marginTop: "2rem" }}>
					{films &&
						films.map((film: FilmInfo) => {
							return (
								<Box key={film.id}>
									<Box
										style={{
											display: "flex",
											flexDirection: "row",
											padding: "2rem",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Box
											style={{
												display: "flex",
												flexDirection: "row",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<IconButton
												onClick={() => {
													if (film.id !== openId) {
														setOpenId(film.id);
														setTitle(film.title);
														setDescription(film.description);
														setGenres(film.genres.join(";"));
														setDuration(film.durationMinutes.toString());
														setImageUrl(film.imageUrl);
													} else {
														setOpenId(null);
													}
												}}
											>
												{film.id === openId ? (
													<KeyboardArrowUpIcon />
												) : (
													<KeyboardArrowDownIcon />
												)}
											</IconButton>
											<Typography>{film.title}</Typography>
										</Box>
										<Box>
											<IconButton
												onClick={() => {
													setOpenId(film.id);
													setIsOpenDelete(true);
												}}
											>
												<DeleteIcon />
											</IconButton>
										</Box>
									</Box>
									{film.id === openId && (
										<Container
											maxWidth="lg"
											style={{ margin: "2rem", display: "flex", flexDirection: "column" }}
										>
											<TextField
												style={{ margin: "1rem" }}
												label="title"
												value={title}
												onChange={(e: any) => {
													setTitle(e.target.value as string);
												}}
											>
												{title}
											</TextField>
											<TextField
												style={{ margin: "1rem" }}
												label="description"
												multiline
												value={description}
												onChange={(e: any) => {
													setDescription(e.target.value as string);
												}}
											>
												{description}
											</TextField>
											<TextField
												style={{ margin: "1rem" }}
												label="duration (min)"
												type="number"
												value={duration}
												onChange={(e: any) => {
													setDuration(e.target.value as string);
												}}
											>
												{duration}
											</TextField>
											<TextField
												style={{ margin: "1rem" }}
												label="image link"
												value={imgUrl}
												onChange={(e: any) => {
													setImageUrl(e.target.value as string);
												}}
											>
												{imgUrl}
											</TextField>
											<TextField
												style={{ margin: "1rem" }}
												label="genres"
												value={genres}
												onChange={(e: any) => {
													setGenres(e.target.value as string);
												}}
											>
												{genres}
											</TextField>
											<Button
												style={{ margin: "1rem", maxWidth: "10rem" }}
												variant="contained"
												onClick={() => editMovie()}
											>
												SAVE
											</Button>
										</Container>
									)}
								</Box>
								// </Collapse>
							);
						})}
					<Button
						style={{ margin: "1rem", maxWidth: "10rem" }}
						variant="contained"
						onClick={() => {
							setIsOpen(true);
							setTitle("");
							setDuration("");
							setGenres("");
							setImageUrl("");
							setDescription("");
						}}
					>
						STVORI NOVI
					</Button>
				</Container>
			</Container>
		</>
	);
};

export default Films;
