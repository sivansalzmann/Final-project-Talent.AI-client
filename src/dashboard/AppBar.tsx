import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import Logo from "../ui-components/Logo";

const AppBar = ({}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#8600b3",
      }}
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
    >
      <div style={{ margin: "30px" }}></div>
      {/* <Logo /> */}
      <Stack direction="row" spacing={2}>
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
      </Stack>
    </Box>
  );
};

export default AppBar;
