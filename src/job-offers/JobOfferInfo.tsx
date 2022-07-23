import React, { FC } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { JobOffer } from "../types/jobOffer-types";
import DescriptionIcon from "@mui/icons-material/Description";
import { capitalizeFirstLetter } from "../app-utils";

const JobOfferInfo: FC<JobOfferInfoProps> = ({ jobOffer, infoTypeCard }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {!infoTypeCard ? (
        <Button
          variant="outlined"
          size="small"
          startIcon={<DescriptionIcon />}
          sx={{ minWidth: 250, margin: "5px" }}
          onClick={handleClickOpen}
        >
          About the position
        </Button>
      ) : (
        <Button size="medium" onClick={handleClickOpen}>
          Learn More
        </Button>
      )}

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        sx={{ overflow: "hidden" }}
        aria-labelledby="responsive-dialog-title"
      >
        {open && (
          <div style={{ overflowX: "hidden" }}>
            <DialogTitle id="responsive-dialog-title">
              {capitalizeFirstLetter(jobOffer.job_title)}
            </DialogTitle>
            <Divider />
            <DialogContent>
              <Typography variant="body1" color="black">
                <b>Job title:</b>
              </Typography>
              <Typography variant="body2" mb={1}>
                {capitalizeFirstLetter(jobOffer.job_title)}
              </Typography>
              <Typography variant="body1" color="black">
                <b>Industry:</b>
              </Typography>
              <Typography variant="body2" mb={1}>
                {jobOffer.industry}
              </Typography>
              {jobOffer.job_title_levels && (
                <div style={{ marginBottom: "10px" }}>
                  <Typography variant="body1" color="black">
                    <b>Levels:</b>
                  </Typography>
                  {jobOffer.job_title_levels.map((level, index) => {
                    return (
                      <Typography variant="body2" key={index}>
                        {level}
                      </Typography>
                    );
                  })}
                </div>
              )}
              <Typography variant="body1" color="black">
                <b>Job start date:</b>
              </Typography>
              <Typography variant="body2" mb={1}>
                {jobOffer.job_start_date}
              </Typography>
              <Typography variant="body1" color="black">
                <b>Experience:</b>
              </Typography>
              {jobOffer.experience.map((exp, index) => {
                return (
                  <div key={index}>
                    {exp.title_name && (
                      <>
                        <Typography variant="body2" color="black" mt={1}>
                          <b>Job title name:</b>
                        </Typography>
                        <Typography variant="body2" mb={1}>
                          {exp.title_name}
                        </Typography>
                      </>
                    )}
                    {exp.title_role && (
                      <>
                        <Typography variant="body2" color="black">
                          <b>Job title role:</b>
                        </Typography>
                        <Typography variant="body2" mb={1}>
                          {exp.title_role}
                        </Typography>
                      </>
                    )}
                    {exp.title_levels.length > 0 && (
                      <>
                        <Typography variant="body2" color="black">
                          <b>Levels:</b>
                        </Typography>
                        {exp.title_levels.map((level) => {
                          return (
                            <Typography variant="body2" mb={1} key={level}>
                              {level}
                            </Typography>
                          );
                        })}
                      </>
                    )}
                    <Divider />
                  </div>
                );
              })}
              <Typography variant="body1" color="black" mt={1}>
                <b>Skills:</b>
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div>
                  {jobOffer.skills
                    .slice(0, jobOffer.skills.length / 2)
                    .map((skill, index) => {
                      return (
                        <Typography variant="subtitle2" key={index}>
                          {skill}
                        </Typography>
                      );
                    })}
                </div>
                <div style={{ marginLeft: "15%" }}>
                  {jobOffer.skills
                    .slice(jobOffer.skills.length / 2, jobOffer.skills.length)
                    .map((skill, index) => {
                      return (
                        <Typography variant="subtitle2" key={index}>
                          {skill}
                        </Typography>
                      );
                    })}
                </div>
              </div>
              {jobOffer.job_description && (
                <>
                  <Typography variant="body1" color="black" mt={1}>
                    <b>Description:</b>
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ width: "50%" }}
                    mt={0.5}
                  >
                    {jobOffer.job_description}
                  </Typography>
                </>
              )}
            </DialogContent>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default JobOfferInfo;

interface JobOfferInfoProps {
  jobOffer: JobOffer;
  infoTypeCard: boolean;
}
