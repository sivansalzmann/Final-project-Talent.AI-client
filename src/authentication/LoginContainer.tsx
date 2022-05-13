import { FC } from "react";
import { Cookie } from "universal-cookie";
import { useSnapshot } from "valtio";
import AppStore from "../store/app-store";
import Login from "./Login";

const LoginContainer: FC<LoginContainerProps> = ({ isCandidate, user }) => {
  const { isUserCompany, companyName } = useSnapshot(AppStore);
  console.log(isUserCompany);
  console.log(companyName);
  return (
    <div style={{ height: "100vh" }}>
      <Login
        isCompany={isUserCompany}
        isCandidate={isCandidate}
        user={user}
        companyName={companyName}
      />
    </div>
  );
};

export interface LoginContainerProps {
  isCandidate?: boolean;
  user: Cookie;
}

export default LoginContainer;
