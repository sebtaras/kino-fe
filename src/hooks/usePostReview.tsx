import { useMutation, useQueryClient } from "react-query";
import { loadUser } from "../utils/functions/loadUser";
import { useAxiosContext } from "./useAxiosContext";

export const usePostReview = (filmId: number, score: number, text: string) => {
	const axios = useAxiosContext();
	const user = loadUser();
	const queryClient = useQueryClient();
	const postReview = async () => {
		try {
			const response = await axios.post("reviews", {
				userId: user?.id,
				filmId,
				score,
				text,
			});
			return response;
		} catch (error: any) {}
	};

	return useMutation(postReview, {
		onError: (error) => console.log(error),
		onSuccess: () => {
			queryClient.refetchQueries(["movieInfo", filmId]);
		},
	});
};
