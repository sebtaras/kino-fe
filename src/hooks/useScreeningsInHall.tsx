import { useQuery } from "react-query";
import { Screening } from "../types/FilmInfo";
import { useAxiosContext } from "./useAxiosContext";

export const useScreeningsInHall = (date: string, hallId: number) => {
	const axios = useAxiosContext();
	console.log(`screenings?date=${date}&hallId=${hallId}`);
	const getScreenings = async (): Promise<Screening[]> => {
		try {
			const response = await axios.get(`screenings?date=${date}&hallId=${hallId}`, {});
			console.log(response.data);
			return response.data;
		} catch {
			return [];
		}
	};

	return useQuery(["screeningsHall", date + hallId], getScreenings, {
		enabled: false,
	});
};
