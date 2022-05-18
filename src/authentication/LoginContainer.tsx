import { FC } from "react";
import { Cookie } from "universal-cookie";
import Footer from "../app/Footer";
import Login from "./Login";
import { ReactComponent as Logo } from "../assets/logo.svg";

const LoginContainer: FC<LoginContainerProps> = ({
  isCandidate,
  user,
  isCompany,
}) => {
  return (
    <div style={{ height: "100vh" }}>
      <Logo width={70} height={70} style={{ margin: "10px" }} />
      <Login isCompany={isCompany} isCandidate={isCandidate} user={user} />
      <Footer />
    </div>
  );
};

export interface LoginContainerProps {
  isCandidate?: boolean;
  user: Cookie;
  isCompany?: boolean;
}

export default LoginContainer;
