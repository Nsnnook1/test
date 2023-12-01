import React, { useState } from "react";
import { Card, Button, Form, Input, Select, Col, Row, DatePicker, Radio } from "antd";
import "../styles/management-page.scss";

type FieldType = {
  title?: string;
  name?: string;
  lastname?: string;
};

interface FormValues {
  title: string;
  name: string;
  lastname: string;
  birthdate: string;
  national: string;
  idCard?: string[];
  gender: number;
  mobilePrefix: string;
  mobileNumber: string;
  passport?: string;
  expectedSalary: string;
}

const PersonForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    name: '',
    lastname: '',
    birthdate: '',
    national: '',
    idCard: ['', '', '', '', ''],
    gender: 1, 
    mobilePrefix: '08',
    mobileNumber: '',
    passport: '',
    expectedSalary: '',
  });
  
  return (
    <div className="management-card">
      <Card>
        <Form>
          <Row>
            {/* แถวแรก */}
            <Col xs={8}>
              <Form.Item<FieldType>
                label="คำนำหน้า"
                name="title"
                rules={[
                  { required: true, message: "Please input your title!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item<FieldType>
                label="ชื่อจริง"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item<FieldType>
                label="นามสกุล"
                name="lastname"
                rules={[
                  { required: true, message: "Please input your lastname!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            {/* แถว 2 */}
            <Col xs={8}>
              <Form.Item label="วันเกิด">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col xs={3}>สัญชาติ:</Col>
            <Col xs={16}>
              <Input placeholder="เบอร์โทรศัพท์" />
            </Col>
          </Row>
          <Row>
            {/* แถว 3 */}
            <Col xs={3}>เลขบัตรประชาชน:</Col>
            <Col xs={3}>
              <Input placeholder="Basic usage" />
            </Col>
            <Col xs={1}>
              <span className="management-input-center">-</span>
            </Col>
            <Col xs={3}>
              <Input placeholder="Basic usage" />
            </Col>
            <Col xs={1}>
              <span className="management-input-center">-</span>
            </Col>
            <Col xs={3}>
              <Input placeholder="Basic usage" />
            </Col>
            <Col xs={1}>
              <span className="management-input-center">-</span>
            </Col>
            <Col xs={3}>
              <Input placeholder="Basic usage" />
            </Col>
            <Col xs={1}>
              <span className="management-input-center">-</span>
            </Col>
            <Col xs={3}>
              <Input placeholder="Basic usage" />
            </Col>
          </Row>
          
          <Row>
            {/* แถว 4 */}
            <Col>
              <Radio.Group>
                <Radio value={1}>ผู้ชาย</Radio>
                <Radio value={2}>ผู้หญิง</Radio>
                <Radio value={3}>ไม่ระบุ</Radio>
              </Radio.Group>
            </Col>
          </Row>

          <Row>
            {/* แถว 5 */}
            <Col xs={8}>
              <Form.Item label="หมายเลขโทรศัพท์มือถือ">
                <Select
                  defaultValue="08"
                  // style={{ width: 120 }}
                  // onChange={handleChange}
                  options={[
                    { value: "06", label: "06" },
                    { value: "08", label: "08" },
                    { value: "09", label: "09" }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={1}>
              <span className="management-input-center">-</span>
            </Col>
            <Col xs={12}>
              <Input placeholder="Basic usage" />
            </Col>
          </Row>

          <Row>
            {/* แถว 6 */}
            <Col xs={3}>หนังสือเดินทาง:</Col>
            <Col xs={8}>
              <Input placeholder="Basic usage" />
            </Col>
          </Row>

          <Row>
            {/* แถว 7 */}
            <Col xs={3}>เงินเดือนที่คาดหวัง:</Col>
            <Col xs={8}>
              <Input placeholder="Basic usage" />
            </Col>
            <Col xs={2} offset={2}>
              <Button>ล้างข้อมูล</Button>
            </Col>
            <Col xs={2} offset={2}>
              <Button>ส่งข้อมูล</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default PersonForm;
