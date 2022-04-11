import styled from "@emotion/styled";
import { FC } from "react";
import HomePage from "./HomePage";
import Footer from "./Footer";

const HeaderWrapper = styled("div")(({ theme }) => ({
  overflowX: "hidden",
  overflowY: "clip",
}));

const App: FC = () => {
  return (
    <>
      <HeaderWrapper id="home">
        <HomePage />
      </HeaderWrapper>
      <Footer />
    </>
  );
};

export default App;
