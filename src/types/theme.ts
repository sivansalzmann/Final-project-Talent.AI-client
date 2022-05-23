import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Anek Odia",
      color: "#565758",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          width: "35ch",
        },
      },
    },
  },
});
