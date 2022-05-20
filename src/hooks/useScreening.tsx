import { useQuery } from "react-query";
import { Screening } from "../types/FilmInfo";
import { useAxiosContext } from "./useAxiosContext";

export const useScreening = (id: number) => {
	const axios = useAxiosContext();
	console.log("im uuuuuusing");
	console.log(`screenings/${id}`);
	const getScreening = async (): Promise<Screening | null> => {
		try {
			const response = await axios.get(`screenings/${id}`);
			console.log(response.data);
			return response.data;
		} catch {
			return null;
		}
	};

	return useQuery(["screening", id], getScreening);
};
