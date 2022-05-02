import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Anek Odia",
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
