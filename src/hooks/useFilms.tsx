import { useQuery } from "react-query";
import { FilmInfo } from "../types/FilmInfo";
import { useAxiosContext } from "./useAxiosContext";

export const useFilms = () => {
	const axios = useAxiosContext();
	const getScreenings = async (): Promise<FilmInfo[]> => {
		try {
			const response = await axios.get(`films`);
			console.log(response.data);
			return response.data;
		} catch {
			return [];
		}
	};

	return useQuery(["films"], getScreenings);
};
