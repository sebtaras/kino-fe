import { useMutation, useQueryClient } from "react-query";
import { SeatWithRow } from "../types/FilmInfo";
import { loadUser } from "../utils/functions/loadUser";
import { useAxiosContext } from "./useAxiosContext";

export const useEditReview = (
	filmId: number,
	reviewId: number,
	score: number,
	text: string
) => {
	const axios = useAxiosContext();
	const queryClient = useQueryClient();
	const user = loadUser();
	const editReview = async () => {
		try {
			const response = await axios.put(`reviews/${reviewId}`, {
				score,
				text,
			});
			return response;
		} catch (error: any) {
			console.log(error);
		}
	};

	return useMutation(editReview, {
		onError: (error) => console.log(error),
		onSuccess: () => {
			queryClient.refetchQueries(["reviews", user!.id]);
			queryClient.refetchQueries(["movieInfo", filmId]);
		},
	});
};
