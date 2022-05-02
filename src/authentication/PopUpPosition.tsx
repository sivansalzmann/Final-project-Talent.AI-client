import { Button } from "@mui/material";
import { useState } from "react";
import CustomDialog from "../ui-components/CustomDialog";
import FormDetails from "../ui-components/FormDetails";

const PopUpPosition = ({ user, open }) => {
  const updateUser = {};
  //const [open, setOpen] = useState(false);
  const [candidate, setCandidate] = useState(false);
  const [company, setCompany] = useState(false);
  const [industry, setIndustry] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [interests] = useState<string[]>([]);
  const [skills] = useState<string[]>([]);

  const handleAddCandidate = () => {
    fetch(`http://localhost:3000/api/candidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        addCandidate: {
          googleID: user[0].googleID,
          first_name: user[0].first_name,
          last_name: user[0].last_name,
          full_name: user[0].full_name,
          gender: gender,
          birth_day: birthDay,
          birth_year: birthYear,
          industry: industry,
          skills: skills,
          interests: interests,
          // experience: experience,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  const editUsr = () => {
    console.log(user);
    fetch(`http://localhost:3000/api/auth/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateUser,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        handleClose();
        console.log(open);
      });
  };

  const handleClose = () => {
    //setOpen(false);
  };
  return (
    <CustomDialog
      title={"Choose position"}
      open={open}
      handleClose={handleClose}
    >
      <div
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          display: "flex",
        }}
      >
        <Button
          variant="contained"
          sx={{ fontFamily: "Anek Odia" }}
          onClick={() => {
            updateUser["candidate"] = true;
            editUsr();
            setCandidate(true);
          }}
        >
          Candidate
        </Button>
        <Button
          variant="contained"
          sx={{ fontFamily: "Anek Odia" }}
          onClick={() => {
            updateUser["company"] = true;
            editUsr();
            setCompany(true);
          }}
        >
          Company
        </Button>
      </div>
      {candidate ? (
        <CustomDialog
          open={true}
          title="Add new candidate"
          handleAddCandidate={handleAddCandidate}
          handleClose={handleClose}
        >
          <FormDetails
            candidate={true}
            user={user}
            setIndustry={setIndustry}
            setBirthDay={setBirthDay}
            setBirthYear={setBirthYear}
          />
        </CustomDialog>
      ) : (
        company && (
          <CustomDialog open={true} title="company" handleClose={handleClose}>
            company
          </CustomDialog>
        )
      )}
    </CustomDialog>
  );
};
export default PopUpPosition;
