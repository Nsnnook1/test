import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Checkbox } from "antd";
import Translate from "../components/Translate";
import PersonForm from "../components/PersonForm";
import PersonTable from "../components/PersonTable";
import "../styles/management-page.scss";

const Test2: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="management-box">
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="text-title">{t("personal")}</div>
        </Link>
        <Translate />
      </div>
      <div>
        <PersonForm />
      </div>
      <div>
        <PersonTable />
      </div>
    </div>
  );
};

export default Test2;
