import React, { useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import "../styles/button.scss";

interface LanguageOption {
  value: string;
  label: React.ReactNode;
}

const Translate: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>("en");

  const onClickLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    if (value === "en") {
      setLanguage(value);
    } else {
      setLanguage("ไทย");
    }
  };

  const languageOptions: LanguageOption[] = [
    { value: "en", label: <div>{t("languageEN")}</div> },
    { value: "th", label: <div>{t("languageTH")}</div> },
  ];

  return (
    <div className="select-box">
      <Select
        value={language}
        options={languageOptions}
        onChange={(e) => onClickLanguageChange(e)}
      />
    </div>
  );
};

export default Translate;
