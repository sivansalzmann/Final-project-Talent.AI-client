import { FC } from "react";
import { Cookie } from "universal-cookie";
import { useSnapshot } from "valtio";
import AppStore from "../store/app-store";
import Login from "./Login";

const LoginContainer: FC<LoginContainerProps> = ({
  isCandidate,
  user,
  isCompany,
}) => {
  return (
    <div style={{ height: "100vh" }}>
      <Login
        isCompany={isCompany}
        isCandidate={isCandidate}
        user={user}
        //companyName={companyName}
      />
    </div>
  );
};

export interface LoginContainerProps {
  isCandidate?: boolean;
  user: Cookie;
  isCompany?: boolean;
}

export default LoginContainer;
