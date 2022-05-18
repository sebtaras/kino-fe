import { OptionalUser } from "./OptionalUser";

export interface IUserContext {
	user: OptionalUser;
	setUser: React.Dispatch<React.SetStateAction<OptionalUser>>;
	logout: () => void;
}
