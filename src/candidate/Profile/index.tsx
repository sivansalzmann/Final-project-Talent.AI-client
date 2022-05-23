import { useState, SyntheticEvent, FC } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import CandidateProfile from "./CandidateProfile";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { TabsProps } from "../../types/helpers";
import { Candidate } from "../../types/candidates-types";
import { Cookie } from "universal-cookie";

const TabPanel = ({ children, value, index, ...other }: TabsProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const tabsOption = [
  {
    label: "Profile",
    icon: <AccountCircleTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
  },
];

const CandidateProfileIndex: FC<CandidateProfileIndexProps> = ({
  candidate,
  user,
}) => {
  const theme = useTheme();
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container maxWidth={1200}>
      <CandidateProfile candidate={candidate} user={user} />
    </Grid>
  );
};

export interface CandidateProfileIndexProps {
  candidate: Candidate;
  user: Cookie;
}

export default CandidateProfileIndex;
