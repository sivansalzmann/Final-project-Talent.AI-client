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
        aria-labelledby="responsive-dialog-title"
      >
        {open && (
          <div style={{ width: "1000px" }}>
            <DialogTitle id="responsive-dialog-title">
              <Typography variant="h6">
                {capitalizeFirstLetter(jobOffer.job_title)}
              </Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText>
                <Typography variant="body1" color="black">
                  <b>Job title:</b>
                </Typography>
                <Typography variant="body2" mb={1}>
                  {capitalizeFirstLetter(jobOffer.job_title)}
                </Typography>
                <Typography variant="body1" color="black">
                  <b>Job start date:</b>
                </Typography>
                <Typography variant="body2" mb={1}>
                  {jobOffer.job_start_date}
                </Typography>
                <Typography variant="body1" color="black">
                  <b>Job start date:</b>
                </Typography>
                <Typography variant="body2" mb={1}>
                  {jobOffer.job_start_date}
                </Typography>
                <Typography variant="body1" color="black">
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
