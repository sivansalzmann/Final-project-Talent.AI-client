import { Box } from "@mui/material";
import SettingsAppBar from "./SettingsAppBar";
import { ReactComponent as Logo } from "../assets/logo.svg";

const AppBar = ({ user, logout }) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        textAlign: "right",
      }}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
    >
      <div style={{ margin: "0.5%", flexDirection: "row", display: "flex" }}>
        <Box mt={1.5}>
          <Logo width={65} height={65} />
        </Box>
      </div>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "0.5%",
        }}
      >
        {user && <SettingsAppBar user={user} logout={logout} />}
      </Box>
    </Box>
  );
};

export default AppBar;
