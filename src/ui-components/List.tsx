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

const List = ({ jobs, company }) => {
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
    <>
      <ItemList jobs={jobs} company={company} />
    </>
    // </MainCard>
  );
};

export default List;
