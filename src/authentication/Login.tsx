import { FC, useState } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Typography } from "@mui/material";
import PopUpPosition from "./PopUpPosition";
import { styled } from "@mui/system";
import { Cookie } from "universal-cookie";

const Login: FC<LoginProps> = ({
  isCompany,
  isCandidate,
  user,
  companyName,
}) => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["user"]);
  const [position, setPosition] = useState(false);
  const [open, setOpen] = useState(true);

  const googleSuccess = async (response) => {
    const body = {
      token: response.tokenId,
      isCandidate,
      isCompany,
      companyName,
    };
    fetch(`${process.env.REACT_APP_SERVER}/api/auth/login`, {
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
          if (result.isCompany) {
            navigate("/company");
          } else if (result.isCandidate) {
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
      {position && (
        <PopUpPosition
          user={user}
          open={open}
          close={handleClose}
          candidate={isCandidate}
          company={isCompany}
        />
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

export interface LoginProps {
  isCompany?: boolean;
  isCandidate?: boolean;
  user: Cookie;
  companyName?: string;
}

export default Login;
