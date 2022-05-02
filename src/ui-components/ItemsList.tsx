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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Candidate } from "../types/candidates-types";
import { useNavigate } from "react-router-dom";
import PopupForm from "../ui-components/PopupForm";

const ItemsList = ({ jobs, candidates, company, candidate }) => {
  const update = {};
  const theme = useTheme();
  const navigate = useNavigate();

  const handleStopProcess = (jobOffer: JobOffer, candidate: Candidate) => {
    const candidates_id_new = jobOffer.candidates_id.filter(function (item) {
      return item !== candidate._id;
    });
    fetch(`http://localhost:3000/api/joboffer/${jobOffer._id}`, {
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
          {jobs &&
            jobs.map((job) => {
              return (
                <TableRow
                  key={job.job_company_id}
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
                        sx={{ fontFamily: "Anek Odia" }}
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
                            variant="subtitle1"
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
                            variant="subtitle1"
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
                            Department
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontFamily: "Anek Odia" }}
                          >
                            {job.job_title_sub_role}
                          </Typography>
                        </div>
                      </div>
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

                      {!company ? (
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
                            <JobOfferInfo jobOffer={job} infoTypeCard={false} />
                            <PositionCandidates jobOffer={job} />
                          </div>

                          <div style={{ display: "flex" }}>
                            {/* <PopupForm editJobOffer={true} jobOffer={job} /> */}
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
            candidates.map((candidate: Candidate) => {
              return (
                <TableRow
                  key={candidate._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "1%",
                  }}
                >
                  <TableCell sx={{ marginLeft: "1%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Avatar />
                      <Typography
                        variant="h6"
                        component="div"
                        ml={5}
                        mt={1}
                        fontWeight={550}
                        sx={{ fontFamily: "Anek Odia" }}
                      >
                        {candidate.full_name}
                      </Typography>
                    </div>
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
                          <Typography
                            variant="caption"
                            sx={{ fontFamily: "Anek Odia" }}
                          >
                            Gender
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontFamily: "Anek Odia" }}
                          >
                            {candidate.gender}
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            variant="caption"
                            sx={{ fontFamily: "Anek Odia" }}
                          >
                            Current Company
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontFamily: "Anek Odia" }}
                          >
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
                          <Typography
                            variant="caption"
                            sx={{ fontFamily: "Anek Odia" }}
                          >
                            Industry
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontFamily: "Anek Odia" }}
                          >
                            {candidate.industry}
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            variant="caption"
                            sx={{ fontFamily: "Anek Odia" }}
                          >
                            Current position
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontFamily: "Anek Odia" }}
                          >
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
  );
};

export default ItemsList;
