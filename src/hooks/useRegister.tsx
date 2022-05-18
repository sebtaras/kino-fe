import { useMutation } from "react-query";
import { useAxiosContext } from "./useAxiosContext";
import { useUserContext } from "./useUserContext";
import { useNavigate } from "react-router-dom";

interface RegisterParams {
	username: string;
	password: string;
}

export const useRegister = (
	setErrorMsg: React.Dispatch<React.SetStateAction<string>>
) => {
	const axios = useAxiosContext();
	const { setUser } = useUserContext();
	const navigate = useNavigate();

	const register = async ({ username, password }: RegisterParams) => {
		try {
			const response = await axios.post("users", {
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
				setErrorMsg("Invalid input");
			} else if (error.response.status === 409) {
				setErrorMsg("User with this name already exists");
			}
		}
	};

	return useMutation(register, {
		onError: (error) => console.log(error),
	});
};
