import { useMutation, useQueryClient } from "react-query";
import { Screening } from "../types/FilmInfo";
import { loadUser } from "../utils/functions/loadUser";
import { useAxiosContext } from "./useAxiosContext";

export const useDeleteScreening = (screening: Screening) => {
	const axios = useAxiosContext();
	const queryClient = useQueryClient();
	const user = loadUser();
	const deleteScreening = async () => {
		try {
			const response = await axios.delete(`screenings/${screening.id}`);
			return response;
		} catch (error: any) {
			console.log(error);
		}
	};

	return useMutation(deleteScreening, {
		onError: (error) => console.log(error),
		onSuccess: () => {
			queryClient.refetchQueries(["reviews", user!.id]);
			queryClient.refetchQueries(["filmsScreenings"]);
			queryClient.refetchQueries(["screeningsHall"]);
		},
	});
};
