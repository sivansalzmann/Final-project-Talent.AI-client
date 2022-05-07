import React, { FC } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { JobOffer } from "../types/jobOffer-types";
import DescriptionIcon from "@mui/icons-material/Description";

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
        <Button size="small" onClick={handleClickOpen}>
          Learn More
        </Button>
      )}

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {open && (
          <div style={{ width: "1000px" }}>
            <DialogTitle id="responsive-dialog-title">
              <Typography variant="h5">{jobOffer.job_title}</Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText>
                {/* TODO: Needs to add description to job offer */}
                <Typography
                  variant="h6"
                  color={
                    jobOffer.status === "Waiting"
                      ? "primary"
                      : jobOffer.status === "In progress"
                      ? "success"
                      : "error"
                  }
                >
                  {jobOffer.status}
                </Typography>
                <Typography variant="body1">
                  <b>Job start date:</b>
                </Typography>
                <Typography variant="body1" mb={1}>
                  {jobOffer.job_start_date}
                </Typography>
                <Typography variant="body1">
                  <b>Job description</b>
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ width: "50%" }}
                  mb={1}
                >
                  {jobOffer.job_description}
                </Typography>
                <Typography variant="body1" mb={1}>
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
                      .map((skill) => {
                        return (
                          <Typography variant="subtitle2">{skill}</Typography>
                        );
                      })}
                  </div>
                  <div style={{ marginLeft: "15%" }}>
                    {jobOffer.skills
                      .slice(jobOffer.skills.length / 2, jobOffer.skills.length)
                      .map((skill) => {
                        return (
                          <Typography variant="subtitle2">{skill}</Typography>
                        );
                      })}
                  </div>
                </div>
              </DialogContentText>
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
