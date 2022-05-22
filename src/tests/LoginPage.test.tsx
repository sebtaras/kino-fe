/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import LoginPage from "../screens/LoginPage";
import queryClient from "../utils/queryClient";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	useNavigate: () => ({ navigate: mockedNavigate }),
}));

test("atest", async () => {
	render(
		<QueryClientProvider client={queryClient}>
			<LoginPage />
		</QueryClientProvider>
	);
	const header = screen.getByText(/KINO/i);
	expect(header).toBeInTheDocument();
});
