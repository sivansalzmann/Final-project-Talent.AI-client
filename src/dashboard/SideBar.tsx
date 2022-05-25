import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Link, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import PeopleIcon from "@mui/icons-material/People";
import ViewListIcon from "@mui/icons-material/ViewList";
import { FC } from "react";
import { styled } from "@mui/system";
import { useCookies } from "react-cookie";

const SideBar: FC<SideBarProps> = ({ logout }) => {
  const [cookie] = useCookies(["user"]);

  let user: any = "";
  if (Array.isArray(cookie.user)) {
    user = cookie.user[0];
  } else {
    user = cookie.user;
  }

  return (
    <Box
      sx={{
        width: "20%",
        height: "100%",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ebf5f9",
        borderRadius: "10px",
        boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
      }}
    >
      <Ul>
        {user.isCandidate && (
          <>
            <li>
              <Button
                component={Link}
                startIcon={<WorkIcon />}
                href="/jobList"
                sx={{
                  fontWeight: "300",
                  marginTop: "10%",
                  color: "black",
                  marginLeft: "15%",
                }}
              >
                <Typography mt={0.8}> Job List</Typography>
              </Button>
            </li>
            <li>
              <Button
                component={RouterLink}
                startIcon={<WorkHistoryIcon />}
                to="/applications"
                sx={{
                  fontWeight: "300",
                  marginTop: "10%",
                  color: "black",
                  marginLeft: "15%",
                }}
              >
                <Typography mt={0.8}>Your Applications</Typography>
              </Button>
            </li>
            <li>
              <Button
                component={RouterLink}
                startIcon={<BusinessIcon />}
                to="/matchingCompanies"
                sx={{
                  fontWeight: "300",
                  marginTop: "10%",
                  color: "black",
                  marginLeft: "15%",
                }}
              >
                <Typography mt={0.8}>Matching companies</Typography>
              </Button>
            </li>
            <li>
              <Button
                component={RouterLink}
                startIcon={<PersonIcon />}
                to="/candidate"
                sx={{
                  fontWeight: "300",
                  marginTop: "10%",
                  color: "black",
                  marginLeft: "15%",
                }}
              >
                <Typography mt={0.8}>Personal Profile</Typography>
              </Button>
            </li>
          </>
        )}
        {user.isCompany && (
          <>
            <li>
              <Button
                component={RouterLink}
                startIcon={<ViewListIcon />}
                to="/companyJobOffers"
                sx={{
                  fontWeight: "300",
                  marginTop: "10%",
                  color: "black",
                  marginLeft: "15%",
                }}
              >
                <Typography mt={0.8}>Job offers</Typography>
              </Button>
            </li>
            <li>
              <Button
                component={RouterLink}
                startIcon={<FiberNewIcon />}
                to="/addNewJobOffer"
                sx={{
                  fontWeight: "300",
                  marginTop: "10%",
                  color: "black",
                  marginLeft: "15%",
                }}
              >
                <Typography mt={0.8}>New job offer</Typography>
              </Button>
            </li>
            <li>
              <Button
                component={RouterLink}
                startIcon={<PeopleIcon />}
                to="/company"
                sx={{
                  fontWeight: "300",
                  marginTop: "10%",
                  color: "black",
                  marginLeft: "15%",
                }}
              >
                <Typography mt={0.8}>Company Profile</Typography>
              </Button>
            </li>
          </>
        )}
        <li>
          <Button
            component={RouterLink}
            startIcon={<LogoutIcon />}
            onClick={logout}
            to="/"
            sx={{
              fontWeight: "300",
              marginTop: "10%",
              color: "black",
              marginLeft: "15%",
            }}
          >
            <Typography mt={0.8}>Log Out</Typography>
          </Button>
        </li>
      </Ul>
    </Box>
  );
};

const Ul = styled("ul")({
  marginTop: "10%",
  display: "flex",
  listStyleType: "none",
  flexDirection: "column",
  color: "#565758",
});

export interface SideBarProps {
  logout: () => void;
}

export default SideBar;
