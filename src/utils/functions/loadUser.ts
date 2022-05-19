import { OptionalUser, User } from "../../types/OptionalUser";

export const loadUser = (): OptionalUser => {
	const user = localStorage.getItem("user");
	if (user) {
		return JSON.parse(user) as User;
	} else return null;
};
