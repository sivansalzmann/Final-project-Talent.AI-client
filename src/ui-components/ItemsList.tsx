import React, { FC, useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  AvatarGroup,
  Button,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactComponent as Amazon } from "../assets/icons8-amazon.svg";
import { ReactComponent as Microsoft } from "../assets/icons8-microsoft.svg";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChatBubbleTwoToneIcon from "@mui/icons-material/ChatBubbleTwoTone";
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import { JobOffer } from "../types/jobOffer-types";

// ==============================|| USER LIST 2 ||============================== //

const ItemsList: FC<ItemsListProps> = ({ jobs }) => {
  const theme = useTheme();

  return (
    <TableContainer>
      <Table
        sx={{
          "& td": {
            whiteSpace: "nowrap",
          },
          "& td:first-of-type": {
            pl: 0,
          },
          "& td:last-of-type": {
            pr: 0,
            minWidth: 260,
          },
          "& tbody tr:last-of-type  td": {
            borderBottom: "none",
          },
          [theme.breakpoints.down("xl")]: {
            "& tr:not(:last-of-type)": {
              borderBottom: "1px solid",
              borderBottomColor: "rgba(224, 224, 224, 1)",
            },
            "& td": {
              display: "inline-block",
              borderBottom: "none",
              pl: 0,
            },
            "& td:first-of-type": {
              display: "block",
            },
          },
        }}
      >
        <TableBody>
          {jobs.map((job) => {
            return (
              <TableRow key={job.job_company_id}>
                <TableCell>
                  <Grid container spacing={2}>
                    <Grid item>
                      {job.job_company_name === "amazon" ? (
                        <Amazon style={{ width: 40, height: 40 }} />
                      ) : job.job_company_name === "google" ? (
                        <GoogleIcon sx={{ width: 40, height: 40 }} />
                      ) : job.job_company_name === "facebook" ? (
                        <FacebookIcon sx={{ width: 40, height: 40 }} />
                      ) : (
                        <Microsoft style={{ width: 40, height: 40 }} />
                      )}
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography align="left" variant="subtitle1">
                            {job.job_title}
                            {job.status === "In Progress" && (
                              <CheckCircleIcon
                                sx={{
                                  color: "success.dark",
                                  width: 14,
                                  height: 14,
                                }}
                              />
                            )}
                          </Typography>
                          <Typography
                            align="left"
                            variant="subtitle2"
                            sx={{ whiteSpace: "break-spaces" }}
                          >
                            {job.job_title}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            align="left"
                            variant="body2"
                            sx={{ whiteSpace: "break-spaces" }}
                          >
                            {job.last_name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="caption">Role</Typography>
                      <Typography variant="subtitle2">
                        {job.job_title_role}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption">Sub role</Typography>
                      <Typography variant="subtitle2">
                        {job.job_title_sub_role}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="caption">Start date</Typography>
                      <Typography variant="subtitle2">
                        {job.job_start_date}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" spacing={3}>
                        <Grid item>
                          <Typography variant="caption">Progress</Typography>
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <LinearProgress
                            variant="determinate"
                            value={56}
                            color="primary"
                            sx={{ minWidth: 90 }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="h6" component="div">
                            {/* {row.progressValue} */}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} container spacing={1}>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={{ minWidth: 120 }}
                          startIcon={<ChatBubbleTwoToneIcon />}
                        >
                          Message
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          color="error"
                          fullWidth
                          size="small"
                          sx={{ minWidth: 120 }}
                          startIcon={<BlockTwoToneIcon />}
                        >
                          Block
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export interface ItemsListProps {
  jobs: JobOffer[];
}

export default ItemsList;
