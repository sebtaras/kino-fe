import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const { isLoading, mutate: register } = useRegister(setErrorMsg);
	return (
		<div>
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
					onChange={(e) => {
						setUsername(e.target.value);
						setErrorMsg("");
					}}
				/>
				<TextField
					placeholder="Password..."
					variant="filled"
					type={"password"}
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
						setErrorMsg("");
					}}
				/>
				<TextField
					placeholder="Repeat password..."
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
					Register
				</Button>
			</Container>
		</div>
	);
};

export default RegisterPage;
