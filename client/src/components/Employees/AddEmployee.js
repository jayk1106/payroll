import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
} from "antd";

import style from "./AddEmployee.module.css";

const AddEmployee = () => {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 24,
      }}
      layout="vertical"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <Form.Item label="First Name">
        <Input />
      </Form.Item>
      <Form.Item label="Last Name">
        <Input />
      </Form.Item>

      <Form.Item label="Email">
        <Input />
      </Form.Item>
      <Form.Item label="Password">
        <Input.Password />
      </Form.Item>

      <Form.Item label="Age">
        <Input />
      </Form.Item>

      <Form.Item label="Department">
        <Select>
          <Select.Option value="I.T.">I.T.</Select.Option>
          <Select.Option value="H.R.">H.R.</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Branch">
        <Select>
          <Select.Option value="New York">New York</Select.Option>
          <Select.Option value="Ahmedabad">Ahmedabad</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Date Of Join">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Salary">
        <InputNumber />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEmployee;
