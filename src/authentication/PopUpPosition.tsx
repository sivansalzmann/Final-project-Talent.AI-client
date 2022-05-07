import { Button } from "@mui/material";
import { FC, useState } from "react";
import { Cookie } from "universal-cookie";
import CustomDialog from "../ui-components/CustomDialog";
import FormDetails from "../ui-components/FormDetails";
import { styled } from "@mui/system";
import { Education, ExperienceInput } from "../types/jobOffer-types";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PopUpPosition: FC<PopUpPositionProps> = ({
  user,
  open,
  close,
  candidate,
  company,
}) => {
  //const updateUser = {};
  const [openAddPopUp, setOpenAddPopUp] = useState(true);
  // const [candidate, setCandidate] = useState(false);
  // const [company, setCompany] = useState(false);
  const [industry, setIndustry] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthDay] = useState<Date | null>(new Date());
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [selectDegrees, setSelectDegrees] = useState<string[]>([]);
  const [personalInfo, setPersonalInfo] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleLevels, setJobTitleLevels] = useState<string[]>([]);
  const [jobTitleRole, setJobTitleRole] = useState("");
  const [jobTitleSubRole, setJobTitleSubRole] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobStartDate, setJobStartDate] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["user"]);

  const [levelsInput, setLevelsInput] = useState<string[]>([]);
  const [experienceFields, setExperienceFields] = useState([
    {
      company_name: "",
      start_date: "",
      end_date: "",
      current_job: false,
      title_name: "",
      title_role: "",
      title_levels: levelsInput,
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
      degrees: [""],
      majors: [""],
      minors: [""],
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
          googleID: user.googleID,
          first_name: user.first_name,
          last_name: user.last_name,
          full_name: user.full_name,
          gender: gender,
          birth_date: dateAsDate(),
          birth_year: birthDay?.getFullYear(),
          industry: industry,
          job_title: jobTitle,
          job_title_sub_role: jobTitleSubRole,
          job_title_role: jobTitleRole,
          job_title_levels: jobTitleLevels,
          job_company_name: jobCompany,
          job_start_date: jobStartDate,
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
        editUsr();
        setOpenAddPopUp(false);
        navigate("/candidate");
      });
  };

  const editUsr = () => {
    let updateUser = {};
    console.log(user);
    if (candidate) {
      updateUser = { updateUser: { candidate: true } };
    } else if (company) {
      updateUser = { updateUser: { company: true } };
    }
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
        close();
      });
  };

  const handleCloseAddPopUp = () => {
    setOpenAddPopUp(false);
  };
  console.log(candidate);

  // const handleChoosePosition = (positionType: string) => {
  //   if (positionType === "candidate") {
  //     setCandidate(true);
  //   } else {
  //     setCompany(true);
  //   }
  //   updateUser[positionType] = true;
  //   editUsr();
  // };

  return (
    <>
      {/* <ChoosePositionContainer>
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
      </ChoosePositionContainer> */}
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
            setJobTitle={setJobTitle}
            setJobTitleLevels={setJobTitleLevels}
            setJobTitleRole={setJobTitleRole}
            setJobTitleSubRole={setJobTitleSubRole}
            setJobCompany={setJobCompany}
            setJobStartDate={setJobStartDate}
            levels={jobTitleLevels}
            levelsInput={levelsInput}
            setLevelsInput={setLevelsInput}
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
    </>
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
  candidate?: boolean;
  company?: boolean;
}
export default PopUpPosition;
