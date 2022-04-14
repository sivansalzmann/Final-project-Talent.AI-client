import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { JobOffer } from "../types/candidates-types";
import DescriptionIcon from "@mui/icons-material/Description";

const JobOfferInfo = ({ jobOffer }: JobOfferInfoProps) => {
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
      <IconButton size="large" onClick={handleClickOpen}>
        <DescriptionIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {open && (
          <>
            <DialogTitle id="responsive-dialog-title">
              {jobOffer.job_title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {/* TODO: Needs to add description to job offer */}
                <Typography variant="body2">
                  Status: {jobOffer.status}
                </Typography>
                <Typography variant="body2">
                  Job start date: {jobOffer.job_start_date}
                </Typography>
                <Typography variant="body2">Skills:</Typography>
                {/* {jobOffer.skills.map((skill) => {
                  return <Typography variant="subtitle2">{skill}</Typography>;
                })} */}
              </DialogContentText>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default JobOfferInfo;

interface JobOfferInfoProps {
  jobOffer: JobOffer;
}
