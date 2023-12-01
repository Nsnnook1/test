import { Button } from "antd";
import { useTranslation } from "react-i18next";
import React from "react";
import Translate from "../components/Translate";
import "../styles/button.scss";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="box">
      <Translate />
      <div className="button-styled">
        <Button href="/test1" className="button-box">
          <div className="button-header">{t("test1")}</div>
          <div className="button-subheader">{t("layout")}</div>
        </Button>
        <Button href="/test2" className="button-box">
          <div className="button-header">{t("test2")}</div>
          <div className="button-subheader"> {t("personal")}</div>
        </Button>
      </div>
    </div>
  );
};

export default Home;
