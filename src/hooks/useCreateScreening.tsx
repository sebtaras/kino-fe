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
				alert("Projekcija stvorena!");
			}
		} catch (error: any) {
			if (error.response.status === 409) {
				alert("Konflikt u rasporedu, izaberi drugo vrijeme projekcije.");
			}
		}
	};

	return useMutation(createScreening, {
		onError: (error) => {
			alert("Konflikt u rasporedu. Promjeni vrijeme projekcije.");
		},
		onSuccess: () => {
			queryClient.refetchQueries([
				"screeningsHall",
				realDate.toLocaleDateString() + hallId,
			]);
			queryClient.refetchQueries("filmsScreenings");
		},
	});
};
