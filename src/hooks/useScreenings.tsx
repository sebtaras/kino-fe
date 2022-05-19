import { useQuery } from "react-query";
import { useAxiosContext } from "./useAxiosContext";

export const useScreenings = (date: string) => {
	const axios = useAxiosContext();
	const getScreenings = async () => {
		try {
			const response = await axios.get("screenings", {});
			console.log(response.data);
			return response.data;
		} catch {}
	};

	return useQuery(["screenings", date], getScreenings);
};
