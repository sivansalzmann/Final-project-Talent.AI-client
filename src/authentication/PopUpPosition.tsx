import { FC, useEffect, useState } from "react";
import { Cookie } from "universal-cookie";
import CustomDialog from "../ui-components/CustomDialog";
import FormDetails from "../candidate/Forms/FormDetails";
import { useNavigate } from "react-router-dom";
import { dateAsDate } from "../app-utils";
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
  const [levelsInput] = useState<string[]>([]);
  const [companyUser, setCompanyUser] = useState<CompanyUser>();
  const [companyName, setCompanyName] = useState("");
  const [rule, setRule] = useState("");

  const [degreesInput] = useState<string[]>([]);
  const [majorsInput] = useState<string[]>([]);
  const [minorsInput] = useState<string[]>([]);

  const [experienceFields, setExperienceFields] = useState([
    {
      company_name: "",
      company_size: "",
      company_id: "",
      company_founded: 0,
      company_industry: "",
      end_date: "",
      start_date: "",
      current_job: false,
      company_location_name: "",
      company_location_country: "",
      company_location_continent: "",
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
        company_size: "",
        company_id: "",
        company_founded: 0,
        company_industry: "",
        end_date: "",
        start_date: "",
        current_job: false,
        company_location_name: "",
        company_location_country: "",
        company_location_continent: "",
        title_name: "",
        title_role: "",
        title_levels: levelsInput,
      },
    ]);
  };
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
    fetch(`${process.env.REACT_APP_SERVER}/api/company`)
      .then((response) => response.json())
      .then((result) => {
        setCompanies(result);
      });
  }, []);

  const validateCandidateForm = () => {
    if (
      jobTitle !== "" &&
      gender !== "" &&
      jobTitleSubRole !== "" &&
      jobTitleRole !== "" &&
      jobCompany !== "" &&
      personalInfo !== "" &&
      skills !== [] &&
      degreesInput !== [] &&
      levelsInput !== [] &&
      minorsInput !== [] &&
      majorsInput !== [] &&
      interests !== [] &&
      experienceFields !== [] &&
      educationFields !== []
    ) {
      return true;
    }
    return false;
  };

  const handleAddCandidate = () => {
    if (validateCandidateForm()) {
      fetch(`${process.env.REACT_APP_SERVER}/api/candidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addCandidate: {
            googleID: user.googleID,
            full_name: user.first_name + " " + user.last_name,
            first_name: user.first_name,
            last_name: user.last_name,
            gender: gender,
            birth_year: birthDay?.getFullYear(),
            birth_date: dateAsDate(birthDay),
            industry: industry,
            job_title: jobTitle,
            job_title_role: jobTitleRole,
            job_title_sub_role: jobTitleSubRole,
            job_title_levels: jobTitleLevels,
            job_company_id: jobCompany,
            job_company_name: jobCompany,
            job_start_date: jobStartDate,
            interests: interests,
            skills: skills,
            experience: experienceFields,
            education: educationFields,
            personalInfo: personalInfo,
            email: user.email,
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          editUsr();
          setOpenAddPopUp(false);
          navigate("/candidate");
        });
    } else {
      alert("Please fill all the fields to create candidate user!");
    }
  };

  const editUsr = () => {
    let updateUser = {};
    if (candidate) {
      updateUser = { updateUser: { candidate: true } };
    } else if (company) {
      updateUser = { updateUser: { company: true } };
    }
    fetch(`${process.env.REACT_APP_SERVER}/api/auth/${user._id}`, {
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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/companyUsers/${user.googleID}`)
      .then((response) => response.json())
      .then((result) => {
        setCompanyUser(result);
      });
  }, [companyUser, user.googleID]);

  const handleAddCompanyUser = () => {
    fetch(`${process.env.REACT_APP_SERVER}/api/companyUsers`, {
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
