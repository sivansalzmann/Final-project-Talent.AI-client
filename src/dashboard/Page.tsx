import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";
import SideBar from "./SideBar";

const Page = ({ children }) => {
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
        <div style={{ margin: "20px" }}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
