import React, { useState } from "react";
import { Button, Checkbox, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";

interface DataType {
  key: React.Key;
  name: string;
  gender: string;
  mobile: number;
  nationality: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    sorter: (a, b) => a.gender.length - b.gender.length,
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    sorter: {
      compare: (a, b) => a.mobile - b.mobile,
      multiple: 5,
    },
  },
  {
    title: "Nationality",
    dataIndex: "nationality",
    sorter: (a, b) => a.nationality.length - b.nationality.length,
  },
  {
    title: "Manage",
    key: "manage",
    render: (text: any, record: any) => (
      <div>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Ant Ant",
    gender: "a",
    mobile: 90,
    nationality: "a",
  },
  {
    key: "2",
    name: "B Boyy",
    gender: "bb",
    mobile: 91,
    nationality: "b",
  },
  {
    key: "3",
    name: "C Cat",
    gender: "ccc",
    mobile: 92,
    nationality: "c",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const PersonTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Checkbox>เลือกทั้งหมด</Checkbox>
      <Button>ลบข้อมูล</Button>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};

export default PersonTable;
