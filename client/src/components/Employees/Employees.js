import React, { useState } from "react";
import { Avatar, Table, Button, Modal } from "antd";

import AddEmployee from "./AddEmployee";
import "./Employees.css";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    salary: 1200000,
  },
  {
    key: "2",
    name: "John",
    age: 42,
    salary: 1200000,
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (value) => {
      return (
        <div className="avatar">
          <Avatar className="avatar__logo">J</Avatar>
          <div className="avatar__details">
            Jay <br />
            kaneriyajay3@gmail.com
          </div>
        </div>
      );
    },
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Salary",
    dataIndex: "salary",
    key: "salary",
    render: (value) => `₹ ${value} PA`,
  },
];

const Employees = (props) => {
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

  return (
    <>
      <div className="main-layout__heading">Employees</div>
      <Button onClick={showModal} className="btn__add" type="primary">
        Add Employee
      </Button>
      <Modal
        title="Add Employee"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        <AddEmployee />
      </Modal>

      <Table className="table" dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Employees;
