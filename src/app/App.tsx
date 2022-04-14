import styled from "@emotion/styled";
import { FC } from "react";
import HomePage from "./HomePage";
import Footer from "./Footer";
import AppBar from "../dashboard/AppBar";

const HeaderWrapper = styled("div")(({ theme }) => ({
  overflowX: "hidden",
  overflowY: "clip",
}));

const App: FC = () => {
  return (
    <>
      <AppBar />
      <HeaderWrapper id="home">
        <HomePage />
      </HeaderWrapper>
      <Footer />
    </>
  );
};

export default App;
