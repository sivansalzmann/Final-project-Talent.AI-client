import { useTheme, styled } from "@mui/material/styles";
import { Container, Grid, Link, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const FooterWrapper = styled("div")(({ theme }) => ({
  padding: "10px 0",
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  color: "#fff",
  background: theme.palette.secondary.dark,
}));

const FooterLink = styled(Link)({
  color: "#fff",
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none !important",
  opacity: "0.8",
  "& svg": {
    fontsize: "1.125rem",
    marginRight: 8,
  },
  "&:hover": {
    opacity: "1",
  },
});

const FooterPage = () => {
  const theme = useTheme();
  return (
    <FooterWrapper>
      <Container>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" color="white">
              Talent.AI
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid
              container
              alignItems="center"
              spacing={2}
              sx={{
                justifyContent: "flex-end",
                [theme.breakpoints.down("md")]: { justifyContent: "center" },
              }}
            >
              <Grid item>
                <FooterLink href="" target="_blank" underline="hover">
                  <InstagramIcon />
                  Blog
                </FooterLink>
              </Grid>
              <Grid item>
                <FooterLink href="" target="_blank" underline="hover">
                  <FacebookIcon />
                  Facebook
                </FooterLink>
              </Grid>
              <Grid item>
                <FooterLink href="" target="_blank" underline="hover">
                  <TwitterIcon />
                  Twitter
                </FooterLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </FooterWrapper>
  );
};

export default FooterPage;
