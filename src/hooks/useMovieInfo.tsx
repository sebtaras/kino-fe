import { useQuery } from "react-query";
import { FilmInfo } from "../types/FilmInfo";
import { useAxiosContext } from "./useAxiosContext";

export const useMovieInfo = (id: number) => {
	const axios = useAxiosContext();

	const getMovieInfo = async (): Promise<FilmInfo | null> => {
		try {
			const response = await axios.get(`films/${id}`);
			console.log(response.data);
			return response.data;
		} catch (error: any) {
			return null;
		}
	};

	return useQuery(["movieInfo", id], getMovieInfo, {
		enabled: false,
		onError: (error) => console.log(error),
	});
};
