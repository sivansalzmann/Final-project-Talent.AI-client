// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  CardContent,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import MainCard from "../../ui-components/MainCard";
import { useEffect, useState } from "react";
import { Company } from "../../types/candidates-types";

const MatchingCompaniesList = () => {
  const theme = useTheme();
  const [companies, setCompanies] = useState<Company[]>();
  useEffect(() => {
    fetch(`http://localhost:3000/api/company`)
      .then((response) => response.json())
      .then((result) => {
        setCompanies(result);
      });
  }, [companies]);

  const iconSX = {
    fontSize: "0.875rem",
    marginRight: 0.2,
    verticalAlign: "sub",
  };

  return (
    <MainCard title="" content={false} sx={{ border: "1px solid #6288D8 " }}>
      <CardContent>
        <Grid container spacing={3} maxWidth={1200}>
          {companies?.map((company, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Grid container spacing={6}>
                  <Grid item>
                    <Box sx={{ position: "relative" }}>
                      <Avatar />
                    </Box>
                  </Grid>
                  <Grid item xs>
                    <Typography
                      align="left"
                      component="div"
                      variant="subtitle1"
                    >
                      {company.name}
                    </Typography>
                    <Typography
                      align="left"
                      component="div"
                      variant="subtitle2"
                    >
                      {company.industry}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="left" variant="caption">
                      <Link
                        href={company.linkedin_url}
                        variant="body2"
                        underline="none"
                      >
                        Linkedin page of {company.name}
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default MatchingCompaniesList;
