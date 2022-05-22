import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const navigate = useNavigate();
	const { isLoading, mutate: login } = useLogin(setErrorMsg);
	return (
		<>
			<Header />
			<Container
				maxWidth="md"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginTop: "2rem",
				}}
			>
				{errorMsg && <Typography align="left">{errorMsg}</Typography>}
				<TextField
					data-testid="username"
					placeholder="Korisnicko ime..."
					variant="filled"
					size="small"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					data-testid="password"
					placeholder="Lozinka..."
					variant="filled"
					type={"password"}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					data-testid="login-button"
					disabled={isLoading}
					style={{ marginTop: "1rem" }}
					variant="contained"
					onClick={() => login({ username, password })}
				>
					Prijava
				</Button>
				<Button style={{ padding: "1rem" }} onClick={() => navigate("/registracija")}>
					Nemas racun?
				</Button>
			</Container>
		</>
	);
};

export default LoginPage;
