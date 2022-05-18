import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";
import { useCookies } from "react-cookie";
import homePageImg from "../assets/home-page.png";

const HomePage: FC = () => {
  const [cookie] = useCookies(["user"]);

  let user: any = "";
  if (Array.isArray(cookie.user)) {
    user = cookie.user[0];
  } else {
    user = cookie.user;
  }

  return (
    <div
      style={{
        marginLeft: "15%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "fixed",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "100px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, translateY: 550 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 30,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.25rem", sm: "3rem", md: "4rem" },
                fontWeight: 900,
                lineHeight: 1.4,
              }}
            >
              Make hiring easier than
              <Box component="span" sx={{ ml: 2, color: "#6288D8" }}>
                before
              </Box>
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateY: 550 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 30,
              delay: 0.2,
            }}
          >
            <Typography
              variant="h4"
              component="div"
              color="inherit"
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                fontWeight: 400,
                lineHeight: 1.4,
                width: "350px",
              }}
            >
              Find your new job place or your new employees in easy and
              convenient way than ever before!
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateY: 550 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 30,
              delay: 0.4,
            }}
          >
            {!user ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "5%",
                  width: "350px",
                }}
              >
                <Button
                  component={RouterLink}
                  to="/loginCandidate"
                  variant="contained"
                  color="primary"
                >
                  Start as candidate
                </Button>
                <Button
                  component={RouterLink}
                  to="/loginCompany"
                  variant="contained"
                  color="primary"
                >
                  Start as company
                </Button>
              </div>
            ) : user.candidate ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "5%",
                  width: "350px",
                }}
              >
                <Button
                  component={RouterLink}
                  to="/candidate"
                  variant="contained"
                  color="primary"
                >
                  Personal profile
                </Button>
                <Button
                  component={RouterLink}
                  to="/candidate"
                  variant="contained"
                  color="primary"
                >
                  Matching companies
                </Button>
              </div>
            ) : (
              user.company && (
                <Button
                  component={RouterLink}
                  to="/company"
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Company profile
                </Button>
              )
            )}
          </motion.div>
        </div>
        <HeaderImage src={homePageImg} />
      </div>
    </div>
  );
};

const HeaderImage = styled("img")(() => ({
  marginRight: "10%",
  width: "auto",
  height: "70%",
}));

export default HomePage;
