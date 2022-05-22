import { useMutation, useQueryClient } from "react-query";
import { SeatWithRow } from "../types/FilmInfo";
import { loadUser } from "../utils/functions/loadUser";
import { useAxiosContext } from "./useAxiosContext";

export const useEditMovie = (
	filmId: number,
	title: string,
	imageUrl: string,
	description: string,
	duration: string,
	genres: string
) => {
	const axios = useAxiosContext();
	const queryClient = useQueryClient();
	const editReview = async () => {
		try {
			const response = await axios.put(`films/${filmId}`, {
				title,
				durationMinutes: parseInt(duration),
				genres: genres.split(";"),
				description,
				imageUrl,
			});
			return response;
		} catch (error: any) {
			console.log(error);
		}
	};

	return useMutation(editReview, {
		onError: (error) => console.log(error),
		onSuccess: () => {
			queryClient.refetchQueries(["reviews"]);
			queryClient.refetchQueries(["movieInfo", filmId]);
			queryClient.refetchQueries(["movies"]);
			queryClient.refetchQueries(["films"]);
			alert("Movie updated");
		},
	});
};
