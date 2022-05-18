import { createContext, ReactNode, useEffect, useState } from "react";
import { IUserContext } from "../types/IUserContext";
import { OptionalUser } from "../types/OptionalUser";

interface Props {
	children: ReactNode;
}

const initialState: IUserContext = {
	user: null,
	setUser: () => {},
	logout: () => {},
};

export const UserContext = createContext<IUserContext>(initialState);

export const UserProvider = ({ children }: Props) => {
	const [user, setUser] = useState<OptionalUser>(null);
	const [attemptedLogin, setAttemptedLogin] = useState(false);

	useEffect(() => {
		const user = localStorage.getItem("user") as OptionalUser;
		if (user && !attemptedLogin) {
			setAttemptedLogin(true);
			setUser(user);
		}
	});

	const login = () => {};

	const logout = () => {
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, setUser, logout }}>
			{children}
		</UserContext.Provider>
	);
};
