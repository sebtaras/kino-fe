import { useMutation, useQueryClient } from "react-query";
import { SeatWithRow } from "../types/FilmInfo";
import { useAxiosContext } from "./useAxiosContext";

export const useBuyTicket = (screeningId: number, selectedSeat: SeatWithRow | null) => {
	console.log("in useb uy", screeningId, selectedSeat);
	const axios = useAxiosContext();
	const queryClient = useQueryClient();
	console.log(screeningId, selectedSeat?.id);
	const postReview = async () => {
		try {
			const response = await axios.post("tickets", {
				seatId: selectedSeat?.id,
				screeningId,
			});
			return response;
		} catch (error: any) {
			console.log(error);
		}
	};

	return useMutation(postReview, {
		onError: (error) => console.log(error),
		onSuccess: () => {
			queryClient.refetchQueries(["screening", screeningId]);
		},
	});
};
