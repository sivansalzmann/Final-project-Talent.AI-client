import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { GenericCardProps } from "../types/helpers";

interface RevenueCardProps extends GenericCardProps {}

const AddNewJobOffer = ({ primary, iconPrimary, color }: RevenueCardProps) => {
  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down("sm"));

  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

  return (
    <Card sx={{ background: color, position: "relative", color: "#fff" }}>
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            right: 13,
            top: 14,
            color: "#fff",
            "&> svg": { width: 300, height: 100, opacity: "0.5" },
            [theme.breakpoints.down("sm")]: {
              top: 13,
              "&> svg": { width: 80, height: 80 },
            },
          }}
        >
          {primaryIcon}
        </Typography>
        <Grid container direction={matchDownXs ? "column" : "row"} spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5" color="inherit">
              {primary}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AddNewJobOffer;
