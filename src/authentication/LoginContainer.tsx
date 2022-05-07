import { FC } from "react";
import Login from "./Login";

const LoginContainer: FC<LoginContainerProps> = ({ company, candidate }) => {
  return (
    <div style={{ height: "100vh" }}>
      <Login company={company} candidate={candidate} />
    </div>
  );
};

export interface LoginContainerProps {
  company?: boolean;
  candidate?: boolean;
}

export default LoginContainer;
