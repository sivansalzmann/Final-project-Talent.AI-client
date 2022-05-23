import { Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AppBar from "../app/AppBar";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { styled } from "@mui/system";

const Page: FC<PageProps> = ({ title, children }) => {
  const [cookie, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  let user: any = "";
  if (Array.isArray(cookie.user)) {
    user = cookie.user[0];
  } else {
    user = cookie.user;
  }

  const logout = () => {
    fetch(`${process.env.REACT_APP_SERVER}/api/auth/logout`)
      .then((result) => {
        setCookie("user", "");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: "2%",
      }}
    >
      <AppBar user={user} logout={logout} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "2%",
        }}
      >
        <SideBar logout={logout} />
        <PageContainer>
          <Paper
            sx={{
              borderRadius: "10px",
              backgroundColor: "white",
              margin: "0.5%",
              boxShadow: "10px 10px 8px 10px #88888",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#ECF0F9",
              height: "50px",
              width: "98%",
            }}
          >
            <Typography variant="h5" margin="1%" fontWeight="300" height="50px">
              {title}
            </Typography>
          </Paper>
          <Paper
            sx={{
              borderRadius: "10px",
              backgroundColor: "white",
              margin: "0.5%",
              boxSadow: "10px 10px 8px 10px #ebf5f9",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#ECF0F9",
              width: "98%",
            }}
          >
            <div style={{ margin: "5%" }}>{children}</div>
          </Paper>
        </PageContainer>
      </div>
      <Footer />
    </div>
  );
};

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginLeft: "20%",
  height: "100%",
});

export interface PageProps {
  title: string;
}

export default Page;
