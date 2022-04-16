import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Logo from "../ui-components/Logo";
import WorkIcon from "@mui/icons-material/Work";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCookies } from "react-cookie";

const SideBar = ({}) => {
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
    <Box
      sx={{
        width: "20%",
        height: "auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#6288D8",
      }}
    >
      <ul
        style={{
          marginTop: "10%",
          marginLeft: "15%",
          display: "flex",
          listStyleType: "none",
          flexDirection: "column",
        }}
      >
        <li>
          <Button
            component={Link}
            startIcon={<WorkIcon />}
            href="/jobList"
            style={{ fontWeight: "bold", marginTop: "10%", color: "white" }}
          >
            Job List
          </Button>
        </li>
        <li>
          <Button
            component={RouterLink}
            startIcon={<WorkHistoryIcon />}
            to="/applications"
            style={{ fontWeight: "bold", marginTop: "10%", color: "white" }}
          >
            Your Applications
          </Button>
        </li>
        <li>
          <Button
            component={RouterLink}
            startIcon={<BusinessIcon />}
            to="/candidate"
            style={{ fontWeight: "bold", marginTop: "10%", color: "white" }}
          >
            Matching companies
          </Button>
        </li>
        <li>
          <Button
            component={RouterLink}
            startIcon={<PersonIcon />}
            to="/candidate"
            style={{ fontWeight: "bold", marginTop: "10%", color: "white" }}
          >
            Personal Profile
          </Button>
        </li>
        <li>
          <Button
            component={RouterLink}
            startIcon={<LogoutIcon />}
            onClick={logout}
            to="/"
            style={{ fontWeight: "bold", marginTop: "10%", color: "white" }}
          >
            Log Out
          </Button>
        </li>
      </ul>
    </Box>
  );
};

export default SideBar;
