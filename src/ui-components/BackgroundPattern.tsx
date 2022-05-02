import { ReactElement } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// assets
import AuthPattern from "assets/images/auth/img-a2-grid.svg";
import AuthPatternDark from "assets/images/auth/img-a2-grid-dark.svg";

// ===========================|| BACKGROUND GRID PATTERN 2 ||=========================== //

const BackgroundPattern = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const theme = useTheme();
  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        minHeight: "100%",
        height: "100vh",
        bgcolor: "#fff",
        backgroundImage: `url(${AuthPattern})`,
        position: "absolute",
        backgroundPosition: "bottom left",
        backgroundRepeat: "no-repeat",
        // backgroundSize: 'cover',
        overflow: "hidden",
        m: "0 0 0 auto",
        p: "100px 0",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        "& > *": {
          position: "relative",
          zIndex: 5,
        },
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          bottom: 0,
          opacity: 0.9,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundPattern;
