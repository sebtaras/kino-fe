import { useQuery } from "react-query";
import { Screening } from "../types/FilmInfo";
import { useAxiosContext } from "./useAxiosContext";

export const useScreening = (id: number) => {
	const axios = useAxiosContext();
	const getScreening = async (): Promise<Screening | null> => {
		try {
			const response = await axios.get(`screenings/${id}`);
			return response.data;
		} catch {
			return null;
		}
	};

	return useQuery(["screening", id], getScreening);
};
