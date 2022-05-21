import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { JobOffer } from "../types/jobOffer-types";
import JobOfferInfo from "./JobOfferInfo";
import { Candidate } from "../types/candidates-types";
import { useNavigate } from "react-router-dom";

const JobOfferCard: FC<JobOfferCardProps> = ({ jobOffer, candidate }) => {
  const navigate = useNavigate();

  const handleUpdateJobOffer = (jobOffer: JobOffer) => {
    let status = "";
    if (jobOffer.status === "Waiting") status = "In progress";
    else status = jobOffer.status;

    const update = {
      candidates_id: candidate?._id,
      status: status,
    };
    fetch(`${process.env.REACT_APP_SERVER}/api/joboffer/${jobOffer._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateJobOffer: update,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        alert("Good luck!");
        navigate("/applications");
      });
  };
  return (
    <Card
      sx={{
        width: 300,
        minHeight: 350,
        border: "1px solid #6288D8 ",
        borderRadius: "10px",
        margin: "1%",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          component="div"
          color="#6288D9"
        >
          {jobOffer.job_title}
        </Typography>
        <Typography component="div" variant="body2" color="text.secondary">
          <h2 style={{ fontWeight: "700" }}>{jobOffer.job_company_id}</h2>
          <br />
          <h3 style={{ fontWeight: "600" }}>
            {jobOffer.job_title_role}, {jobOffer.job_title_sub_role}
          </h3>
          <p style={{ fontWeight: "500", marginTop: "5px" }}>
            start date: {jobOffer.job_start_date}
          </p>
          <br />
          {jobOffer.job_description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          marginLeft: "10%",
        }}
      >
        <Button size="medium" onClick={() => handleUpdateJobOffer(jobOffer)}>
          Apply Now
        </Button>
        <JobOfferInfo jobOffer={jobOffer} infoTypeCard={true} />
      </CardActions>
    </Card>
  );
};

export interface JobOfferCardProps {
  jobOffer: JobOffer;
  candidate: Candidate;
}

export default JobOfferCard;
