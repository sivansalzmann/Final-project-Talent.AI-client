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
} from "@mui/material";
import SubCard from "../../ui-components/SubCard";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SendIcon from "@mui/icons-material/Send";

const EditCandidateExp: FC<EditCandidateExpProps> = ({ index, candidate }) => {
  const [expModel, setexpModel] = useState(false);
  const [startDate, setStartDate] = useState(
    candidate?.experience[index].start_date
  );
  const [endDate, setEndDate] = useState(candidate?.experience[index].end_date);
  const [companyName, setCompanyName] = useState(
    candidate?.experience[index].company_name
  );
  const [titleName, setTitleName] = useState(
    candidate?.experience[index].title_name
  );
  const [titleRole, setTitleRole] = useState(
    candidate?.experience[index].title_role
  );

  const [companyIndustry, setCompanyIndustry] = useState(
    candidate?.experience[index].company_industry
  );

  const [titleLevels, setTitleLevels] = useState(
    candidate?.experience[index].title_levels
  );
  const [textFieldLevel, setTextFieldLevel] = useState<string[]>([]);

  const [levelsInput, setLevelsInput] = useState(
    candidate?.experience[index].title_levels
  );

  const handleExpModel = (state: boolean) => {
    setexpModel(state);
  };

  const addTextFieldLevel = () => {
    setTextFieldLevel([...textFieldLevel, ""]);
  };

  const editEducation = () => {
    fetch(
      `${process.env.REACT_APP_SERVER}/api/candidate/exp/${candidate?._id}/${index}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updateExperience: {
            comapny_name: companyName,
            company_industry: companyIndustry,
            title_name: titleName,
            title_role: titleRole,
            start_date: startDate,
            end_date: endDate,
            title_levels: levelsInput,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setexpModel(false);
        window.location.reload();
      });
  };

  return (
    <>
      <IconButton onClick={() => handleExpModel(true)}>
        <EditIcon fontSize="small" color="primary" />
      </IconButton>
      {expModel && (
        <Dialog
          open={expModel}
          onClose={() => handleExpModel(false)}
          sx={{ overflowY: "auto", maxHeight: "100%", position: "absolute" }}
        >
          <SubCard
            sx={{ overFlow: "scroll" }}
            title={
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" mt={1} color="black">
                  Edit experience
                </Typography>
                <IconButton
                  onClick={() => {
                    handleExpModel(false);
                  }}
                >
                  <CloseIcon fontSize="small" color="disabled" />
                </IconButton>
              </div>
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="Title name"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  defaultValue={titleName}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  onChange={(e) => setTitleName(e.target.value)}
                />
                <TextField
                  label="Title role"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  defaultValue={titleRole}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  onChange={(e) => setTitleRole(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="Company name"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  defaultValue={companyName}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <TextField
                  label="Company industry"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  defaultValue={companyIndustry}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  onChange={(e) => setCompanyIndustry(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Start date"
                    minDate={new Date("1990-01-01")}
                    value={startDate}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ m: 1, width: "30ch" }} />
                    )}
                    onChange={(date) => {
                      if (date) setStartDate(date?.toLocaleString());
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="End date"
                    minDate={new Date("1990-01-01")}
                    value={endDate}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ m: 1, width: "30ch" }} />
                    )}
                    onChange={(date) => {
                      if (date) setEndDate(date?.toLocaleString());
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {titleLevels &&
                  titleLevels.map((level, indexLevel) => {
                    return (
                      <TextField
                        label="level"
                        id="outlined-start-adornment"
                        sx={{ m: 1 }}
                        defaultValue={level}
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                        onChange={(e) => {
                          if (titleLevels && titleLevels !== []) {
                            titleLevels[indexLevel] = e.target.value;
                          }
                        }}
                      />
                    );
                  })}
                {textFieldLevel.map((textField) => {
                  return (
                    <TextField
                      label="level"
                      id="outlined-start-adornment"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                      onChange={(e) => {
                        if (titleLevels && titleLevels !== []) {
                          setLevelsInput([...titleLevels, e.target.value]);
                        } else {
                          setLevelsInput([e.target.value]);
                        }
                      }}
                    />
                  );
                })}
                <Button onClick={addTextFieldLevel}>Add levels</Button>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1%",
                }}
              >
                <Button
                  startIcon={<SendIcon />}
                  variant="contained"
                  sx={{
                    width: "20%",
                  }}
                  onClick={editEducation}
                >
                  <Typography variant="body2" mt={0.5} color="white">
                    Send
                  </Typography>
                </Button>
              </div>
            </div>
          </SubCard>
        </Dialog>
      )}
    </>
  );
};

export interface EditCandidateExpProps {
  index: number;
  candidate?: Candidate;
}

export default EditCandidateExp;
