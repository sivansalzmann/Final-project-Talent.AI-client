import { FC, useEffect, useState } from "react";
import Footer from "../app/Footer";
import { Company } from "../types/company-types";
import { ReactComponent as Logo } from "../assets/logo.svg";

const CompanyFormsContainer: FC = ({ children }) => {
  const [, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/company`)
      .then((response) => response.json())
      .then((result) => {
        setCompanies(result);
      });
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Logo width={70} height={70} style={{ margin: "10px" }} />
      <Footer />
    </div>
  );
};

export default CompanyFormsContainer;
