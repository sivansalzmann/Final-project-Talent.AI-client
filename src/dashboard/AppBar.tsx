import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import Logo from "../ui-components/Logo";
import SettingsAppBar from "./SettingsAppBar";

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
          <Logo />
        </Box>
      </div>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0.5%",
        }}
      >
        {user && <SettingsAppBar user={user} logout={logout} />}
      </Box>
    </Box>
  );
};

export default AppBar;
