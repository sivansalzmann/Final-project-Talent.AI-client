import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Link } from "@mui/material";
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
  if (cookie.user[0]) user = cookie.user[0];
  if (cookie.user) user = cookie.user;

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
      <Ul>
        {user.candidate && (
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
                Job List
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
                Your Applications
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
                Matching companies
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
                Personal Profile
              </Button>
            </li>
          </>
        )}
        {user.company && (
          <>
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
                Company Profile
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
                New job offer
              </Button>
            </li>
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
                Job offers
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
            Log Out
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
});

export interface SideBarProps {
  logout: () => void;
}

export default SideBar;
