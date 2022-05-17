import { FC, useEffect, useState } from "react";
import { Cookie } from "universal-cookie";
import CustomDialog from "../ui-components/CustomDialog";
import FormDetails from "../candidate/Forms/FormDetails";
import { Education } from "../types/jobOffer-types";
import { useNavigate } from "react-router-dom";
import { dateAsDate } from "../app-utils";
import CompanyFormsContainer from "../company/ComapnyFormsContainer";
import ChooseCompany from "../company/Forms/ChooseCompany";
import { Company } from "../types/company-types";
import { CompanyUser } from "../types/companyUser-types";

const PopUpPosition: FC<PopUpPositionProps> = ({
  user,
  close,
  candidate,
  company,
  open,
}) => {
  const [openAddPopUp, setOpenAddPopUp] = useState(true);
  const [industry, setIndustry] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthDay] = useState<Date>(new Date());
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [selectDegrees] = useState<string[]>([]);
  const [personalInfo, setPersonalInfo] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleLevels, setJobTitleLevels] = useState<string[]>([]);
  const [jobTitleRole, setJobTitleRole] = useState("");
  const [jobTitleSubRole, setJobTitleSubRole] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobStartDate, setJobStartDate] = useState("");

  const [companies, setCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();

  const [levelsInput, setLevelsInput] = useState<string[]>([]);
  const [companyUser, setCompanyUser] = useState<CompanyUser>();
  const [companyName, setCompanyName] = useState("");
  const [rule, setRule] = useState("");

  const [degreesInput, setDegreesInput] = useState<string[]>([]);
  const [majorsInput, setMajorsInput] = useState<string[]>([]);
  const [minorsInput, setMinorsInput] = useState<string[]>([]);

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
        title_levels: levelsInput,
      },
    ]);
  };
  console.log(degreesInput);
  const [educationFields, setEducationFields] = useState([
    {
      school_name: "",
      school_type: "",
      end_date: "",
      start_date: "",
      gpa: "",
      degrees: degreesInput,
      majors: majorsInput,
      minors: minorsInput,
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
        degrees: degreesInput,
        majors: [],
        minors: [],
      },
    ]);
  };

  useEffect(() => {
    fetch(`https://52.215.114.42:3000/api/company`)
      .then((response) => response.json())
      .then((result) => {
        setCompanies(result);
      });
  }, []);

  const handleAddCandidate = () => {
    fetch(`https://52.215.114.42:3000/api/candidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        addCandidate: {
          googleID: user.googleID,
          first_name: user.first_name,
          last_name: user.last_name,
          full_name: user.full_name,
          gender: gender,
          birth_date: dateAsDate(birthDay),
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
          education: educationFields,
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
    if (candidate) {
      updateUser = { updateUser: { candidate: true } };
    } else if (company) {
      updateUser = { updateUser: { company: true } };
    }
    fetch(`https://52.215.114.42:3000/api/auth/${user._id}`, {
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

  useEffect(() => {
    fetch(`https://52.215.114.42:3000/api/companyUsers/${user.googleID}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(companyUser);
        setCompanyUser(result);
      });
  }, [companyUser, user.googleID]);

  const handleAddCompanyUser = () => {
    fetch(`https://52.215.114.42:3000/api/companyUsers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        addCompanyUser: {
          googleID: user.googleID,
          first_name: user.first_name,
          last_name: user.last_name,
          full_name: user.full_name,
          company_name: companyName,
          rule: rule,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setOpenAddPopUp(false);
        navigate("/company");
      });
  };

  return (
    <>
      {candidate ? (
        <CustomDialog
          open={openAddPopUp}
          title="Add new candidate"
          handleAddCandidate={handleAddCandidate}
          handleClose={handleCloseAddPopUp}
          addCandidate
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
            education={educationFields}
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
            setMajorsInput={setMajorsInput}
            setMinorsInput={setMinorsInput}
            setDegreesInput={setDegreesInput}
          />
        </CustomDialog>
      ) : (
        company &&
        !companyUser && (
          <CustomDialog
            open={openAddPopUp}
            title="Choose Company"
            handleClose={handleCloseAddPopUp}
            handleAddCompanyUser={handleAddCompanyUser}
          >
            <ChooseCompany
              companies={companies}
              user={user}
              setOpenAddPopUp={setOpenAddPopUp}
              setCompanyName={setCompanyName}
              companyName={companyName}
              rule={rule}
              setRule={setRule}
              handleAddCompanyUser={handleAddCompanyUser}
            />
          </CustomDialog>
        )
      )}
    </>
  );
};

export interface PopUpPositionProps {
  user: Cookie;
  open: boolean;
  close: () => void;
  candidate?: boolean;
  company?: boolean;
}
export default PopUpPosition;
