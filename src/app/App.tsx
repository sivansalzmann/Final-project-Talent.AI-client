import styled from "@emotion/styled";
import { FC } from "react";
import HomePage from "./HomePage";
import Footer from "./Footer";
import AppBar from "./AppBar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const App: FC = () => {
	const [cookie, setCookie] = useCookies(["user"]);
	const navigate = useNavigate();

	let user: any = "";
	if (Array.isArray(cookie.user)) {
		user = cookie.user[0];
	} else {
		user = cookie.user;
	}


	const logout = () => {
		fetch(`${process.env.REACT_APP_SERVER}/api/auth/logout`)
			.then((result) => {
				setCookie("user", "");
				navigate("/");
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<AppBar user={user} logout={logout} />
			<HeaderWrapper id="home">
				<HomePage />
			</HeaderWrapper>
			<Footer />
		</>
	);
};

const HeaderWrapper = styled("div")(() => ({
	overflowX: "hidden",
	overflowY: "clip",
}));

export default App;
