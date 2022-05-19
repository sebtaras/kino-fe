import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { Menu as MenuIcon } from "@material-ui/icons";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { OptionalUser } from "../types/OptionalUser";
import { loadUser } from "../utils/functions/loadUser";

export default function Header() {
	const navigate = useNavigate();
	const pages = ["Schedule", "Search"];
	const settings = ["Logout"];

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const user = loadUser();

	if (user?.isAdmin) {
		pages.push("Screenings");
	}

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<>
			<AppBar style={{ margin: 0, padding: 0 }}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h3"
							color="white"
							noWrap
							component="div"
							sx={{ mr: 2, display: { xs: "none", md: "flex", marginRight: "3rem" } }}
						>
							KINO
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{pages.map((page) => (
									//hamburger menu
									<MenuItem
										key={page}
										onClick={() => {
											handleCloseNavMenu();
											navigate(`/${page}`);
										}}
									>
										<Typography textAlign="center">{page}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Typography
							variant="h4"
							color="white"
							noWrap
							component="div"
							sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
						>
							KINO
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={(e) => {
										handleCloseNavMenu();
										navigate(`/${page}`);
									}}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									<Typography>{page}</Typography>
								</Button>
							))}
						</Box>

						{user ? (
							<>
								<Box sx={{ flexGrow: 0 }}>
									<Tooltip title="Open settings">
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar alt="user" />
										</IconButton>
									</Tooltip>
									<Menu
										sx={{ mt: "45px" }}
										id="menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
									>
										{settings.map((setting) => (
											<MenuItem
												key={setting}
												onClick={() => {
													handleCloseNavMenu();
													if (setting === "Profile") {
														navigate("/Profile");
													} else {
														localStorage.clear();
														navigate("/login");
													}
												}}
											>
												<Typography textAlign="center">{setting}</Typography>
											</MenuItem>
										))}
									</Menu>
								</Box>
							</>
						) : (
							<Button
								key={"login"}
								onClick={(e) => {
									handleCloseNavMenu();
									navigate(`/login`);
								}}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Typography>{"LOGIN"}</Typography>
							</Button>
						)}
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar />
		</>
	);
}
