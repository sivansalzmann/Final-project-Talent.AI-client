import { Link as RouterLink } from "react-router-dom";
import { useTheme, styled } from "@mui/material/styles";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AnimateButton from "../ui-components/AnimateButton";
import dashboard from "../assets/dashboard-img1.png";
import { FC } from "react";
import { useCookies } from "react-cookie";
import homePageImg from "../assets/home-page.gif";

const HomePage: FC = () => {
  const theme = useTheme();
  const [cookie] = useCookies(["user"]);

  let user: any = "";
  if (Array.isArray(cookie.user)) {
    user = cookie.user[0];
  } else {
    user = cookie.user;
  }

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={20}
      >
        <Grid item xs={12} md={5}>
          <Grid
            container
            spacing={5}
            sx={{
              pr: 10,
              [theme.breakpoints.down("lg")]: { pr: 0, textAlign: "center" },
            }}
          >
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
                  }}
                >
                  Find your new job place or your new employees in easy and
                  convenient way than ever before
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} sx={{ my: 3.25 }}>
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
                <Grid
                  container
                  spacing={2}
                  sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
                >
                  <Grid item>
                    <AnimateButton>
                      {!user ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "300px",
                          }}
                        >
                          <Button
                            component={RouterLink}
                            to="/loginCandidate"
                            target="_blank"
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            Start as candidate
                          </Button>
                          <Button
                            component={RouterLink}
                            to="/setCompany"
                            target="_blank"
                            size="small"
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
                            width: "300px",
                          }}
                        >
                          <Button
                            component={RouterLink}
                            to="/candidate"
                            target="_blank"
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            Personal profile
                          </Button>
                          <Button
                            component={RouterLink}
                            to="/candidate"
                            target="_blank"
                            size="small"
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
                            target="_blank"
                            size="large"
                            variant="contained"
                            color="primary"
                          >
                            Company profile
                          </Button>
                        )
                      )}
                    </AnimateButton>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} sx={{ display: { xs: "none", md: "flex" } }}>
          <Box sx={{ position: "relative", mt: 8.75 }}>
            <HeaderImage src={homePageImg} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const HeaderImage = styled("img")(() => ({
  maxWidth: "80%",
  borderRadius: "20px",
  transform: "scale(1.7)",
  right: "0px",
}));

export default HomePage;
