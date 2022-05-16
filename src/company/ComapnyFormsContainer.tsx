import { FC, useEffect, useState } from "react";
import Footer from "../app/Footer";
import { Company } from "../types/company-types";
import ChooseCompany from "./Forms/ChooseCompany";
import { ReactComponent as Logo } from "../assets/logo.svg";

const CompanyFormsContainer: FC = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/company`)
      .then((response) => response.json())
      .then((result) => {
        setCompanies(result);
      });
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Logo width={70} height={70} style={{ margin: "10px" }} />
      {/* <ChooseCompany companies={companies} /> */}
      <Footer />
    </div>
  );
};

export default CompanyFormsContainer;
