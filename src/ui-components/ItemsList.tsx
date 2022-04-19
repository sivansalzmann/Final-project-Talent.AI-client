import React, { FC, useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  AvatarGroup,
  Box,
  Button,
  Grid,
  IconButton,
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
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import { JobOffer } from "../types/jobOffer-types";
import PositionCandidates from "../candidate/PositionCandidates";
import JobOfferInfo from "../job-offers/JobOfferInfo";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ItemsList = ({ jobs, company }) => {
  const update = {};
  const theme = useTheme();
  const handleEditJobOffer = (jobOffer: JobOffer, update: Object) => {
    fetch(`http://localhost:3000/api/joboffer/${jobOffer._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateJobOffer: update,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  const handleDeleteJobOffer = (jobOffer: JobOffer) => {
    fetch(`http://localhost:3000/api/joboffer/${jobOffer._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {});
  };
  return (
    <TableContainer>
      <Table
        sx={{
          "& td": {
            whiteSpace: "nowrap",
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
                  <div style={{ display: "flex" }}>
                    <div>
                      {job.job_company_name === "amazon" ? (
                        <Amazon style={{ width: 40, height: 40 }} />
                      ) : job.job_company_name === "google" ? (
                        <GoogleIcon sx={{ width: 40, height: 40 }} />
                      ) : job.job_company_name === "facebook" ? (
                        <FacebookIcon sx={{ width: 40, height: 40 }} />
                      ) : (
                        <Microsoft style={{ width: 40, height: 40 }} />
                      )}
                    </div>
                    <div>
                      <Typography
                        variant="h6"
                        ml={5}
                        mt={1}
                        fontWeight={550}
                        sx={{ fontFamily: "Anek Odia" }}
                      >
                        {job.job_title}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell width="50%">
                  <Box
                    ml={10}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "Anek Odia" }}
                        >
                          Role
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontFamily: "Anek Odia" }}
                        >
                          {job.job_title_role}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "Anek Odia" }}
                        >
                          Start date
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontFamily: "Anek Odia" }}
                        >
                          {job.job_start_date}
                        </Typography>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "Anek Odia" }}
                        >
                          Sub role
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontFamily: "Anek Odia" }}
                        >
                          {job.job_title_sub_role}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "Anek Odia" }}
                        >
                          Start date
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontFamily: "Anek Odia" }}
                        >
                          {job.job_start_date}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                </TableCell>
                <TableCell width="55%">
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    ml={10}
                  >
                    {!company && (
                      <JobOfferInfo jobOffer={job} infoTypeCard={false} />
                    )}

                    {!company ? (
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        size="small"
                        sx={{ maxWidth: 250 }}
                        startIcon={<BlockTwoToneIcon />}
                      >
                        Stop process
                      </Button>
                    ) : (
                      <Box display="flex" flexDirection="column">
                        <div style={{ display: "flex" }}>
                          <JobOfferInfo jobOffer={job} infoTypeCard={false} />
                          <PositionCandidates jobOffer={job} />
                        </div>

                        <div style={{ display: "flex" }}>
                          <Button
                            startIcon={<EditOutlinedIcon />}
                            sx={{ minWidth: 250 }}
                            size="small"
                            variant="outlined"
                            onClick={() => handleEditJobOffer(job, update)}
                          >
                            Edit
                          </Button>
                          <Button
                            startIcon={<DeleteOutlineOutlinedIcon />}
                            sx={{ minWidth: 250 }}
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteJobOffer(job)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Box>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsList;
