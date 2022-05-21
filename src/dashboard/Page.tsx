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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppBar user={user} logout={logout} />
      <div style={{ display: "flex" }}>
        <SideBar logout={logout} />
        <PageContainer>
          <Paper
            sx={{
              borderRadius: "10px",
              backgroundColor: "white",
              margin: "0.5%",
              border: `1px solid ${"#6288D8"}`,
            }}
          >
            <Typography variant="h5" margin="1%" fontWeight="300">
              {title}
            </Typography>
          </Paper>
          <Paper
            sx={{
              borderRadius: "10px",
              backgroundColor: "white",
              minHeight: "80%",
              position: "relative",
              margin: "0.5%",
              border: `1px solid ${"#6288D8"}`,
              marginBottom: "60px",
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
  minWidth: "80%",
  position: "relative",
});

export interface PageProps {
  title: string;
}

export default Page;
