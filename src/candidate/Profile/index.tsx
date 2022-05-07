import { useState, SyntheticEvent, FC } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import CandidateProfile, { CandidateProfileProps } from "./CandidateProfile";
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
    <Grid container spacing={3} maxWidth={1200}>
      <Grid item xs={12}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="scrollable"
          sx={{
            mb: 3,
            "& a": {
              minHeight: "auto",
              minWidth: 10,
              py: 1.5,
              px: 1,
              mr: 2.25,
              color: theme.palette.grey[600],
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            },
            "& a.Mui-selected": {
              color: theme.palette.primary.main,
            },
            "& .MuiTabs-indicator": {
              bottom: 2,
            },
            "& a > svg": {
              marginBottom: "0px !important",
              mr: 1.25,
            },
          }}
        >
          {tabsOption.map((tab, index) => (
            <Tab
              key={index}
              component={Link}
              to="#"
              icon={tab.icon}
              label={tab.label}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
        <TabPanel value={value} index={0}>
          <CandidateProfile candidate={candidate} user={user} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export interface CandidateProfileIndexProps {
  candidate: Candidate;
  user: Cookie;
}

export default CandidateProfileIndex;
