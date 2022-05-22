import { useMutation, useQueryClient } from "react-query";
import { loadUser } from "../utils/functions/loadUser";
import { useAxiosContext } from "./useAxiosContext";

export const useCreateMovie = (
	title: string,
	imageUrl: string,
	description: string,
	duration: string,
	genres: string
) => {
	const axios = useAxiosContext();
	const user = loadUser();
	const queryClient = useQueryClient();

	const createMovie = async () => {
		try {
			const response = await axios.post("films", {
				title,
				durationMinutes: parseInt(duration),
				genres: genres.split(";"),
				description,
				imageUrl,
			});
			return response;
		} catch (error: any) {}
	};

	return useMutation(createMovie, {
		onError: (error) => {
			console.log(error);
			alert("Greska u stvaranju filma");
		},
		onSuccess: () => {
			queryClient.refetchQueries(["films"]);
			queryClient.refetchQueries(["movies"]);
			alert("Film stvoren");
		},
	});
};
