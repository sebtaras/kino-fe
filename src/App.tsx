import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import { QueryClientProvider } from "react-query";
import queryClient from "./utils/queryClient";
import { UserProvider } from "./context/UserContext";
import { AxiosProvider } from "./context/AxiosContext";
import Schedule from "./screens/Schedule";
import Search from "./screens/Search";

function App() {
	return (
		// <ThemeProvider theme={theme}>
		// <AuthContext.Provider value={initialValue}>
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<AxiosProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/schedule" element={<Schedule />} />
							<Route path="/search" element={<Search />} />
							{/* <Route path="/profile" element={<Profile />} /> */}
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
							<Route path="*" element={<Navigate to="/schedule" replace={true} />} />
						</Routes>
					</BrowserRouter>
				</AxiosProvider>
			</UserProvider>
		</QueryClientProvider>
		//</AuthContext.Provider>
		// </ThemeProvider>
	);
}

export default App;
