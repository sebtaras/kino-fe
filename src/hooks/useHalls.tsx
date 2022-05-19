import { useQuery } from "react-query";
import { Hall } from "../types/FilmInfo";
import { useAxiosContext } from "./useAxiosContext";

export const useHalls = () => {
	const axios = useAxiosContext();

	const getHalls = async (): Promise<Hall[]> => {
		try {
			const response = await axios.get("halls");
			return response.data.map((hall: any) => {
				return {
					id: hall.id,
					name: hall.name,
					capacity: hall.capacity,
				};
			});
		} catch (error: any) {
			return [];
		}
	};

	return useQuery("halls", getHalls, {
		onError: (error) => console.log(error),
	});
};
