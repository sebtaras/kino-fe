import { useQuery } from "react-query";
import { useAxiosContext } from "./useAxiosContext";

export const useMovieList = () => {
	const axios = useAxiosContext();

	const getMovieList = async () => {
		try {
			const response = await axios.get("films");
			return response.data.map((movie: any) => {
				return {
					id: movie.id,
					title: movie.title,
				};
			});
		} catch (error: any) {
			if (error.response.status === 400) {
			}
		}
	};

	return useQuery("movies", getMovieList, {
		onError: (error) => console.log(error),
	});
};
