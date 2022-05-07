import { FC, useState } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Typography } from "@mui/material";
import Footer from "../dashboard/Footer";
import { ReactComponent as Logo } from "../assets/logo.svg";
import PopUpPosition from "./PopUpPosition";
import { styled } from "@mui/system";
import { setUser } from "../store/store-actions";
import { loadCandidate } from "../store/store-loading-ations";

const Login: FC = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["user"]);
  const [position, setPosition] = useState(false);
  const [open, setOpen] = useState(true);

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
          setUser(result);
          resolve();
        });
        cookiePromise.then(() => {
          if (result.company) {
            navigate("/company");
          } else if (result.candidate) {
            loadCandidate(result.googleID);
            navigate("/candidate");
          } else {
            console.log(position);
            setPosition(true);
          }
        });
      });
  };
  const googleFailure = (response) => {
    console.log(response);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Logo width={70} height={70} style={{ margin: "10px" }} />
      <BoxContainer>
        <div style={{ margin: "5%" }}>
          <Typography variant="h3" color="white" align="center">
            Talent.AI
          </Typography>
          <Box margin="auto">
            <Typography color="white" align="center" mb={4}>
              Sign In With Google
            </Typography>
            <div>
              <GoogleLogin
                clientId="944144499803-gi6u2hisohp4g1tne5ah03fdsljf61kc.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
              />
            </div>
          </Box>
        </div>
      </BoxContainer>
      <Footer />
      {position && (
        <PopUpPosition user={cookie.user} open={open} close={handleClose} />
      )}
    </>
  );
};

const BoxContainer = styled("div")({
  backgroundColor: "#6288D8",
  width: "30%",
  marginLeft: "35%",
  marginTop: "5%",
  borderRadius: "10px",
  marginBottom: "1%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default Login;
