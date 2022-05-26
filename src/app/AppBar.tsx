import { Button } from "@mui/material";
import SettingsAppBar from "../dashboard/SettingsAppBar";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Cookie } from "universal-cookie";
import { FC } from "react";

const AppBar: FC<AppBarProps> = ({ user, logout }) => {
  return (
    <div
      style={{
        height: "100px",
      }}
    >
      <div
        style={{
          height: "100px",
          display: "flex",
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          position: "fixed",
          zIndex: 1000,
        }}
      >
        {user.isCandidate || user.isCompany ? (
          <Button
            href={user.isCandidate ? "/candidate" : "/company"}
            style={{ backgroundColor: "transparent" }}
          >
            <Logo width={85} height={85} />
          </Button>
        ) : (
          <Button href={"/"} style={{ backgroundColor: "transparent" }}>
            <Logo width={85} height={85} />
          </Button>
        )}
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
    </div>
  );
};

export interface AppBarProps {
  user: Cookie;
  logout: () => void;
}

export default AppBar;
