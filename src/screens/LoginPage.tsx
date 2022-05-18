import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const { isLoading, mutate: login } = useLogin(setErrorMsg);
	return (
		<>
			<Container
				maxWidth="md"
				style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
			>
				<Typography>Kino buraz</Typography>
				{errorMsg && <Typography align="left">{errorMsg}</Typography>}
				<TextField
					placeholder="Username..."
					variant="filled"
					size="small"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					placeholder="Password..."
					variant="filled"
					type={"password"}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					disabled={isLoading}
					style={{ marginTop: "1rem" }}
					variant="contained"
					onClick={() => login({ username, password })}
				>
					Login
				</Button>
			</Container>
		</>
	);
};

export default LoginPage;
