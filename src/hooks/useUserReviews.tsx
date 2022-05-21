import { useQuery } from "react-query";
import { Review } from "../types/FilmInfo";
import { loadUser } from "../utils/functions/loadUser";
import { useAxiosContext } from "./useAxiosContext";

export const useUserReviews = (userId: number) => {
	const axios = useAxiosContext();
	const user = loadUser();
	const getReviews = async (): Promise<Review[]> => {
		try {
			const response = await axios.get(`reviews?userId=${user?.id}`);
			return response.data;
		} catch (error: any) {
			return [];
		}
	};

	return useQuery(["reviews", userId], getReviews);
};
