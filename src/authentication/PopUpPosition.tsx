import { Button } from "@mui/material";
import { FC, useState } from "react";
import { Cookie } from "universal-cookie";
import CustomDialog from "../ui-components/CustomDialog";
import FormDetails from "../ui-components/FormDetails";
import { styled } from "@mui/system";
import { Education, ExperienceInput } from "../types/jobOffer-types";
import { useNavigate } from "react-router-dom";

const PopUpPosition: FC<PopUpPositionProps> = ({ user, open, close }) => {
  const updateUser = {};
  const [openAddPopUp, setOpenAddPopUp] = useState(true);
  const [candidate, setCandidate] = useState(false);
  const [company, setCompany] = useState(false);
  const [industry, setIndustry] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthDay] = useState<Date | null>(new Date());
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [selectDegrees, setSelectDegrees] = useState<string[]>([]);
  const [personalInfo, setPersonalInfo] = useState("");
  const navigate = useNavigate();

  const [experience] = useState<ExperienceInput[]>([
    {
      company_name: "",
      start_date: "",
      end_date: "",
      current_job: false,
      title_name: "",
      title_role: "",
      title_levels: [],
    },
  ]);

  const [experienceFields, setExperienceFields] = useState([
    {
      company_name: "",
      start_date: "",
      end_date: "",
      current_job: false,
      title_name: "",
      title_role: "",
      title_levels: [],
    },
  ]);
  const addFormFieldsExperience = () => {
    setExperienceFields([
      ...experienceFields,
      {
        company_name: "",
        start_date: "",
        end_date: "",
        current_job: false,
        title_name: "",
        title_role: "",
        title_levels: [],
      },
    ]);
  };

  const [education] = useState<Education[]>([
    {
      school_name: "",
      school_type: "",
      start_date: "",
      end_date: "",
      degrees: [],
      majors: [],
      minors: [],
      gpa: "",
    },
  ]);

  const [educationFields, setEducationFields] = useState([
    {
      school_name: "",
      school_type: "",
      end_date: "",
      start_date: "",
      gpa: "",
      degrees: selectDegrees,
      majors: [],
      minors: [],
    },
  ]);

  const addFormFieldsEducation = () => {
    setEducationFields([
      ...educationFields,
      {
        school_name: "",
        school_type: "",
        end_date: "",
        start_date: "",
        gpa: "",
        degrees: [],
        majors: [],
        minors: [],
      },
    ]);
  };

  const dateAsDate = () => {
    if (birthDay) {
      return (
        birthDay?.getUTCFullYear() +
        "-" +
        (birthDay.getUTCMonth() + 1) +
        "-" +
        birthDay?.getUTCDate()
      );
    }
  };

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
          birth_date: dateAsDate(),
          birth_year: birthDay?.getFullYear(),
          industry: industry,
          skills: skills,
          interests: interests,
          experience: experienceFields,
          education: education,
          personalInfo: personalInfo,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setOpenAddPopUp(false);
        navigate("/candidate");
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
    <CustomDialog
      title={"Choose position"}
      open={open}
      handleClose={close}
      position={true}
    >
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
            setGender={setGender}
            setSkills={setSkills}
            experience={experienceFields}
            setExperienceFields={setExperienceFields}
            education={education}
            skills={skills}
            setInterests={setInterests}
            interests={interests}
            experienceFields={experienceFields}
            addFormFieldsExperience={addFormFieldsExperience}
            educationFields={educationFields}
            setEducationFields={setEducationFields}
            addFormFieldsEducation={addFormFieldsEducation}
            selectedDegrees={selectDegrees}
            setPersonalInfo={setPersonalInfo}
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
