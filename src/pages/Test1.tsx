import { useState } from "react";
import { Button, Select } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../styles/page-layout.scss";

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

  const renderIcon = (value: number) => {
    const icon =
      value === 1
        ? "square"
        : value === 2
        ? "circle"
        : value === 3
        ? "oval"
        : value === 4
        ? "trapezoid"
        : value === 5
        ? "rectangle"
        : "rhombus";

    return <div className={`${icon}`} />;
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
    <div className="layout-box">
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="text-title">{t("layout")}</div>
        </Link>
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

      <div className="layout-position">
        <div className="layout-middle-header">
          <Button onClick={handleButtonLeft}>
            <div className="left-triangle" />
            <div className="button-position-subdetail">{t("shapeR")}</div>
          </Button>
          <Button onClick={handleButtonMiddle} className="layout-middle-button">
            <div className="triangle" /> <div className="inverted-triangle" />
            <div className="button-position-subdetail">{t("position")}</div>
          </Button>
          <Button onClick={handleButtonRight}>
            <div className="right-triangle" />
            <div className="button-position-subdetail">{t("shapeL")}</div>
          </Button>
        </div>
        <hr />
        <div className="layout-position-box">
          <div
            className={`${
              position
                ? "layout-position-wrapper-end"
                : "layout-position-wrapper-start"
            }`}
          >
            <Button onClick={handleButtonNumber}>
              {renderIcon(numbers[0])}
            </Button>
            <Button onClick={handleButtonNumber}>
              {renderIcon(numbers[1])}
            </Button>
            <Button onClick={handleButtonNumber}>
              {renderIcon(numbers[2])}
            </Button>
          </div>
          <div
            className={`${
              !position
                ? "layout-position-wrapper-end"
                : "layout-position-wrapper-start"
            }`}
          >
            <Button onClick={handleButtonNumber}>
              {renderIcon(numbers[3])}
            </Button>
            <Button onClick={handleButtonNumber}>
              {renderIcon(numbers[4])}
            </Button>
            <Button onClick={handleButtonNumber}>
              {renderIcon(numbers[5])}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
