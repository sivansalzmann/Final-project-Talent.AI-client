import { Paper, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";
import SideBar from "./SideBar";

const Page = ({ title, children }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const logout = () => {
    fetch(`http://localhost:3000/api/auth/logout`)
      .then((result) => {
        setCookie("user", "");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppBar user={cookies.user} logout={logout} />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "80%",
            position: "relative",
          }}
        >
          <Paper
            sx={{
              borderRadius: "1%",
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
              borderRadius: "1%",
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
