import React, { useState, useEffect } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { Button, Checkbox, Table, Modal, Input, Col } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getPersons, editPerson, deletePerson } from "../features/personsSlice";
import "../styles/person-table.scss";

interface DataType {
  key: React.Key;
  name: string;
  gender: string;
  mobileNumber: number;
  national: string;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
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

interface EditPersons {
  name: string;
  gender: number;
  mobileNumber: number;
  national?: string;
}

const PersonTable: React.FC = () => {
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const dispatch = useDispatch();
  const persons = useSelector(getPersons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelect, setIsSelect] = useState(0);
  const localStorageValue: string | null = localStorage.getItem('persons');
  const dataSource: readonly DataType[] = localStorageValue ? JSON.parse(localStorageValue) : [];
  const localPersons = JSON.parse(localStorage.getItem('persons') || '[]');
  const personIndex = localPersons.findIndex((person: Persons) => person.key === isSelect);

  const [editForm, setEditForm] = useState<EditPersons>({
    name: '',
    gender: 0,
    mobileNumber: 0,
    national: ''
  });

  const handleInputChange = (fieldName: string, value: any) => {
    setEditForm((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);

    if (personIndex !== -1) { 
      const formData = {
        key: isSelect,
        title: localPersons[personIndex].title,
        name: editForm.name ? editForm.name : localPersons[personIndex].name,
        lastname: localPersons[personIndex].lastname,
        birthdate: localPersons[personIndex].birthdate,
        national: editForm.national ? editForm.national : localPersons[personIndex].national,
        idCard: localPersons[personIndex].idCard,
        gender: editForm.gender ? editForm.name : localPersons[personIndex].gender,
        mobilePrefix: localPersons[personIndex].mobilePrefix,
        mobileNumber: editForm.mobileNumber ? editForm.mobileNumber : localPersons[personIndex].mobileNumber,
        passport: localPersons[personIndex].passport,
        expectedSalary: localPersons[personIndex].expectedSalary,
      }

      localPersons[personIndex] = formData

      localStorage.setItem('persons', JSON.stringify(localPersons));
      dispatch(editPerson(formData));
    }
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditForm({
      name: persons.name,
      gender: persons.gerder,
      mobileNumber: persons.mobileNumber,
      national: persons.national
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: <div>{t("name")}</div>,
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title:  <div>{t("gender")}</div>,
      dataIndex: "gender",
      sorter: (a, b) => a.gender.length - b.gender.length,
    },
    {
      title:  <div>{t("phoneNumber")}</div>,
      dataIndex: "mobileNumber",
      sorter: {
        compare: (a, b) => a.mobileNumber - b.mobileNumber,
        multiple: 5,
      },
    },
    {
      title: <div>{t("nationality")}</div>,
      dataIndex: "national",
      sorter: (a, b) => a.national.length - b.national.length,
    },
    {
      title: <div>{t("manage")}</div>,
      key: "manage",
      render: (text: any, record: any) => (
        <div className="table-button">
          <Button onClick={() => handleEdit(record.key)}>{t("edit")}</Button>
          <Button onClick={() => handleDelete(record.key)}>{t("delete")}</Button>
        </div>
      ),
    },
  ];

  const handleEdit = (key: number) => {
    setIsSelect(key)
    showModal();
  }
  
  const handleDelete = (key: number) => {
    const updatedPersons = localPersons.filter((person: Persons) => person.key !== key);

    localStorage.setItem('persons', JSON.stringify(updatedPersons));
    dispatch(deletePerson(key));
  };

  return (
    <div className="table-box">
      <div className="table-select">
        <Checkbox>{t("selectAll")}</Checkbox>
        <Button>{t("delete")}</Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
      />
      <Modal title="Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Col xs={4}>
          {t("firstname")}:
        </Col>
        <Col xs={18} style={{ marginRight: "20px" }}>
          <Input
            onChange={(e) => handleInputChange("name", e.target.value)}
            value={editForm.name}
            placeholder="ชื่อจริง"
          />
        </Col>

        <Col xs={4}>
          {t("gender")}:
        </Col>
        <Col xs={18} style={{ marginRight: "20px" }}>
          <Input
            onChange={(e) => handleInputChange("gender", e.target.value)}
            value={editForm.gender}
            placeholder="เพศ"
          />
          <div style={{ color: "red" }}>กรุณากรอกเป็นตัวเลขโดย 1 = {t("man")}, 2 = {t("women")} และ 3 = {t("notSpecified")}</div>
        </Col>
        <Col xs={4}>
          {t("phoneNumber")}:
        </Col>
        <Col xs={18} style={{ marginRight: "20px" }}>
          <Input
            onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
            value={editForm.mobileNumber}
            placeholder="เบอร์โทรศัพท์"
          />
        </Col>

        <Col xs={4}>
            {t("nationality")}:
        </Col>
        <Col xs={18} style={{ marginRight: "20px" }}>
          <Input
            onChange={(e) => handleInputChange("national", e.target.value)}
            value={editForm.national}
            placeholder={"สัญชาติ"}
          />
        </Col>
      </Modal>
    </div>
  );
};

export default PersonTable;
