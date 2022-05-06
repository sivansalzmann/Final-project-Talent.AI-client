import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { FC } from "react";

const FooterPage: FC = () => {
  return (
    <FooterWrapper>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography
          variant="subtitle1"
          fontWeight="100"
          color="black"
          marginRight="1%"
        >
          &copy; Talent.AI
        </Typography>
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled("div")({
  padding: "10px 0",
  position: "fixed",
  bottom: "0",
  width: "100%",
  color: "black",
  background: "#ebf5f9",
});

export default FooterPage;
