import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid, Modal, useTheme } from "@mui/material";
import AddNewJobOffer from "../company/AddNewJobOffer";
import JobOfferForm from "../company/JobOfferForm";
// import CvForm from "../../views/forms/forms-wizard/JobOfferForm/CvForm";
import { Candidate, Company } from "../types/candidates-types";
interface PopUpFormsProps {
  formType: string;
  candidate: Candidate | null;
  company?: Company | undefined;
}

const PopUpForms = ({ formType, candidate, company }: PopUpFormsProps) => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container justifyContent="flex-end">
      {/* {formType === "addJob" ? { addNewJobOffer } : { editCV }} */}
      <Button sx={{ marginTop: "10%" }} fullWidth onClick={handleOpen}>
        {formType === "newJob" ? (
          <AddNewJobOffer
            primary="Add new job offer"
            iconPrimary={AddIcon}
            color={theme.palette.secondary.main}
          />
        ) : (
          <Button
            variant="text"
            size="small"
            onClick={() => console.log("sivan")}
          >
            My CV
          </Button>
        )}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ width: "50%", marginLeft: "25%", marginTop: "2%" }}
      >
        {formType === "newJob" ? (
          <JobOfferForm handleClose={handleClose} company={company} />
        ) : formType === "editJob" ? (
          <></>
        ) : (
          <></>
          // <CvForm handleClose={handleClose} candidate={candidate} />
        )}
      </Modal>
    </Grid>
  );
};

export default PopUpForms;
