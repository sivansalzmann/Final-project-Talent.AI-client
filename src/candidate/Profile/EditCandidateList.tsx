import { FC, useState } from "react";
import { Candidate } from "../../types/candidates-types";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import SubCard from "../../ui-components/SubCard";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const EditCandidateList: FC<EditCandidateListProps> = ({
  majors,
  minors,
  degrees,
  candidate,
  index,
}) => {
  const [majorsModel, setMajorsModel] = useState(false);

  const handleMajorsModel = (state: boolean) => {
    setMajorsModel(state);
  };

  return (
    <>
      {majors && (
        <>
          <Button onClick={() => handleMajorsModel(true)}>
            <Typography>Edit majors</Typography>
          </Button>
          <Dialog open={majorsModel} onClose={() => handleMajorsModel(false)}>
            <div></div>
          </Dialog>
        </>
      )}
    </>
  );
};

export interface EditCandidateListProps {
  majors?: boolean;
  minors?: boolean;
  degrees?: boolean;
  candidate?: Candidate;
  index: number;
}

export default EditCandidateList;
