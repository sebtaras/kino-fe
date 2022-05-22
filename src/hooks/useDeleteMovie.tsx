import { useMutation, useQueryClient } from "react-query";
import { SeatWithRow } from "../types/FilmInfo";
import { loadUser } from "../utils/functions/loadUser";
import { useAxiosContext } from "./useAxiosContext";

export const useDeleteMovie = (movieId: number) => {
	const axios = useAxiosContext();
	const queryClient = useQueryClient();
	const user = loadUser();
	const deleteReview = async () => {
		try {
			const response = await axios.delete(`films/${movieId}`);
			return response;
		} catch (error: any) {
			console.log(error);
		}
	};

	return useMutation(deleteReview, {
		onError: (error) => {
			alert("Greska u brisanju filma");
			console.log(error);
		},
		onSuccess: () => {
			queryClient.refetchQueries(["reviews"]);
			queryClient.refetchQueries(["movieInfo", movieId]);
			queryClient.refetchQueries(["movies"]);
			queryClient.refetchQueries(["films"]);
			alert("Film izbrisan");
		},
	});
};
