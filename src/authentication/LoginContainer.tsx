import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Typography } from "@mui/material";
import Footer from "../dashboard/Footer";
import Logo from "../ui-components/Logo";
import Login from "./Login";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//       display: "flex",
//       marginLeft: "25%",
//       marginTop: "6%",
//     },
//   },
// }));

export default function LoginContainer(props) {
  return (
    <div style={{ height: "100vh" }}>
      <Login />
    </div>
  );
}
