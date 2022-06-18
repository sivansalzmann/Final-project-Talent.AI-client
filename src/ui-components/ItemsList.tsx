import {
  Avatar,
  Box,
  Button,
  Typography,
  Chip,
  Divider,
  Link,
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
import { FC, useState } from "react";
import { styled } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { capitalizeFirstLetter } from "../app-utils";
import WarningPopUp from "./warningPopUp";
import PopUpForms from "../candidate/Forms/PopupForm";
import CandidatePopUp from "./CandidatePopUp";
const ItemsList: FC<ItemsListProps> = ({
  jobs,
  candidates,
  company,
  candidate,
  buttons,
}) => {
  const navigate = useNavigate();
  const [openCandidateProf, setcandidateProf] = useState(false);
  const [chooseCandidate, setChooseCandidate] = useState<Candidate>();
  const handleStopProcess = (jobOffer: JobOffer, candidate: Candidate) => {
    const candidates_id_new = jobOffer.candidates_id.filter(function (item) {
      return item !== candidate._id;
    });
    console.log(candidates_id_new);
    fetch(`${process.env.REACT_APP_SERVER}/api/joboffer/${jobOffer._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateJobOffer: { candidates_id_new: candidates_id_new },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate("/candidate");
      });
  };
  const [msg, setMsg] = useState(false);

  const handleDeleteJobOffer = (jobOffer: JobOffer) => {
    fetch(`${process.env.REACT_APP_SERVER}/api/joboffer/${jobOffer._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        setMsg(true);
      });
  };

  const handleCloseMsg = () => {
    setMsg(false);
  };

  const handleClosePopUp = () => {
    setcandidateProf(false);
  };

  const nevigateToPage = () => {
    window.location.reload();
  };

  const handleClickPopUp = (candidate: Candidate) => {
    setcandidateProf(true);
    setChooseCandidate(candidate);
  };
  return (
    <>
      {(jobs && jobs.length > 0) || company ? (
        <div>
          {jobs &&
            jobs.map((job, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "1%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "30px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Typography variant="h6" fontWeight={550} mb={2} mt={1}>
                        {capitalizeFirstLetter(job.job_title)} ,
                        {capitalizeFirstLetter(job.job_company_name)}
                      </Typography>
                    </div>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      width="60%"
                    >
                      <RowDivMargin>
                        <div>
                          <Typography variant="subtitle1" color="black">
                            <b>Job title</b>
                          </Typography>
                          <Typography variant="subtitle2">
                            {capitalizeFirstLetter(job.job_title)}
                          </Typography>
                        </div>
                        {buttons && (
                          <div>
                            <Typography variant="subtitle1" color="black">
                              <b>Start date</b>
                            </Typography>
                            <Typography variant="subtitle2">
                              {job.job_start_date}
                            </Typography>
                          </div>
                        )}
                      </RowDivMargin>
                      <RowDivMargin>
                        <div>
                          <Typography variant="subtitle1" color="black" mt={2}>
                            <b>Job title sub role</b>
                          </Typography>
                          <Typography variant="subtitle2">
                            {capitalizeFirstLetter(job.job_title_role)}
                          </Typography>
                        </div>
                      </RowDivMargin>
                    </Box>
                  </div>

                  {!company && candidate ? (
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "65%",
                        marginTop: "2%",
                        marginLeft: "1%",
                      }}
                    >
                      <JobOfferInfo jobOffer={job} infoTypeCard={false} />

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
                    </Box>
                  ) : (
                    buttons && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "80%",
                          marginTop: "2%",
                        }}
                      >
                        <JobOfferInfo jobOffer={job} infoTypeCard={false} />
                        <PositionCandidates jobOffer={job} />
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
                        <PopUpForms
                          editJobOffer
                          jobOffer={job}
                          handleClose={function (): void {
                            throw new Error("Function not implemented.");
                          }}
                        />
                      </div>
                    )
                  )}
                  <Divider sx={{ marginTop: "2%" }} />
                </div>
              );
            })}
          {candidates &&
            candidates.map((candidate: Candidate, index) => {
              return (
                <Link
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "2%",
                    marginLeft: "10%",
                    width: "80%",
                  }}
                  href="#"
                  underline="none"
                  onClick={() => handleClickPopUp(candidate)}
                >
                  <Typography variant="h5" mb={1} fontWeight={600} ml={-3}>
                    {index + 1}.&nbsp;{" "}
                    {capitalizeFirstLetter(candidate.first_name) +
                      " " +
                      capitalizeFirstLetter(candidate.last_name)}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "1%",
                        display: "flex",
                        flexDirection: "column",
                        width: "150px",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="black"
                      >
                        Gender
                      </Typography>
                      <Typography variant="subtitle1">
                        {capitalizeFirstLetter(candidate.gender)}
                      </Typography>
                    </div>

                    <div
                      style={{
                        marginBottom: "1%",
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "60%",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="black"
                      >
                        Current Company
                      </Typography>
                      <Typography variant="subtitle1">
                        {capitalizeFirstLetter(candidate.job_company_name)}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "1%",
                        display: "flex",
                        flexDirection: "column",
                        width: "150px",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="black"
                      >
                        Industry
                      </Typography>
                      <Typography variant="subtitle1">
                        {capitalizeFirstLetter(candidate.industry)}
                      </Typography>
                    </div>
                    <div
                      style={{
                        marginBottom: "1%",
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "60%",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="black"
                      >
                        Current position
                      </Typography>
                      <Typography variant="subtitle1">
                        {capitalizeFirstLetter(candidate.job_title_role)} ,
                        {capitalizeFirstLetter(candidate.job_title_sub_role)}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "1%",
                        display: "flex",
                        flexDirection: "column",
                        width: "150px",
                      }}
                    >
                      {candidate.job_title_levels.length > 0 && (
                        <>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="black"
                          >
                            Levels
                          </Typography>
                          {candidate.job_title_levels.map((level) => {
                            return (
                              <Typography variant="subtitle1">
                                {capitalizeFirstLetter(level)}
                              </Typography>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </div>
                  <Divider sx={{ marginTop: "2%" }} />
                </Link>
              );
            })}
        </div>
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
            Check new job offers
          </Button>
        </div>
      )}
      {msg && (
        <WarningPopUp
          title="Delete job offer"
          open={msg}
          handleClose={handleCloseMsg}
          message="Job offer successfully deleted!"
          action={nevigateToPage}
        />
      )}
      {openCandidateProf && chooseCandidate && (
        <CandidatePopUp
          open={openCandidateProf}
          handleClose={handleClosePopUp}
          candidate={chooseCandidate}
        />
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
  width: "86%",
});

export interface ItemsListProps {
  jobs?: JobOffer[];
  candidates?: Candidate[];
  company?: boolean;
  candidate?: Candidate;
  buttons?: boolean;
  setGender?: (gender: boolean) => void;
  setAge?: (age: boolean) => void;
}

export default ItemsList;
