import React, { useState } from "react";
import { Button, Select } from "antd";
import { useTranslation } from "react-i18next";
import "../styles/button.scss";

export default function Test1() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6]);
  const [position, setposition] = useState(true);

  const onClickLanguageChange = (value: any) => {
    i18n.changeLanguage(value);
    if (value === "en") {
      setLanguage(value);
    } else {
      setLanguage("ไทย");
    }
  };

  const handleButtonLeft = () => {
    const updateNumbers = [...numbers.slice(1), numbers[0]];
    setNumbers(updateNumbers);
  };

  const handleButtonMiddle = () => {
    setposition(!position);
  };

  const handleButtonRight = () => {
    const updateNumbers = [numbers[5], ...numbers.slice(0, 5)];
    setNumbers(updateNumbers);
  };

  const handleButtonNumber = () => {
    const randomNumber = [...numbers].sort(() => Math.random() - 0.5);
    setNumbers(randomNumber);
  };

  return (
    <div>
      <div>
        <div>{t("layout")}</div>
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
      </div>
      <div>
        <Button onClick={handleButtonLeft}>1</Button>
        <Button onClick={handleButtonMiddle}>2 3</Button>
        <Button onClick={handleButtonRight}>4</Button>
      </div>
      <div>
        <Button onClick={handleButtonNumber}>{numbers[0]}</Button>
        <Button onClick={handleButtonNumber}>{numbers[1]}</Button>
        <Button onClick={handleButtonNumber}>{numbers[2]}</Button>
        <Button onClick={handleButtonNumber}>{numbers[3]}</Button>
        <Button onClick={handleButtonNumber}>{numbers[4]}</Button>
        <Button onClick={handleButtonNumber}>{numbers[5]}</Button>
      </div>
    </div>
  );
}
