import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <FooterWrapper>
      <Typography variant="h5" color=" #1A3670" fontWeight={100} m={3}>
        Talent.AI
      </Typography>
      <Typography
        variant="subtitle1"
        fontWeight="100"
        fontSize="0.75rem"
        color="black"
        marginRight="1%"
        m={3}
      >
        &copy; Sivan Salzmann, Opal Peltzman, Guy Sharir
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
  justifyContent: "space-between",
}));

export default Footer;
