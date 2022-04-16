import { useTheme, styled } from "@mui/material/styles";
import { Container, Grid, Link, Typography } from "@mui/material";

const FooterWrapper = styled("div")(({ theme }) => ({
  padding: "10px 0",
  position: "fixed",
  bottom: "0",
  width: "100%",
  color: "#fff",
  background: "#6288D8",
}));

const FooterPage = () => {
  return (
    <FooterWrapper>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography
          variant="subtitle1"
          fontWeight="100"
          color="white"
          marginRight="1%"
        >
          &copy; Talent.AI
        </Typography>
      </div>
    </FooterWrapper>
  );
};

export default FooterPage;
