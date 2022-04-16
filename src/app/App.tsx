import styled from "@emotion/styled";
import { FC } from "react";
import HomePage from "./HomePage";
import Footer from "./Footer";
import AppBar from "../dashboard/AppBar";
import { useCookies } from "react-cookie";

const HeaderWrapper = styled("div")(({ theme }) => ({
  overflowX: "hidden",
  overflowY: "clip",
}));

const App: FC = () => {
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <>
      <AppBar user={cookies.user} logout={undefined} />
      <HeaderWrapper id="home">
        <HomePage />
      </HeaderWrapper>
      <Footer />
    </>
  );
};

export default App;
