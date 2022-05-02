import { Button } from "@mui/material";
import { FC, useState } from "react";
import { Cookie } from "universal-cookie";
import CustomDialog from "../ui-components/CustomDialog";
import FormDetails from "../ui-components/FormDetails";
import { styled } from "@mui/system";

const PopUpPosition: FC<PopUpPositionProps> = ({ user, open, close }) => {
  const updateUser = {};
  const [openAddPopUp, setOpenAddPopUp] = useState(true);
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
    fetch(`http://localhost:3000/api/auth/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateUser,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        close();
      });
  };

  const handleCloseAddPopUp = () => {
    setOpenAddPopUp(false);
  };

  const handleChoosePosition = (positionType: string) => {
    if (positionType === "candidate") {
      setCandidate(true);
    } else {
      setCompany(true);
    }
    updateUser[positionType] = true;
    editUsr();
  };

  return (
    <CustomDialog title={"Choose position"} open={open} handleClose={close}>
      <ChoosePositionContainer>
        <Button
          variant="contained"
          onClick={() => handleChoosePosition("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="contained"
          value="candidate"
          onClick={() => handleChoosePosition("company")}
        >
          Company
        </Button>
      </ChoosePositionContainer>
      {candidate ? (
        <CustomDialog
          open={openAddPopUp}
          title="Add new candidate"
          handleAddCandidate={handleAddCandidate}
          handleClose={handleCloseAddPopUp}
        >
          <FormDetails
            candidate={true}
            user={user}
            setIndustry={setIndustry}
            setBirthDay={setBirthDay}
            setBirthYear={setBirthYear}
            setGender={setGender}
          />
        </CustomDialog>
      ) : (
        company && (
          <CustomDialog
            open={openAddPopUp}
            title="company"
            handleClose={handleCloseAddPopUp}
          >
            company
          </CustomDialog>
        )
      )}
    </CustomDialog>
  );
};

const ChoosePositionContainer = styled("div")({
  alignItems: "center",
  justifyContent: "space-around",
  display: "flex",
});
export interface PopUpPositionProps {
  user: Cookie;
  open: boolean;
  close: () => void;
}
export default PopUpPosition;
