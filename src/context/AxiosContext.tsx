import axios, { AxiosInstance } from "axios";
import { createContext, ReactNode, useMemo } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { baseURL } from "../utils/constants";

interface Props {
	children: ReactNode;
}

export const AxiosContext = createContext<AxiosInstance>(
	axios.create({ baseURL: baseURL, timeout: 5000 })
);

export const AxiosProvider = ({ children }: Props) => {
	const { user } = useUserContext();

	const auth = useMemo(() => {
		const axiosClient = axios.create({ baseURL: baseURL, timeout: 5000 });

		axiosClient.interceptors.request.use((config) => {
			if (user?.accessToken && config.headers) {
				config.headers.Authorization = `Bearer ${user?.accessToken}`;
			}
			return config;
		});

		return axiosClient;
	}, [user]);

	return <AxiosContext.Provider value={auth}>{children}</AxiosContext.Provider>;
};
