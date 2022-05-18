import { QueryClient } from "react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: Infinity,
		},
	},
});

export default queryClient;
