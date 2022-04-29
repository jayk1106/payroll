import React, { useEffect, useState, useContext } from 'react';
import {
  Avatar,
  Table,
  Button,
  Modal,
  Spin,
  Alert,
  Form,
  Input,
  Select,
  InputNumber,
  message,
} from 'antd';
import { useParams } from 'react-router-dom';

import authContext from '../../context/auth/authContext';
import useHttp from '../../hooks/useHttp';
import style from './Deduction.module.css';

export default function Deduction(props) {
  const { employeeId } = useParams();
  const { organizationId } = useContext(authContext);

  const URL = props.api_url;
  const { sendRequest, error, isLoadding } = useHttp();

  const [componentSize, setComponentSize] = useState('default');

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [modalData, setModalData] = useState();

  const [employeeDeductionData, setEmployeeDeductionData] = useState([]);
  const [deductionType, setDeductionType] = useState([]);

  const getMessage = (msg) => {
    message.success(msg);
  };

  const getEmployeeDeductionData = async () => {
    const res = await sendRequest({
      url: `${URL}/deduction/${employeeId}`,
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
      setEmployeeDeductionData(res.deductions);
    }
  };

  const getDeductionType = async () => {
    const res = await sendRequest({
      url: `${URL}/deduction-type/${organizationId}`,
      options: {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    });
    if (res) {
      setDeductionType(res.deductionTypes);
    }
  };

  const addDeductionHandler = async (values) => {
    const res = await sendRequest({
      url: `${URL}/deduction`,
      options: {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      },
    });

    if (!res) {
      getEmployeeDeductionData();
    }

    if (res) {
      handleAddCancel();
      getEmployeeDeductionData();
      getMessage(res.message);
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddOk = () => {
    setIsAddModalVisible(false);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const showDetailModal = (id) => {
    setIsDetailModalVisible(true);
    setModalData(employeeDeductionData.filter((cd) => cd.id === id));
  };

  const handleDetailOk = () => {
    setIsDetailModalVisible(false);
  };

  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
  };

  useEffect(() => {
    getEmployeeDeductionData();
    getDeductionType();
  }, []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (value) => {
        return (
          new Date(value).getDate() +
          '/' +
          new Date(value).getMonth() +
          '/' +
          new Date(value).getFullYear()
        );
      },
    },
    {
      title: 'Details',
      dataIndex: 'id',
      key: 'id',
      render: (value) => {
        return (
          <>
            <Button onClick={showDetailModal.bind(null, value)} type="primary">
              Check Details
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className={style.heading}>Deductions</div>

      {isLoadding && (
        <div className={style.example}>
          <Spin />
        </div>
      )}

      {error && (
        <>
          <div className={style.errorContainer}>
            <Alert
              message="Somthing went wrong!"
              type="error"
              showIcon
              closable
            />
          </div>
        </>
      )}

      {!isLoadding && !error && (
        <>
          <Button type="primary" onClick={showAddModal}>
            Add Deduction
          </Button>
          {employeeDeductionData.length > 0 && (
            <div className={style.avatar}>
              <Avatar className={style?.avatar__logo}>
                {employeeDeductionData[0]?.e_fname[0].toUpperCase()}
              </Avatar>
              <div className={style.avatar__details}>
                {employeeDeductionData[0]?.e_fname +
                  ' ' +
                  employeeDeductionData[0]?.e_lname}
                <br />
                {employeeDeductionData[0]?.e_email}
              </div>
            </div>
          )}

          <Table
            className={style.table}
            pagination={{ pageSize: 5 }}
            dataSource={employeeDeductionData}
            columns={columns}
            rowKey="id"
          />
        </>
      )}

      <Modal
        title="Add Deduction"
        visible={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        style={{ top: 20 }}
      >
        {error && (
          <>
            <div className={style.errorContainer}>
              <Alert
                message="Somthing went wrong!"
                type="error"
                showIcon
                closable
              />
            </div>
          </>
        )}
        <Form
          labelCol={{
            span: 8,
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
          onFinish={addDeductionHandler}
        >
          <Form.Item hidden={true} name="employee" initialValue={employeeId}>
            <Input />
          </Form.Item>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Select Deduction Type" name="type">
            <Select>
              {deductionType.map((d) => (
                <Select.Option key={d.id} value={d.id}>
                  {d.dt_title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoadding}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Deduction Details"
        visible={isDetailModalVisible}
        onOk={handleDetailOk}
        onCancel={handleDetailCancel}
        style={{ top: 20 }}
      >
        {modalData && (
          <>
            <p>Title : {modalData[0].title}</p>
            <p>Description : {modalData[0].description}</p>
            <p>Amount : {modalData[0].amount}</p>
            <p>
              Date :
              {new Date(modalData[0].date).getDate() +
                '-' +
                new Date(modalData[0].date).getMonth() +
                '-' +
                new Date(modalData[0].date).getFullYear()}
            </p>
          </>
        )}
      </Modal>
    </>
  );
}
