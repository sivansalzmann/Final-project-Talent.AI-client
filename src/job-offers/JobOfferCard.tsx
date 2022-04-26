import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { JobOffer } from "../types/jobOffer-types";
import { Divider } from "@mui/material";
import JobOfferInfo from "./JobOfferInfo";
import { Candidate } from "../types/candidates-types";

const JobOfferCard: FC<JobOfferCardProps> = ({ jobOffer, candidate }) => {
  const handleUpdateJobOffer = (jobOffer: JobOffer) => {
    fetch(`http://localhost:3000/api/joboffer/${jobOffer._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateJobOffer: { candidates_id: candidate?._id },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert("Good luck!");
      });
  };
  return (
    <Card
      sx={{
        width: 300,
        minHeight: 350,
        border: "1px solid #6288D8 ",
        borderRadius: "10px",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" fontWeight="550" component="div">
          {jobOffer.job_title}
        </Typography>
        <Typography component="div" variant="body2" color="text.secondary">
          <h2 style={{ fontWeight: "700", fontSize: "big" }}>
            {jobOffer.job_company_id}
          </h2>
          <br />
          <p style={{ fontWeight: "600" }}>
            {jobOffer.job_title_role},{jobOffer.job_title_sub_role}
          </p>
          <p style={{ fontWeight: "500" }}>{jobOffer.job_start_date}</p>
          <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small" onClick={() => handleUpdateJobOffer(jobOffer)}>
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
