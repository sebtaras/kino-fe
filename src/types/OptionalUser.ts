export type OptionalUser = User | null;

export type User = {
	id: string;
	isAdmin: boolean;
	name: string;
	accessToken: string;
};
