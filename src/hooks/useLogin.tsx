import { useMutation } from "react-query";
import { OptionalUser } from "../types/OptionalUser";
import { useAxiosContext } from "./useAxiosContext";
import { useUserContext } from "./useUserContext";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface LoginParams {
	username: string;
	password: string;
}

export const useLogin = (setErrorMsg: React.Dispatch<React.SetStateAction<string>>) => {
	const axios = useAxiosContext();
	const { setUser } = useUserContext();
	const navigate = useNavigate();

	const login = async ({ username, password }: LoginParams) => {
		try {
			const response = await axios.post("sessions", {
				name: username,
				password,
			});
			if (response.status === 200) {
				setUser({
					accessToken: response.data.token,
					id: response.data.id,
					name: username,
				});
				localStorage.setItem(
					"user",
					JSON.stringify({
						accessToken: response.data.token,
						id: response.data.id,
						name: username,
					})
				);
				navigate("/schedule");
			}
		} catch (error: any) {
			if (error.response.status === 400) {
				setErrorMsg("Invalid credentials");
			}
		}
	};

	return useMutation(login, {
		onError: (error) => console.log(error),
	});
};
