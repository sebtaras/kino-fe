import {
	Box,
	Button,
	Container,
	Dialog,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { loadUser } from "../utils/functions/loadUser";
import { useUserReviews } from "../hooks/useUserReviews";
import { Review } from "../types/FilmInfo";
import { timestampToDate } from "../utils/functions/timestampToDate";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@material-ui/icons";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteReview } from "../hooks/useDeleteReview";
import { useEditReview } from "../hooks/useEditReview";

const Profile = () => {
	const user = loadUser();
	const [openDelete, setOpenDelete] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [rating, setRating] = useState<null | number>(null);
	const [filmId, setFilmId] = useState<null | number>(null);
	const [review, setReview] = useState("");
	const [selectedReview, setSelectedReview] = useState<null | number>(null);
	const { data: reviews, isLoading } = useUserReviews(parseInt(user!.id));
	const { mutate: deleteReview } = useDeleteReview(selectedReview!);
	const { mutate: editReview } = useEditReview(filmId!, selectedReview!, rating!, review);
	const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	return (
		<>
			<Header />
			<Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
				<Button
					style={{ margin: "3rem" }}
					variant="contained"
					onClick={() => {
						deleteReview();
						setOpenDelete(false);
					}}
				>
					Potvrdi brisanje
				</Button>
			</Dialog>
			<Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
				<Container
					maxWidth="lg"
					style={{
						marginTop: "2rem",
						marginBottom: "2rem",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<TextField
						value={review}
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
									style={{
										padding: "0.2rem",
										minHeight: 0,
										minWidth: "2.2rem",
										margin: "0.2rem",
									}}
									key={option}
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
							editReview();
							setOpenEdit(false);
						}}
					>
						Edit Review
					</Button>
				</Container>
			</Dialog>
			<Container
				style={{
					display: "flex",
					paddingTop: "4rem",
					alignItems: "center",
					flexDirection: "column",
				}}
				maxWidth={"md"}
			>
				<Typography variant="h3">{user?.name.toLocaleUpperCase()}</Typography>
				<Box style={{ width: "100%", paddingTop: "1rem" }}>
					<Typography variant="h5" style={{ marginBottom: "2rem" }}>
						Vase recenzije
					</Typography>
					{reviews &&
						reviews.map((review: Review) => {
							return (
								<Box
									key={review.id}
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
										<Typography style={{ flex: 3 }}>{review.filmTitle}</Typography>
										<Typography style={{ flex: 1, marginLeft: "1rem" }}>
											Score: {review.score}/10
										</Typography>
										<Typography style={{ flex: 1, marginLeft: "1rem" }}>
											{timestampToDate(review.createdAt)}
										</Typography>
										<Box style={{ flex: 1 }} />
										<Box style={{ flex: 0.2, display: "flex" }}>
											<IconButton
												onClick={() => {
													setSelectedReview(review.id);
													setOpenEdit(true);
													setReview(review.text);
													setRating(review.score);
													setFilmId(review.filmId);
												}}
											>
												<Edit />
											</IconButton>
											<IconButton
												onClick={() => {
													setSelectedReview(review.id);
													setOpenDelete(true);
												}}
											>
												<DeleteIcon />
											</IconButton>
										</Box>
									</Box>
									<Typography style={{ marginTop: "1.5rem" }}>{review.text}</Typography>
								</Box>
							);
						})}
				</Box>
			</Container>
		</>
	);
};

export default Profile;
