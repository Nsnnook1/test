import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Input, Select, Col, Row, DatePicker, Radio } from "antd";
import { getPersons, addPerson } from "../features/personsSlice";
import { useTranslation } from "react-i18next";
import StarRequired from "./StarRequired";
import "../styles/management-page.scss";

type FieldType = {
  title?: string;
  name?: string;
  lastname?: string;
};

interface Persons {
  key: number;
  title: string;
  name: string;
  lastname: string;
  birthdate: string;
  national: string;
  idCard?: string[];
  gender: number;
  mobilePrefix: number;
  mobileNumber: number;
  passport?: string;
  expectedSalary: number;
}

const PersonForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const persons = useSelector(getPersons);
  const [isSubmit, setIsSubmit] = useState(false);

  const [formValues, setFormValues] = useState<Persons>({
    key: 0,
    title: "",
    name: "",
    lastname: "",
    birthdate: "",
    national: "",
    idCard: ["", "", "", "", ""],
    gender: 0,
    mobilePrefix: 0,
    mobileNumber: 0,
    passport: "",
    expectedSalary: 0,
  });

  const handleInputChange = (fieldName: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const updateIdCard = (index: number, newValue: string) => {
    if (formValues.idCard) {
      const updatedIdCard = [...formValues.idCard];
      updatedIdCard[index] = newValue;
      return updatedIdCard;
    }
    return formValues.idCard;
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    if (
      formValues.title &&
      formValues.name &&
      formValues.lastname &&
      formValues.birthdate &&
      formValues.idCard?.length !== 0 &&
      formValues.gender !== 0 &&
      formValues.mobilePrefix &&
      formValues.mobileNumber &&
      formValues.expectedSalary
    ) {
      const newId =
        persons.length > 0 ? persons[persons.length - 1].key + 1 : 1;

      const formData: Persons = {
        ...formValues,
        key: newId,
      };

      dispatch(addPerson(formData));
      const localPersons = JSON.parse(localStorage.getItem('persons') || '[]');
      const personsToSave = persons.length > 0 ? [...localPersons, formData] : [formData];
      localStorage.setItem("persons", JSON.stringify(personsToSave));
      setIsSubmit(false);

      clearFormData();
    }
  };

  const clearFormData = () => {
    setFormValues({
      key: 0,
      title: "",
      name: "",
      lastname: "",
      birthdate: "",
      national: "",
      idCard: ["", "", "", "", ""],
      gender: 0,
      mobilePrefix: 0,
      mobileNumber: 0,
      passport: "",
      expectedSalary: 0,
    });
  };

  useEffect(() => {
    const storedPersons = localStorage.getItem("persons");
    if (storedPersons) {
      const parsedPersons = JSON.parse(storedPersons);
      console.log("parsedPersons person form: ", parsedPersons)
    }
  }, [persons]);

  return (
    <div className="management-card">
      <Card>
        <Row className="row">
          {/* แถวแรก */}
          <Col xs={2}>
            <StarRequired />
            {t("title")}:
          </Col>
          <Col xs={5} style={{ marginRight: "20px" }}>
            {/* <Input
              onChange={(e) => handleInputChange("title", e.target.value)}
              value={formValues.title}
              placeholder="คำนำหน้า"
            /> */}
            <Select
              style={{ width: "100%" }}
              onChange={(value) => handleInputChange("title", value)}
              options={[
                { value: "mr", label: "Mr." },
                { value: "ms", label: "Ms." },
                { value: "mrs", label: "Mrs." },
              ]}
            />
            {isSubmit && !formValues.title && (
              <div style={{ color: "red" }}>Please enter your title name</div>
            )}
          </Col>
          <Col xs={2}>
            <StarRequired />
            {t("firstname")}:
          </Col>
          <Col xs={5} style={{ marginRight: "20px" }}>
            <Input
              onChange={(e) => handleInputChange("name", e.target.value)}
              value={formValues.name}
              placeholder="ชื่อจริง"
            />
            {isSubmit && !formValues.name && (
              <div style={{ color: "red" }}>Please enter your first name</div>
            )}
          </Col>
          <Col xs={2}>
            <StarRequired />
            {t("lastname")}:
          </Col>
          <Col xs={6}>
            <Input
              onChange={(e) => handleInputChange("lastname", e.target.value)}
              value={formValues.lastname}
              placeholder="นามสกุล"
            />
            {isSubmit && !formValues.lastname && (
              <div style={{ color: "red" }}>Please enter your last name</div>
            )}
          </Col>
        </Row>
        <Row className="row">
          {/* แถว 2 */}
          <Col xs={2}>
            <StarRequired />
            {t("birthdate")}:
          </Col>
          <Col xs={5}>
            <DatePicker
              onChange={(date, dateString) =>
                handleInputChange("birthdate", dateString)
              }
              format="DD/MM/YYYY"
            />
            {isSubmit && !formValues.birthdate && (
              <div style={{ color: "red" }}>Please selete your birthdate</div>
            )}
          </Col>
          <Col xs={2}>
            <StarRequired />
            {t("nationality")}:
          </Col>
          <Col xs={8}>
            <Input
              onChange={(e) => handleInputChange("national", e.target.value)}
              value={formValues.national}
              placeholder="---กรุณาเลือก---"
            />
            {isSubmit && !formValues.national && (
              <div style={{ color: "red" }}>Please enter your nationnal</div>
            )}
          </Col>
        </Row>
        <Row className="row">
          {/* แถว 3 */}
          <Col xs={3} style={{ marginTop: "4px" }}>
            {t("idCard")}:
          </Col>
          <Col xs={3}>
            <Input
              onChange={(e) =>
                handleInputChange("idCard", updateIdCard(0, e.target.value))
              }
              value={formValues.idCard ? formValues.idCard[0] : ""}
              placeholder="idCard"
            />
          </Col>
          <Col xs={1}>
            <span className="management-input-center">-</span>
          </Col>
          <Col xs={3}>
            <Input
              onChange={(e) =>
                handleInputChange("idCard", updateIdCard(1, e.target.value))
              }
              value={formValues.idCard ? formValues.idCard[1] : ""}
              placeholder="idCard"
            />
          </Col>
          <Col xs={1}>
            <span className="management-input-center">-</span>
          </Col>
          <Col xs={3}>
            <Input
              onChange={(e) =>
                handleInputChange("idCard", updateIdCard(2, e.target.value))
              }
              value={formValues.idCard ? formValues.idCard[2] : ""}
              placeholder="idCard"
            />
          </Col>
          <Col xs={1}>
            <span className="management-input-center">-</span>
          </Col>
          <Col xs={3}>
            <Input
              onChange={(e) =>
                handleInputChange("idCard", updateIdCard(3, e.target.value))
              }
              value={formValues.idCard ? formValues.idCard[3] : ""}
              placeholder="idCard"
            />
          </Col>
          <Col xs={1}>
            <span className="management-input-center">-</span>
          </Col>
          <Col xs={3}>
            <Input
              onChange={(e) =>
                handleInputChange("idCard", updateIdCard(4, e.target.value))
              }
              value={formValues.idCard ? formValues.idCard[4] : ""}
              placeholder="idCard"
            />
          </Col>
        </Row>

        <Row className="row">
          {/* แถว 4 */}
          <Col xs={2}>
            <StarRequired />
            {t("gender")}:
          </Col>
          <Col style={{ marginTop: "8px" }}>
            <Radio.Group
              onChange={(e) => handleInputChange("gender", e.target.value)}
              value={formValues.gender}
            >
              <Radio value={1}>{t("man")}</Radio>
              <Radio value={2}>{t("women")}</Radio>
              <Radio value={3}>{t("notSpecified")}</Radio>
            </Radio.Group>
            {isSubmit && !formValues.gender && (
              <div style={{ color: "red" }}>Please select your gender</div>
            )}
          </Col>
        </Row>

        <Row className="row">
          {/* แถว 5 */}
          <Col xs={4}>
            <StarRequired />
            {t("phoneNumber")}:
          </Col>
          <Col xs={5}>
            <Select
              style={{ width: "100%" }}
              onChange={(value) => handleInputChange("mobilePrefix", value)}
              options={[
                { value: "06", label: "06" },
                { value: "08", label: "08" },
                { value: "09", label: "09" },
              ]}
            />
            {isSubmit && !formValues.mobilePrefix && (
              <div style={{ color: "red" }}>
                Please select your mobilePrefix
              </div>
            )}
          </Col>
          <Col xs={1}>
            <span className="management-input-center">-</span>
          </Col>
          <Col xs={12}>
            <Input
              placeholder="หมายเลขโทรศัพท์มือถือ"
              value={formValues.mobileNumber}
              onChange={(e) =>
                handleInputChange("mobileNumber", e.target.value)
              }
            />
            {isSubmit && !formValues.mobileNumber && (
              <div style={{ color: "red" }}>Please enter your mobileNumber</div>
            )}
          </Col>
        </Row>

        <Row className="row">
          <Col xs={3} style={{ marginTop: "4px" }}>
            {t("passport")}:
          </Col>
          <Col xs={8}>
            <Input
              onChange={(e) => handleInputChange("passport", e.target.value)}
              value={formValues.passport}
              placeholder="หนังสือเดินทาง"
            />
          </Col>
        </Row>

        <Row>
          {/* แถว 7 */}
          <Col xs={4}>
            <StarRequired />
            {t("expectedSalary")}:
          </Col>
          <Col xs={8}>
            <Input
              placeholder="เงินเดือนที่คาดหวัง"
              value={formValues.expectedSalary}
              onChange={(e) =>
                handleInputChange("expectedSalary", e.target.value)
              }
            />
            {isSubmit && !formValues.expectedSalary && (
              <div style={{ color: "red" }}>
                Please enter your expectedSalary
              </div>
            )}
          </Col>
          <Col xs={2} offset={2}>
            <Button onClick={clearFormData}> {t("delete")}</Button>
          </Col>
          <Col xs={2} offset={2}>
            <Button onClick={handleSubmit}>{t("submit")}</Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PersonForm;
