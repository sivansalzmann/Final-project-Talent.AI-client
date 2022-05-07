import { FC } from "react";
import { Cookie } from "universal-cookie";
import Login from "./Login";

const LoginContainer: FC<LoginContainerProps> = ({
  company,
  candidate,
  user,
}) => {
  return (
    <div style={{ height: "100vh" }}>
      <Login company={company} candidate={candidate} user={user} />
    </div>
  );
};

export interface LoginContainerProps {
  company?: boolean;
  candidate?: boolean;
  user: Cookie;
}

export default LoginContainer;
