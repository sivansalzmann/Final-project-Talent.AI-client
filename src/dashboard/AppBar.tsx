import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Button, Link, Stack, Typography } from "@mui/material";
import Logo from "../ui-components/Logo";
import UserProfile from "./UserProfile";

const AppBar = ({ user, logout }) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#6288D8",
        textAlign: "right",
      }}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
    >
      <div style={{ margin: "0.5%", flexDirection: "row", display: "flex" }}>
        <Logo />
        <div style={{ marginTop: "3%" }}>
          <Button
            sx={{ color: "white" }}
            component={Link}
            href="#"
            target="_blank"
          >
            Home
          </Button>
          <Button
            sx={{ color: "white" }}
            component={RouterLink}
            to="/login"
            target="_blank"
          >
            Login/Sign up
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "0.5%",
          justifyContent: "space-between",
        }}
      >
        <UserProfile user={user} logout={logout} />
        {/* <Typography color="white">Hello {user.first_name}!</Typography>
        <Avatar src={user.avatar} /> */}
      </div>
    </Box>
  );
};

export default AppBar;
