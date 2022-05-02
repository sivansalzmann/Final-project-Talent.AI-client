import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { Link, Navigate, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Typography } from "@mui/material";
import Footer from "../dashboard/Footer";
import { Candidate, Company } from "../types/candidates-types";
import CandidateDashboard from "../candidate/CandidateDashboard";
import { ReactComponent as Logo } from "../assets/logo.svg";
import PopUpPosition from "./PopUpPosition";

export default function Login(props) {
  let history = useNavigate();
  const [cookie, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const [position, setPosition] = useState(false);
  //const [company, setCompany] = useState(false);
  //const [candidate, setCandidate] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    console.log("here");
    setOpen(false);
  };

  const googleSuccess = async (response) => {
    const body = { token: response.tokenId };
    fetch(`http://localhost:3000/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        const cookiePromise = new Promise<void>((resolve, reject) => {
          setCookie("user", result);
          resolve();
        });
        cookiePromise.then(() => {
          console.log(result);
          if (result.company) {
            navigate("/company");
          } else if (result.candidate) {
            navigate("/candidate");
          } else {
            setPosition(true);
          }
        });
      });
  };
  const googleFailure = (response) => {
    console.log(response);
  };
  return (
    <>
      <Logo width={70} height={70} style={{ margin: "10px" }} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          backgroundColor: "#6288D8",
          // height: "80%",
          width: "30%",
          marginLeft: "35%",
          marginTop: "5%",
          borderRadius: "10px",
          marginBottom: "1%",
        }}
      >
        <div style={{ margin: "5%" }}>
          <Typography variant="h2" color="white">
            Talent.AI
          </Typography>
          <Box margin="auto">
            <Typography
              color="white"
              sx={{ marginTop: "3%", marginBottom: "3%", marginLeft: "10%" }}
            >
              Sign In With Google
            </Typography>
            <div style={{ margin: "10%" }}>
              <GoogleLogin
                clientId="944144499803-gi6u2hisohp4g1tne5ah03fdsljf61kc.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
              />
            </div>
          </Box>
        </div>
      </Box>
      <Footer />
      {position && <PopUpPosition user={cookie.user} open={true} />}
    </>
  );
}
