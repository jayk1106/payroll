import React from "react";
import { Space, Table, Button, Modal } from "antd";

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

export default function UserProfile() {
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

  return (
    <>
      <div className="heading">Employee Profile</div>
      <Button className="btn__add" type="primary" onClick={confirm}>
        Make As Admin
      </Button>

      <div className="main">
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <h3 className="heading__details">Personal Information</h3>
          <div className="main__div">
            <div className="div__left">
              <p>Name: Jay Kaneriya</p>
              <p>Email: kaneriyajay3@gmail.com</p>
            </div>
            <div className="div__right">
              <p>Gender: Male</p>
              <p>Age: 24</p>
            </div>
          </div>

          <div className="divider"></div>

          <h3 className="heading__details">Organizational Information</h3>
          <div className="main__div">
            <div className="div__left">
              <p>Department: I.T.</p>
              <p>Branch: New York</p>
            </div>
            <div className="div__right">
              <p>Date Of Join: 11 June 2019</p>
              <p>Salary: 12 LPA</p>
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
  );
}
