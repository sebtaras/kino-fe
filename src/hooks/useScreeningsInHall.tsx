import { useQuery } from "react-query";
import { Screening } from "../types/FilmInfo";
import { useAxiosContext } from "./useAxiosContext";

export const useScreeningsInHall = (date: Date, hallId: number) => {
	const axios = useAxiosContext();
	console.log("using screning ni hall", date, hallId);
	const datum = date.toLocaleDateString();

	const getScreenings = async (): Promise<Screening[]> => {
		try {
			const response = await axios.get(`screenings?date=${datum}&hallId=${hallId}`, {});
			console.log("response: ", response.data);
			return response.data;
		} catch (error: any) {
			return [];
		}
	};

	return useQuery(["screeningsHall", datum + hallId], getScreenings, {
		enabled: false,
	});
};
