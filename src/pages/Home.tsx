import { useState } from "react";
import { Button, Select } from "antd";
import { useTranslation } from "react-i18next";
import "../styles/button.scss";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const onClickLanguageChange = (value: any) => {
    i18n.changeLanguage(value);
    if (value === "en") {
      setLanguage(value);
    } else {
      setLanguage("ไทย");
    }
  };

  return (
    <div className="box">
      <div className="select-box">
        <Select
          value={language}
          options={[
            { value: "en", label: <div>{t("languageEN")}</div> },
            { value: "th", label: <div>{t("languageTH")}</div> },
          ]}
          onChange={(e) => onClickLanguageChange(e)}
        />
      </div>
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
}
