import { useMutation, useQueryClient } from "react-query";
import { SeatWithRow } from "../types/FilmInfo";
import { loadUser } from "../utils/functions/loadUser";
import { useAxiosContext } from "./useAxiosContext";

export const useDeleteReview = (reviewId: number) => {
	const axios = useAxiosContext();
	const queryClient = useQueryClient();
	const user = loadUser();
	const postReview = async () => {
		try {
			const response = await axios.delete(`reviews/${reviewId}`);
			return response;
		} catch (error: any) {
			console.log(error);
		}
	};

	return useMutation(postReview, {
		onError: (error) => console.log(error),
		onSuccess: () => {
			queryClient.refetchQueries(["reviews", user!.id]);
		},
	});
};
