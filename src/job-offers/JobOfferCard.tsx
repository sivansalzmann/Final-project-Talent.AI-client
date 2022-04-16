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

const JobOfferCard: FC<JobOfferCardProps> = ({ jobOffer }) => {
  return (
    <Card sx={{ width: 300, height: 280 }}>
      <CardMedia
        component="img"
        height="150"
        width="50"
        image={require(`../assets/${jobOffer.job_company_name}.jpeg`)}
        alt={jobOffer.job_company_name}
      />
      <Divider />
      <CardContent>
        <Typography gutterBottom variant="h6" fontWeight="300" component="div">
          {jobOffer.job_title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {jobOffer.education}
          {/* change to description */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Apply Now</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export interface JobOfferCardProps {
  jobOffer: JobOffer;
}

export default JobOfferCard;
