export type OptionalUser = User | null;

export type User = {
	id: string;
	name: string;
	accessToken: string;
};
