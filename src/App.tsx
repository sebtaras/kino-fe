import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import { QueryClientProvider } from "react-query";
import queryClient from "./utils/queryClient";
import { UserProvider } from "./context/UserContext";
import { AxiosProvider } from "./context/AxiosContext";
import Schedule from "./screens/Schedule";
import Search from "./screens/Search";
import Screenings from "./screens/Screenings";
import Tickets from "./screens/Tickets";
import Profile from "./screens/Profile";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<AxiosProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/projekcije" element={<Screenings />} />
							<Route path="/raspored" element={<Schedule />} />
							<Route path="/trazilica" element={<Search />} />
							<Route path="/projekcije/:id" element={<Tickets />} />
							<Route path="/profil" element={<Profile />} />
							<Route path="/prijava" element={<LoginPage />} />
							<Route path="/registracija" element={<RegisterPage />} />
							<Route path="*" element={<Navigate to="/raspored" replace={true} />} />
						</Routes>
					</BrowserRouter>
				</AxiosProvider>
			</UserProvider>
		</QueryClientProvider>
	);
}

export default App;
