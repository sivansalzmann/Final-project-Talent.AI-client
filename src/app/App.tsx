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
		fetch(`https://52.215.114.42:3000/api/auth/logout`)
			.then((result) => {
				setCookie("user", "");
				navigate("/");
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<h1 onClick={() => {
				fetch('https://talent-ai-lb-1746771751.eu-west-1.elb.amazonaws.com/')
					.then(response => response.text())
					.then(data => console.log(data));
			}} >test me</h1>

			<h1 onClick={() => {
				fetch('https://talent-ai-lb-1746771751.eu-west-1.elb.amazonaws.com/',
					{
						credentials: 'include'
					})
					.then(response => response.text())
					.then(data => console.log(data));
			}} >test me2</h1>

			<h1 onClick={() => {
				fetch('https://talent-ai-lb-1746771751.eu-west-1.elb.amazonaws.com/',
					{
						credentials: 'same-origin'
					})
					.then(response => response.text())
					.then(data => console.log(data));
			}} >test me3</h1>
		</>
		// <>
		//   <AppBar user={user} logout={logout} />
		//   <HeaderWrapper id="home">
		//     <HomePage />
		//   </HeaderWrapper>
		//   <Footer />
		// </>
	);
};

const HeaderWrapper = styled("div")(() => ({
	overflowX: "hidden",
	overflowY: "clip",
}));

export default App;
