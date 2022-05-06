import styled from "@emotion/styled";
import { FC } from "react";
import HomePage from "./HomePage";
import Footer from "./Footer";
import AppBar from "../dashboard/AppBar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const App: FC = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const logout = () => {
    fetch(`http://localhost:3000/api/auth/logout`)
      .then((result) => {
        setCookie("user", "");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AppBar user={cookies.user} logout={logout} />
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
