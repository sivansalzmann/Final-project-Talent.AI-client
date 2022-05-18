import { styled } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <FooterWrapper>
      <Typography variant="h5" color=" #1A3670" fontWeight="bold" m={3}>
        Talent.AI
      </Typography>
    </FooterWrapper>
  );
};

const FooterWrapper = styled("div")(() => ({
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  height: "10%",
  color: "black",
  background: "#ebf5f9",
  display: "flex",
}));

export default Footer;
