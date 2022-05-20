import { Box, Button, Container, Dialog, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useScreening } from "../hooks/useScreening";
import { Seat } from "../types/FilmInfo";
import { timestampToDate } from "../utils/functions/timestampToDate";
import { timestampToHours } from "../utils/functions/timestampToHours";

const Tickets = () => {
	const { id } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
	const { data: screening, isLoading } = useScreening(parseInt(id!));
	console.log(screening);
	return (
		<>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
				<Container maxWidth={"md"} style={{ padding: "2rem" }}>
					{selectedSeat && screening && (
						<Container style={{ display: "flex", flexDirection: "column" }}>
							<Typography>Vrsta sjedala: {selectedSeat.type}</Typography>
							<Typography>Red: {selectedSeat.row}</Typography>
							<Typography>Sjedalo: {selectedSeat.number}</Typography>
							<Typography>
								Cijena: {screening.basePrice * selectedSeat.priceCoefficient}kn
							</Typography>
							<Button style={{ marginTop: "1rem" }} variant="contained">
								Kupi
							</Button>
						</Container>
					)}
				</Container>
			</Dialog>
			<Header />
			{screening && (
				<Container>
					<Container
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							paddingBottom: "1rem",
							paddingTop: "1rem",
						}}
					>
						<Typography variant="h4">Movie name</Typography>
						<Typography variant="h4">Hall name</Typography>
						<Typography variant="h4">{timestampToDate(screening.startAt)}</Typography>
						<Box style={{ display: "flex", flexDirection: "row" }}>
							<Typography variant="h4">{timestampToHours(screening.startAt)}-</Typography>
							<Typography variant="h4">{timestampToHours(screening.endAt)}</Typography>
						</Box>
					</Container>
					<Container
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Typography
							style={{
								paddingBottom: "2rem",
							}}
						>
							Projekcijsko platno
						</Typography>
						<Container
							style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
						>
							{screening.seats?.map((seat: Seat) => {
								return (
									<Button
										style={{
											padding: "0.2rem",
											minHeight: 0,
											minWidth: "2.2rem",
											margin: "0.2rem",
										}}
										disabled={!seat.isAvailable}
										variant="outlined"
										onClick={() => {
											setSelectedSeat(seat);
											setIsOpen(true);
										}}
									>
										<Typography>{seat.type.substring(0, 1)}</Typography>
									</Button>
								);
							})}
						</Container>
					</Container>
				</Container>
			)}
			{screening === null && <Typography>Doslo je do greske</Typography>}
		</>
	);
};

export default Tickets;
