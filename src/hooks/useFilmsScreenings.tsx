import { useQuery } from "react-query";
import { useAxiosContext } from "./useAxiosContext";

export const useFilmsScreenings = (date: string) => {
	const axios = useAxiosContext();
	const parts = date.split(".");
	const resultDate = parts.reverse().join(".");
	const getScreenings = async () => {
		try {
			const response = await axios.get(`films?screeningDate=${resultDate}`);
			console.log(response.data);
			return response.data;
		} catch {}
	};

	return useQuery(["filmsScreenings", date], getScreenings);
};
