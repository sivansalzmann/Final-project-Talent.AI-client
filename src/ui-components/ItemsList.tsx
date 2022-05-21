import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import { ReactComponent as Amazon } from "../assets/icons8-amazon.svg";
import { ReactComponent as Microsoft } from "../assets/icons8-microsoft.svg";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import { JobOffer } from "../types/jobOffer-types";
import PositionCandidates from "../candidate/PositionCandidates";
import JobOfferInfo from "../job-offers/JobOfferInfo";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Candidate } from "../types/candidates-types";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { styled } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";

const ItemsList: FC<ItemsListProps> = ({
  jobs,
  candidates,
  company,
  candidate,
  matching,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleStopProcess = (jobOffer: JobOffer, candidate: Candidate) => {
    const candidates_id_new = jobOffer.candidates_id.filter(function (item) {
      return item !== candidate._id;
    });
    fetch(`${process.env.SERVER}/api/joboffer/${jobOffer._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateJobOffer: { candidates_id_new: candidates_id_new },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        navigate("/candidate");
      });
  };

  const handleDeleteJobOffer = (jobOffer: JobOffer) => {
    fetch(`${process.env.SERVER}/api/joboffer/${jobOffer._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        alert("Job offer successfully deleted!");
        window.location.reload();
      });
  };
  return (
    <>
      {(jobs && jobs.length > 0) || company ? (
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
              {jobs &&
                jobs.map((job, index) => {
                  return (
                    <TableRow
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "1%",
                      }}
                    >
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
                          <Typography
                            variant="h6"
                            ml={5}
                            mt={1}
                            fontWeight={550}
                          >
                            {job.job_title}
                            {job.status !== undefined && (
                              <Chip
                                sx={{ marginLeft: "10px" }}
                                variant="outlined"
                                size="small"
                                label={job.status}
                                color={
                                  job.status === "Waiting"
                                    ? "primary"
                                    : job.status === "In progress"
                                      ? "success"
                                      : "error"
                                }
                              />
                            )}
                          </Typography>
                        </div>
                        <Box
                          ml={10}
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          width="40%"
                        >
                          <RowDivMargin>
                            <div>
                              <Typography variant="caption">Role</Typography>
                              <Typography variant="subtitle1">
                                {job.job_title_role}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="caption">
                                Start date
                              </Typography>
                              <Typography variant="subtitle1">
                                {job.job_start_date}
                              </Typography>
                            </div>
                          </RowDivMargin>
                          <RowDivMargin>
                            <div>
                              <Typography variant="caption">
                                Department
                              </Typography>
                              <Typography variant="subtitle1">
                                {job.job_title_sub_role}
                              </Typography>
                            </div>
                          </RowDivMargin>
                        </Box>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "40%",
                            marginTop: "1%",
                          }}
                          ml={10}
                        >
                          {!company && (
                            <JobOfferInfo jobOffer={job} infoTypeCard={false} />
                          )}

                          {!company && candidate ? (
                            <Button
                              variant="outlined"
                              color="error"
                              fullWidth
                              size="small"
                              sx={{ maxWidth: 250, margin: "5px" }}
                              startIcon={<BlockTwoToneIcon />}
                              onClick={() => handleStopProcess(job, candidate)}
                            >
                              Stop process
                            </Button>
                          ) : (
                            <Box display="flex" flexDirection="column">
                              <div style={{ display: "flex" }}>
                                <JobOfferInfo
                                  jobOffer={job}
                                  infoTypeCard={false}
                                />
                                <PositionCandidates jobOffer={job} />
                              </div>

                              <div style={{ display: "flex" }}>
                                <Button
                                  startIcon={<DeleteOutlineOutlinedIcon />}
                                  sx={{ minWidth: 250, margin: "5px" }}
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
              {candidates &&
                candidates.map((candidate: Candidate, index) => {
                  return (
                    <TableRow
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "1%",
                      }}
                    >
                      <TableCell sx={{ marginLeft: "1%" }}>
                        <RowDiv>
                          <Avatar />
                          <Typography
                            variant="h6"
                            component="div"
                            ml={5}
                            mt={1}
                            fontWeight={550}
                          >
                            {candidate.full_name}
                          </Typography>
                        </RowDiv>
                        <Box
                          mt={2}
                          ml={10}
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          width="80%"
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "40%",
                            }}
                          >
                            <div>
                              <Typography variant="caption">Gender</Typography>
                              <Typography variant="subtitle1">
                                {candidate.gender}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="caption">
                                Current Company
                              </Typography>
                              <Typography variant="subtitle1">
                                {candidate.job_company_name}
                              </Typography>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "40%",
                            }}
                          >
                            <div>
                              <Typography variant="caption">
                                Industry
                              </Typography>
                              <Typography variant="subtitle1">
                                {candidate.industry}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="caption">
                                Current position
                              </Typography>
                              <Typography variant="subtitle1">
                                {candidate.job_title_role} ,
                                {candidate.job_title_sub_role}
                              </Typography>
                            </div>
                          </div>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">
            You dont have applications yet :(
          </Typography>
          <Button
            component={RouterLink}
            to="/jobList"
            variant="contained"
            sx={{ marginTop: "20px" }}
          >
            Press here to apply to some new offers!
          </Button>
        </div>
      )}
    </>
  );
};

const RowDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
});

const RowDivMargin = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});
export interface ItemsListProps {
  jobs?: JobOffer[];
  candidates?: Candidate[];
  company?: boolean;
  candidate?: Candidate;
  matching?: boolean;
}

export default ItemsList;
