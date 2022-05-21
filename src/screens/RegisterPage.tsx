import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const navigate = useNavigate();
	const { isLoading, mutate: register } = useRegister(setErrorMsg);
	return (
		<>
			<Header />
			<Container
				maxWidth="md"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					paddingTop: "2rem",
				}}
			>
				{errorMsg && <Typography align="left">{errorMsg}</Typography>}
				<TextField
					placeholder="Korisnicko ime..."
					variant="filled"
					size="small"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
						setErrorMsg("");
					}}
				/>
				<TextField
					placeholder="Lozinka..."
					variant="filled"
					type={"password"}
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
						setErrorMsg("");
					}}
				/>
				<TextField
					placeholder="Ponovi lozinku..."
					variant="filled"
					type={"password"}
					value={repeatPassword}
					onChange={(e) => {
						setRepeatPassword(e.target.value);
						setErrorMsg("");
					}}
				/>
				<Button
					disabled={isLoading}
					style={{ marginTop: "1rem" }}
					variant="contained"
					onClick={() => register({ username, password })}
				>
					Registriraj se
				</Button>
				<Button style={{ padding: "1rem" }} onClick={() => navigate("/prijava")}>
					Vec imas racun?
				</Button>
			</Container>
		</>
	);
};

export default RegisterPage;
