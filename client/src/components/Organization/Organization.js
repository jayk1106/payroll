import React, { useState, useEffect, useContext } from 'react';

import {
  Space,
  Spin,
  Table,
  Alert,
  Button,
  Modal,
  Form,
  Input,
  message,
} from 'antd';

import useHttp from '../../hooks/useHttp';
import authContext from '../../context/auth/authContext';
import style from './Organization.module.css';

export default function Organization(props) {
  const URL = props.api_url;
  const { organizationId } = useContext(authContext);
  const { sendRequest, error, isLoadding } = useHttp();

  const [organizationData, setOrganizationData] = useState({});
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [isAddBranchModalVisible, setIsAddBranchModalVisible] = useState(false);
  const [isAddDepartmentModalVisible, setIsAddDepartmentModalVisible] =
    useState(false);

  const showAddBranchModal = () => {
    setIsAddBranchModalVisible(true);
  };

  const showAddDepartmentModal = () => {
    setIsAddDepartmentModalVisible(true);
  };

  const handleAddDepartmentCancel = () => {
    setIsAddDepartmentModalVisible(false);
  };
  const handleAddDepartmentOk = () => {
    setIsAddDepartmentModalVisible(false);
  };

  const handleAddBranchCancel = () => {
    setIsAddBranchModalVisible(false);
  };
  const handleAddBranchOk = () => {
    setIsAddBranchModalVisible(false);
  };

  const getOrganizationData = async () => {
    const res = await sendRequest({
      url: `${URL}/organization/${organizationId}`,
      options: {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    });

    if (res) {
      setOrganizationData(res.organization);
      setBranches(res.branches);
      setDepartments(res.departments);
    }
  };

  useEffect(() => {
    getOrganizationData();
  }, []);

  const getMessage = (msg) => {
    message.success(msg);
  };

  const addData = async (key, data) => {
    const res = await sendRequest({
      url: `${URL}/${key}`,
      options: {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    });

    if (res) {
      getOrganizationData();

      if (key === 'branch') {
        handleAddBranchOk();
      }
      if (key === 'department') {
        handleAddDepartmentOk();
      }
      getMessage(res.message);
    }
  };

  const addBranchHandler = (values) => {
    addData('branch', values);
  };

  const addDepartmentHandler = (values) => {
    addData('department', values);
  };

  const columnDepartment = [
    {
      title: 'Name',
      dataIndex: 'dp_name',
      key: 'department',
    },
    {
      title: 'Description',
      dataIndex: 'dp_description',
      key: 'description',
    },
  ];

  const columnBranch = [
    {
      title: 'Name',
      dataIndex: 'br_name',
      key: 'branch',
    },
    {
      title: 'City',
      dataIndex: 'br_city',
      key: 'city',
    },
    {
      title: 'Country',
      dataIndex: 'br_country',
      key: 'country',
    },
    {
      title: 'Address',
      dataIndex: 'br_address',
      key: 'address',
    },
  ];

  return (
    <>
      <div className={style.heading}>Organization Details</div>
      <Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
        <Button
          className="btn__add"
          type="primary"
          onClick={showAddBranchModal}
        >
          Add Branch
        </Button>
        <Button
          className="btn__add"
          type="primary"
          onClick={showAddDepartmentModal}
        >
          Add Dapartment
        </Button>
      </Space>
      {isLoadding && (
        <div className={style.example}>
          <Spin />
        </div>
      )}
      {error && !organizationData && (
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
      {!isLoadding && (!error || branches) && (
        <div className={style.main}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <div className={style.main__div}>
              <div className={style.div__left}>
                <p>Name : {organizationData.org_name}</p>
                <p>
                  Created At :
                  {new Date(organizationData.created_at).getDate() +
                    '-' +
                    new Date(organizationData.created_at).getMonth() +
                    '-' +
                    new Date(organizationData.created_at).getFullYear()}
                </p>
                <p>Address : {organizationData.org_address}</p>
              </div>
              <div className={style.div__right}>
                <p>City : {organizationData.org_city}</p>
                <p>Country : {organizationData.org_country} </p>
              </div>
            </div>

            <div className={style.divider}></div>
            <div className={style.main__div}>
              <div className={style.div__left}>
                <h3>Branches</h3>
                <Table
                  columns={columnBranch}
                  dataSource={branches}
                  pagination={{ pageSize: 5 }}
                  rowKey="id"
                  className={style.table}
                />
              </div>
              <div className={style.div__right}>
                <h3>Departments</h3>

                <Table
                  columns={columnDepartment}
                  dataSource={departments}
                  pagination={{ pageSize: 5 }}
                  rowKey="id"
                  className={style.table}
                />
              </div>
            </div>
          </Space>
        </div>
      )}
      <Modal
        title="Add Branch"
        visible={isAddBranchModalVisible}
        onOk={handleAddBranchOk}
        onCancel={handleAddBranchCancel}
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
          onFinish={addBranchHandler}
        >
          <Form.Item
            hidden={true}
            name="organization"
            initialValue={organizationId}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Branch Name" name="br_name">
            <Input />
          </Form.Item>

          <Form.Item label="Branch City" name="br_city">
            <Input />
          </Form.Item>

          <Form.Item label="Branch Country" name="br_country">
            <Input />
          </Form.Item>

          <Form.Item label="Branch Address" name="br_address">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoadding}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Department"
        visible={isAddDepartmentModalVisible}
        onOk={handleAddDepartmentOk}
        onCancel={handleAddDepartmentCancel}
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
          onFinish={addDepartmentHandler}
        >
          <Form.Item
            hidden={true}
            name="organization"
            initialValue={organizationId}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Department Name" name="dp_name">
            <Input />
          </Form.Item>

          <Form.Item label="Department Description" name="dp_description">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoadding}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
