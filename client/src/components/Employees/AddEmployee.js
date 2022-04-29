import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Alert,
  message,
} from 'antd';

import useHttp from '../../hooks/useHttp';
import authContext from '../../context/auth/authContext';

const AddEmployee = (props) => {
  const URL = props.url;
  const { sendRequest, error, isLoadding } = useHttp();
  const { organizationId } = useContext(authContext);
  const [componentSize, setComponentSize] = useState('default');

  const [value, setValue] = useState(1);
  const [branches, setBranches] = useState([]);
  const [department, setDepartment] = useState([]);
  const [errorContent, setErrorContent] = useState(null);
  let isEdit = false;

  const data = props.data;

  const dateFormat = 'YYYY/MM/DD';

  const getBranchAndDepartment = async () => {
    const res = await sendRequest({
      url: `${URL}/general/form-select-values/${organizationId}`,
      options: {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    });
    if (res && res.branches && res.departments) {
      setBranches(res.branches);
      setDepartment(res.departments);
    }
  };

  useEffect(() => {
    getBranchAndDepartment();
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const getMessage = (msg) => {
    message.success(msg);
  };

  if (data !== null) {
    isEdit = true;
  }
  const addEmployeeHandler = async (values) => {
    const employeeData = {
      ...values,
      join_date:
        values.join_date._d.getFullYear() +
        '-' +
        values.join_date._d.getMonth() +
        '-' +
        values.join_date._d.getDate(),
    };
    console.log(employeeData);
    let method = 'POST';

    if (isEdit) {
      method = 'PUT';
    }

    const res = await sendRequest({
      url: `${URL}/employee`,
      options: {
        method: method,
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      },
    });

    if (!res) {
      setErrorContent(
        <Alert
          message="Something went wrong !!"
          type="error"
          showIcon
          closable
        />
      );
    }

    if (res) {
      props.closeModal();
      props.reloadData();
      getMessage(res.message);
    }
  };

  return (
    <>
      {errorContent && <div>{errorContent}</div>}
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
        onFinish={addEmployeeHandler}
      >
        <Form.Item
          label="First Name"
          name="e_fname"
          initialValue={data?.e_fname}
        >
          <Input />
        </Form.Item>

        <Form.Item hidden={true} name="id" initialValue={data?.id}>
          <Input />
        </Form.Item>

        <Form.Item
          hidden={true}
          name="organization"
          initialValue={organizationId}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="e_lname"
          initialValue={data?.e_lname}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="e_email" initialValue={data?.e_email}>
          <Input />
        </Form.Item>

        {!isEdit && (
          <Form.Item label="Password" name="e_password">
            <Input.Password />
          </Form.Item>
        )}
        <Form.Item label="Age" name="e_age" initialValue={data?.e_age}>
          <Input />
        </Form.Item>

        <Form.Item label="Gender" name="e_gender" initialValue={data?.e_gender}>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={'Male'}>Male</Radio>
            <Radio value={'Female'}>Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          initialValue={data?.department}
        >
          <Select>
            {department.map((d) => (
              <Select.Option key={d.id} value={d.id}>
                {d.dp_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Branch" name="branch" initialValue={data?.branch}>
          <Select>
            {branches.map((b) => (
              <Select.Option key={b.id} value={b.id}>
                {b.br_name}, {b.br_city}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {!data && (
          <>
            <Form.Item label="Date Of Join" name="join_date">
              <DatePicker />
            </Form.Item>
          </>
        )}

        {data && (
          <>
            <Form.Item
              label="Date Of Join"
              name="join_date"
              initialValue={moment(data.join_date, dateFormat)}
            >
              <DatePicker
                defaultValue={moment(data.join_date, dateFormat)}
                format={dateFormat}
              />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="Salary"
          name="e_salary_per_year"
          initialValue={data?.e_salary_per_year}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoadding}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddEmployee;
