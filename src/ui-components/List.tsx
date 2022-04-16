import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Pagination,
  Typography,
} from "@mui/material";

// project imports
import ItemList from "./ItemsList";
import MainCard from "./MainCard";

// assets
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

// ==============================|| USER LIST STYLE 2 ||============================== //

const List = ({ jobs }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    // <MainCard
    //   title={
    //     <Grid
    //       container
    //       justifyContent="space-between"
    //       alignItems="center"
    //       spacing={3}
    //     >
    //       <Grid item>
    //         <Typography variant="h3">List</Typography>
    //       </Grid>
    //       <Grid item>
    //         <OutlinedInput
    //           id="input-search-list-style2"
    //           placeholder="Search"
    //           startAdornment={
    //             <InputAdornment position="start">
    //               <SearchIcon />
    //             </InputAdornment>
    //           }
    //           size="small"
    //         />
    //       </Grid>
    //     </Grid>
    //   }
    // >
    <>
      <ItemList jobs={jobs} />
      <Grid item xs={12} sx={{ mt: 1.75 }}>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item>
            {jobs.length > 2 && (
              <Pagination count={jobs.length / 2} color="primary" />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
    // </MainCard>
  );
};

export default List;
