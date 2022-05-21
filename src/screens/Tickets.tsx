import { Box, Button, Container, Dialog, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useBuyTicket } from "../hooks/useBuyTicket";
import { useScreening } from "../hooks/useScreening";
import { Row, Seat, SeatWithRow } from "../types/FilmInfo";
import { getRowNumber } from "../utils/functions/getRowNumber";
import { timestampToDate } from "../utils/functions/timestampToDate";
import { timestampToHours } from "../utils/functions/timestampToHours";

const Tickets = () => {
	const { id: screeningId } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedSeat, setSelectedSeat] = useState<SeatWithRow | null>(null);
	const { data: screening, isLoading } = useScreening(parseInt(screeningId!));
	const { mutate: buy } = useBuyTicket(parseInt(screeningId!), selectedSeat);
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
							<Button
								style={{ marginTop: "1rem" }}
								variant="contained"
								onClick={() => {
									buy();
									setIsOpen(false);
								}}
							>
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
						<Typography variant="h4">{screening.filmTitle}</Typography>
						<Typography variant="h4">{screening.hallName}</Typography>
						<Typography variant="h4">{timestampToDate(screening.startAt)}</Typography>
						<Box style={{ display: "flex", flexDirection: "row" }}>
							<Typography variant="h4">
								{timestampToHours(screening.startAt)}-{timestampToHours(screening.endAt)}
							</Typography>
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
							style={{
								display: "flex",
								flexDirection: "row",
								flexWrap: "wrap",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{screening.seatRows.map((row: Row) => {
								return (
									<Container
										key={row.row}
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										{row.seats.map((seat: Seat) => {
											return (
												<Button
													key={seat.id}
													style={{
														padding: "0.2rem",
														minHeight: 0,
														minWidth: "2.2rem",
														margin: "0.2rem",
													}}
													disabled={!seat.isAvailable}
													variant="outlined"
													onClick={() => {
														setSelectedSeat({ ...seat, row: row.row });
														setIsOpen(true);
													}}
												>
													<Typography>{seat.type.substring(0, 1)}</Typography>
												</Button>
											);
										})}
										<Typography style={{ marginLeft: "1rem" }}>
											Red {getRowNumber(row.row)}
										</Typography>
									</Container>
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
