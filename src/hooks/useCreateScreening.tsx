import { useMutation, useQueryClient } from "react-query";
import { cleanTimestamp } from "../utils/functions/cleanTimestamp";
import { loadUser } from "../utils/functions/loadUser";
import { useAxiosContext } from "./useAxiosContext";

export const useCreateScreening = (
	filmId: number,
	hallId: number,
	date: Date,
	basePrice: number
) => {
	const axios = useAxiosContext();
	const tempDate = new Date(date.getTime());
	const realDate = new Date(tempDate.setHours(tempDate.getHours() + 2));
	const startAt = cleanTimestamp(realDate.toISOString());
	const queryClient = useQueryClient();
	const createScreening = async () => {
		try {
			const response = await axios.post("screenings", {
				filmId,
				hallId,
				startAt,
				basePrice,
			});
			if (response.status === 200) {
				alert("Screening added!");
			}
		} catch (error: any) {}
	};

	return useMutation(createScreening, {
		onError: (error) => console.log(error),
		onSuccess: () => {
			queryClient.refetchQueries(["screeningsHall", startAt.split("T")[0] + hallId]);
			queryClient.refetchQueries("filmsScreenings");
		},
	});
};
