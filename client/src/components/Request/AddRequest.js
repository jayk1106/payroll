import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Alert,
  Spin,
  DatePicker,
} from 'antd';

import useHttp from '../../hooks/useHttp';
import authContext from '../../context/auth/authContext';
import style from './Requests.module.css';

export default function AddRequest(props) {
  let URL = '';
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();

  const { sendRequest, error, isLoadding } = useHttp();
  const { organizationId, id } = useContext(authContext);

  const [type, setType] = useState();
  const [typeData, setTypeData] = useState([]);

  const getRequestTypeHandler = async (values) => {
    URL = `${props.api_url}/${values.requestType}s-type/${organizationId}`;
    setType(values.requestType);

    const res = await sendRequest({
      url: URL,
      options: {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    });

    if (error) {
      console.log(error);
    }

    if (res) {
      if (values.requestType === 'credit') {
        setTypeData(res.creditsTypes);
      }
      if (values.requestType === 'loan') {
        setTypeData(res.loanTypes);
      }
      if (values.requestType === 'leave') {
        setTypeData(res.leaveTypes);
      }
    }
  };
  let requestData = null;
  const addRequestHandler = async (values) => {
    if (type != 'leave') {
      requestData = { ...values };
    }
    if (type === 'leave') {
      requestData = {
        employee: values.employee,
        title: values.title,
        description: values.description,
        type: values.type,
        duration_in_days: values.duration_in_days,
        start_date:
          values['range-picker'][0]._d.getFullYear() +
          '-' +
          values['range-picker'][0]._d.getMonth() +
          '-' +
          values['range-picker'][0]._d.getDate(),
        end_date:
          values['range-picker'][1]._d.getFullYear() +
          '-' +
          values['range-picker'][1]._d.getMonth() +
          '-' +
          values['range-picker'][1]._d.getDate(),
      };
    }

    const res = await sendRequest({
      url: `${props.api_url}/${type}`,
      options: {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      },
    });
    if (error) {
      console.log(error);
    }
    if (res) {
      navigate('/requests');
    }
  };

  return (
    <>
      <div className={style.heading}>Add Request</div>

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 8,
        }}
        layout="vertical"
        onFinish={getRequestTypeHandler}
      >
        <Form.Item
          label="Select Request Type"
          name="requestType"
          initialValue="credit"
        >
          <Select>
            <Select.Option key="credit" value="credit">
              Credit
            </Select.Option>
            <Select.Option key="loan" value="loan">
              Loan
            </Select.Option>
            <Select.Option key="leave" value="leave">
              Leave
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {error && (
        <>
          <div className={style.errorContainer}>
            <Alert
              message="Somthing went wrong"
              type="error"
              showIcon
              closable
            />
          </div>
        </>
      )}

      {isLoadding && !error && (
        <div className={style.example}>
          <Spin />
        </div>
      )}

      {typeData.length > 0 && !isLoadding && !error && (
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 15,
          }}
          layout="vertical"
          onFinish={addRequestHandler}
        >
          <Form.Item hidden={true} name="employee" initialValue={id}>
            <Input />
          </Form.Item>

          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          {type != 'leave' && (
            <Form.Item label="Amount" name="amount">
              <InputNumber />
            </Form.Item>
          )}

          {type === 'leave' && (
            <>
              <Form.Item name="range-picker" label="Start Date to End Date">
                <RangePicker />
              </Form.Item>
              <Form.Item name="duration_in_days" label="Duration in Days">
                <InputNumber />
              </Form.Item>
            </>
          )}

          <Form.Item label={`Select ${type} Type`} name="type">
            <Select>
              {typeData.map((tData) => (
                <Select.Option key={tData.id} value={tData.id}>
                  {type === 'credit' && tData.ct_title}
                  {type != 'credit' && tData.lt_title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
