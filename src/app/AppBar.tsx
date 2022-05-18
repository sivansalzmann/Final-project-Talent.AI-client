import { Button } from "@mui/material";
import SettingsAppBar from "../dashboard/SettingsAppBar";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Cookie } from "universal-cookie";
import { FC } from "react";

const AppBar: FC<AppBarProps> = ({ user, logout }) => {
  return (
    <div
      style={{
        margin: "0.5%",
        height: "5%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Button href="/" style={{ backgroundColor: "transparent" }}>
        <Logo width={65} height={65} />
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "0.5%",
        }}
      >
        {user && <SettingsAppBar user={user} logout={logout} />}
      </div>
    </div>
  );
};

export interface AppBarProps {
  user: Cookie;
  logout: () => void;
}

export default AppBar;
