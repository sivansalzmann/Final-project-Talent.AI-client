import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { JobOffer } from "../types/candidates-types";
import DescriptionIcon from "@mui/icons-material/Description";

const JobOfferInfo = ({ jobOffer, infoTypeCard }: JobOfferInfoProps) => {
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
          sx={{ minWidth: 250 }}
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
          <div
            style={{
              minWidth: "300",
              minHeight: "700",
            }}
          >
            <DialogTitle id="responsive-dialog-title">
              <Typography sx={{ fontFamily: "Anek Odia" }} variant="h5">
                {jobOffer.job_title}
              </Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText>
                {/* TODO: Needs to add description to job offer */}
                <Typography variant="body1" sx={{ fontFamily: "Anek Odia" }}>
                  Status: {jobOffer.status}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "Anek Odia" }}>
                  Job start date: {jobOffer.job_start_date}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "Anek Odia" }}>
                  Skills:
                </Typography>
                <div>
                  {jobOffer.skills.map((skill) => {
                    return (
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontFamily: "Anek Odia",
                        }}
                      >
                        {skill}
                      </Typography>
                    );
                  })}
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
