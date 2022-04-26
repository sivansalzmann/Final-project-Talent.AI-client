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
import FiberNewIcon from "@mui/icons-material/FiberNew";
import PeopleIcon from "@mui/icons-material/People";
import ViewListIcon from "@mui/icons-material/ViewList";
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
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ebf5f9",
        borderRadius: "10px",
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
            style={{ fontWeight: "300", marginTop: "10%", color: "black" }}
          >
            Job List
          </Button>
        </li>
        <li>
          <Button
            component={RouterLink}
            startIcon={<WorkHistoryIcon />}
            to="/applications"
            style={{ fontWeight: "300", marginTop: "10%", color: "black" }}
          >
            Your Applications
          </Button>
        </li>
        <li>
          <Button
            component={RouterLink}
            startIcon={<BusinessIcon />}
            to="/matchingCompanies"
            style={{ fontWeight: "300", marginTop: "10%", color: "black" }}
          >
            Matching companies
          </Button>
        </li>
        <li>
          <Button
            component={RouterLink}
            startIcon={<PersonIcon />}
            to="/candidate"
            style={{ fontWeight: "300", marginTop: "10%", color: "black" }}
          >
            Personal Profile
          </Button>
        </li>
        <li>
          <Button
            component={RouterLink}
            startIcon={<PeopleIcon />}
            to="/company"
            style={{ fontWeight: "300", marginTop: "10%", color: "black" }}
          >
            Company Profile
          </Button>
        </li>
        <li>
          <Button
            component={RouterLink}
            startIcon={<FiberNewIcon />}
            to="/addNewJobOffer"
            style={{ fontWeight: "300", marginTop: "10%", color: "black" }}
          >
            New job offer
          </Button>
        </li>
        <li>
          <Button
            component={RouterLink}
            startIcon={<ViewListIcon />}
            to="/companyJobOffers"
            style={{ fontWeight: "300", marginTop: "10%", color: "black" }}
          >
            Job offers
          </Button>
        </li>
        <li>
          <Button
            component={RouterLink}
            startIcon={<LogoutIcon />}
            onClick={logout}
            to="/"
            style={{ fontWeight: "300", marginTop: "10%", color: "black" }}
          >
            Log Out
          </Button>
        </li>
      </ul>
    </Box>
  );
};

export default SideBar;
