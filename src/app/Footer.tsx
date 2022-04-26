import { useTheme, styled } from "@mui/material/styles";
import { Container, Grid, Link, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const FooterWrapper = styled("div")(({ theme }) => ({
  padding: "15px 0",
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  color: "black",
  background: "#ebf5f9",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const FooterLink = styled(Link)({
  color: "black",
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

const Footer = () => {
  const theme = useTheme();
  return (
    <FooterWrapper>
      <Container>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h3" color="black" fontWeight={300}>
              Talent.AI
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
