import { FC, useState } from "react";
import {
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SubCard from "../ui-components/SubCard";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { JobOffer } from "../types/jobOffer-types";
import { Company } from "../types/company-types";

const EditExpJobOffer: FC<EditExpJobOfferProps> = ({
  index,
  jobOffer,
  companyName,
}) => {
  const [, setCompany] = useState<Company>();
  const [expModel, setexpModel] = useState(false);

  const handleDeleteJobOfferExp = (jobOffer: JobOffer | undefined) => {
    if (jobOffer) {
      fetch(
        `${process.env.REACT_APP_SERVER}/api/joboffer/${jobOffer?._id}/${jobOffer.experience[index].title_name}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setexpModel(false);
          window.location.reload();
        });
    }
  };

  const [titleName, setTitleName] = useState(
    jobOffer?.experience[index].title_name
  );
  const [titleRole, setTitleRole] = useState(
    jobOffer?.experience[index].title_role
  );

  const [titleLevels] = useState(jobOffer?.experience[index].title_levels);
  const [textFieldLevel, setTextFieldLevel] = useState<string[]>([]);

  const [levelsInput, setLevelsInput] = useState(
    jobOffer?.experience[index].title_levels
  );

  const handleExpModel = (state: boolean) => {
    setexpModel(state);
  };

  const addTextFieldLevel = () => {
    setTextFieldLevel([...textFieldLevel, ""]);
  };

  const handleEditExp = () => {
    fetch(
      `${process.env.REACT_APP_SERVER}/api/company?company_name=${companyName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((response) =>
      response.json().then(async (result) => {
        setCompany(result);
        if (result) {
          await fetch(
            `${process.env.REACT_APP_SERVER}/api/jobOffer/${jobOffer?._id}/${index}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                updateExperience: {
                  comapny_name: result[0].name ? result[0].name : "",
                  company_size: result[0].size,
                  company_id: result[0].name,
                  company_founded: result[0].founded,
                  company_industry: result[0].industry,
                  end_date: "",
                  start_date: "",
                  current_job: false,
                  company_location_name: result[0].location.name,
                  company_location_country: result[0].location.country,
                  company_location_continent: result[0].location.continent,
                  title_name: titleName,
                  title_role: titleRole,
                  title_levels: levelsInput,
                },
              }),
            }
          )
            .then((response) => response.json())
            .then((res) => {
              setexpModel(false);
              window.location.reload();
            });
        }
      })
    );
  };

  return (
    <>
      <Button
        onClick={() => handleExpModel(true)}
        sx={{ marginTop: "10px", marginBottom: "5px" }}
        variant="outlined"
        size="small"
      >
        Edit
      </Button>
      <Button
        onClick={() => handleDeleteJobOfferExp(jobOffer)}
        sx={{ marginTop: "10px", marginBottom: "5px", marginLeft: "5px" }}
        variant="outlined"
        size="small"
      >
        Delete
      </Button>

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
                  onClick={handleEditExp}
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

export interface EditExpJobOfferProps {
  index: number;
  jobOffer?: JobOffer;
  companyName: string;
}

export default EditExpJobOffer;
