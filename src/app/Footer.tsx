import { styled } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";
import { FC } from "react";

const Footer: FC = () => {
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

export default Footer;
