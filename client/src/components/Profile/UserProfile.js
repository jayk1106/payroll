import React, { useState, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Space, Button, Modal, Spin, Tag, Alert, message, Tabs } from 'antd';

import useHttp from '../../hooks/useHttp';
import AddEmployee from '../Employees/AddEmployee';
import UserProfileUserData from './UserProfileUserData';
import './UserProfile.css';

export default function UserProfile(props) {
  const { TabPane } = Tabs;

  const URL = props.api_url;

  const { sendRequest, isLoadding, error } = useHttp();

  const [employeeData, setEmployeeData] = useState({});
  const [employeeIsAdmin, setEmployeeIsAdmin] = useState(false);

  const { employeeId } = useParams();

  const getMessage = (msg) => {
    message.success(msg);
  };

  const getEmployeeData = async () => {
    try {
      const res = await sendRequest({
        url: `${URL}/employee/${employeeId}`,
        options: {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      });

      if (error) {
        throw new Error(error);
      }

      if (res && res.details) {
        setEmployeeData(res.details);
        setEmployeeIsAdmin(res.isAdmin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const confirm = () => {
    Modal.confirm({
      title: 'Make As Admin',
      // icon: <ExclamationCircleOutlined />,
      content: 'Are you sure, you want to make an admin?',
      okText: 'Make As Admin',
      cancelText: 'Cancel',
      async onOk() {
        const res = await sendRequest({
          url: `${URL}/employee/make-admin/${employeeId}`,
          options: {
            method: 'PUT',
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        });

        if (res) {
          console.log(res);
          getMessage(res.message);
          getEmployeeData();

          Modal.destroyAll();
        }
      },
    });
  };

  const generateSalaryHandler = async () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const res = await sendRequest({
      url: `${URL}/salary/generate-salary/${employeeData.id}?month=${month}&year=${year}`,
      options: {
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    });

    if (res) {
      getMessage(res.message);
    }
  };

  useLayoutEffect(() => {
    getEmployeeData();
  }, []);

  return (
    <>
      <div className="heading">Employee Profile</div>

      {isLoadding && (
        <div className="example">
          <Spin />
        </div>
      )}

      {error && (
        <>
          <div className="errorContainer">
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
          <Space direction="horizontal" size="large">
            {!employeeIsAdmin && (
              <Button type="primary" onClick={confirm}>
                Make As Admin
              </Button>
            )}

            {employeeIsAdmin && (
              <Tag color="success" style={{ margin: 'auto' }}>
                Admin
              </Tag>
            )}

            <Button type="primary" onClick={showModal}>
              Edit
            </Button>

            <Button type="primary">
              <Link to={{ pathname: `/employees/${employeeId}/deduction` }}>
                Deduction
              </Link>
            </Button>

            <Button type="primary" onClick={generateSalaryHandler}>
              Generate Salary
            </Button>

            <Modal
              title="Edit Details"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              style={{ top: 20 }}
            >
              <AddEmployee
                data={employeeData}
                closeModal={handleCancel}
                reloadData={getEmployeeData}
                url={URL}
              />
            </Modal>
          </Space>

          <div className="main">
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}
            >
              <h3 className="heading__details">Personal Information</h3>
              <div className="main__div">
                <div className="div__left">
                  <p>
                    Name: {employeeData.e_fname + ' ' + employeeData.e_lname}
                  </p>
                  <p>Email: {employeeData.e_email}</p>
                </div>
                <div className="div__right">
                  <p>Gender: {employeeData.e_gender}</p>
                  <p>Age: {employeeData.e_age}</p>
                </div>
              </div>

              <div className="divider"></div>

              <h3 className="heading__details">Organizational Information</h3>
              <div className="main__div">
                <div className="div__left">
                  <p>Department: {employeeData.dp_name}</p>
                  <p>Branch: {employeeData.br_name}</p>
                </div>
                <div className="div__right">
                  <p>
                    Date Of Join:{' '}
                    {new Date(employeeData.join_date).getDate() +
                      '/' +
                      new Date(employeeData.join_date).getMonth() +
                      '/' +
                      new Date(employeeData.join_date).getFullYear()}
                  </p>
                  <p>Salary: {employeeData.e_salary_per_year}</p>
                </div>
              </div>

              <div className="divider"></div>

              {employeeData.id && (
                <Tabs defaultActiveKey="salary">
                  <TabPane tab="Salary" key="salary">
                    <UserProfileUserData
                      api_url={URL}
                      requestType="salary"
                      eId={employeeData.id}
                    />
                  </TabPane>
                  <TabPane tab="Credit" key="credit">
                    <UserProfileUserData
                      api_url={URL}
                      requestType="credit"
                      eId={employeeData.id}
                    />
                  </TabPane>
                  <TabPane tab="Loan" key="loan">
                    <UserProfileUserData
                      api_url={URL}
                      requestType="loan"
                      eId={employeeData.id}
                    />
                  </TabPane>
                  <TabPane tab="Leave" key="leave">
                    <UserProfileUserData
                      api_url={URL}
                      requestType="leave"
                      eId={employeeData.id}
                    />
                  </TabPane>
                </Tabs>
              )}
            </Space>
          </div>
        </>
      )}
    </>
  );
}
