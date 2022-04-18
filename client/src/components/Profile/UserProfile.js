import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Space, Table, Button, Modal, Spin, Tag, Alert } from "antd";

import useHttp from "../../hooks/useHttp";
import AddEmployee from "../Employees/AddEmployee";
import "./UserProfile.css";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export default function UserProfile(props) {
  const URL = props.api_url;

  const { sendRequest, isLoadding, error } = useHttp();

  const [employeeData, setEmployeeData] = useState({});
  const [employeeIsAdmin, setEmployeeIsAdmin] = useState(false);

  const { employeeId } = useParams();
  const getEmployeeData = async () => {
    try {
      const res = await sendRequest({
        url: `${URL}/employee/${employeeId}`,
        options: {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      });

      if (error) {
        throw new Error(error);
      }

      if (res && res.details) {
        console.log(res);
        setEmployeeData(res.details);
        setEmployeeIsAdmin(res.isAdmin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirm = () => {
    Modal.confirm({
      title: "Make As Admin",
      // icon: <ExclamationCircleOutlined />,
      content: "Are you sure, you want to make an admin?",
      okText: "Make As Admin",
      cancelText: "Cancel",
      onOk() {
        Modal.destroyAll();
      },
    });
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

  useEffect(() => {
    getEmployeeData();
  }, [isModalVisible]);

  console.log(employeeData);
  console.log(employeeIsAdmin);

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
              <Tag color="success" style={{ margin: "auto" }}>
                Admin
              </Tag>
            )}

            <Button type="primary" onClick={showModal}>
              Edit
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
                url={URL}
              />
            </Modal>
          </Space>

          <div className="main">
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <h3 className="heading__details">Personal Information</h3>
              <div className="main__div">
                <div className="div__left">
                  <p>
                    Name: {employeeData.e_fname + " " + employeeData.e_lname}
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
                    Date Of Join:{" "}
                    {new Date(employeeData.join_date).getDate() +
                      "/" +
                      new Date(employeeData.join_date).getMonth() +
                      "/" +
                      new Date(employeeData.join_date).getFullYear()}
                  </p>
                  <p>Salary: {employeeData.e_salary_per_year}</p>
                </div>
              </div>

              <div className="divider"></div>

              <div className="main__div">
                <div className="div__left">
                  <h3 className="heading__details">Pending Requests</h3>
                  <Table
                    className="table"
                    columns={columns}
                    dataSource={dataSource}
                  />
                </div>
                <div className="div__right">
                  <h3 className="heading__details">Pending Salary</h3>
                  <Table
                    className="table"
                    columns={columns}
                    dataSource={dataSource}
                  />
                </div>
              </div>
            </Space>
          </div>
        </>
      )}
    </>
  );
}
