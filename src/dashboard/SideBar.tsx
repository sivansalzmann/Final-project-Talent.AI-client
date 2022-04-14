import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import Logo from "../ui-components/Logo";

const SideBar = ({}) => {
  return (
    <Box
      sx={{
        width: "20%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Typography
        color="secondary"
        marginTop="10px"
        left="0px"
        variant="h3"
        fontWeight="bold"
        align="center"
        marginBottom="10%"
      >
        TALENT.AI
      </Typography>
      <Button
        component={Link}
        href="#"
        target="_blank"
        style={{ fontWeight: "bold", marginTop: "10px", color: "gray" }}
      >
        Company dashboard
      </Button>
      <Button
        component={RouterLink}
        to="/login"
        target="_blank"
        style={{ fontWeight: "bold", marginBlockStart: "10px", color: "gray" }}
      >
        Candidate dashboard
      </Button>
    </Box>
  );
};

export default SideBar;
