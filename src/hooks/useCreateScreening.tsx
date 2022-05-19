import { useMutation, useQueryClient } from "react-query";
import { createTimestamp } from "../utils/functions/createTimestamp";
import { loadUser } from "../utils/functions/loadUser";
import { useAxiosContext } from "./useAxiosContext";

export const useCreateScreening = (
	filmId: number,
	hallId: number,
	time: string,
	date: string,
	basePrice: number
) => {
	const axios = useAxiosContext();
	const startAt = createTimestamp(date, time);

	const createScreening = async () => {
		try {
			const response = await axios.post("screenings", {
				filmId,
				hallId,
				startAt,
				basePrice,
			});
		} catch (error: any) {}
	};

	return useMutation(createScreening, {
		onError: (error) => console.log(error),
	});
};
