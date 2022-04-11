import React, { useState, useEffect, useContext } from "react";
import { Avatar, Table, Button, Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import useHttp from "../../hooks/useHttp";
import authContext from "../../context/auth/authContext";
import AddEmployee from "./AddEmployee";
import "./Employees.css";

const Employees = (props) => {
  const URL = props.api_url;
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { organizationId } = useContext(authContext);
  const { sendRequest, isLoadding, error } = useHttp();

  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    const res = await sendRequest({
      url: `${URL}/employee/all/${organizationId}`,
      options: {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    });

    if (!res || res.employees.length === 0 || error) {
      return;
    }

    if (res && res.employees && res.employees.length > 0) {
      setEmployees(
        res.employees.map((e) => ({
          ...e,
          avatar: {
            name: e.e_fname + " " + e.e_lname,
            email: e.e_email,
          },
          employeeId: e.id,
        }))
      );
    }
  };

  useEffect(() => {
    getEmployees();
  }, [isModalVisible]);

  const columns = [
    {
      title: "Name",
      dataIndex: "avatar",
      key: "avatar",
      render: (value) => {
        return (
          <div className="avatar">
            <Avatar className="avatar__logo">
              {value.name[0].toUpperCase()}
            </Avatar>
            <div className="avatar__details">
              {value.name} <br />
              {value.email}
            </div>
          </div>
        );
      },
    },
    {
      title: "Branch",
      dataIndex: "br_name",
      key: "branch",
    },
    {
      title: "Department",
      dataIndex: "dp_name",
      key: "department",
    },
    {
      title: "Details",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (value) => {
        const getEmployeeById = () => {
          navigate(`/employees/${value}`);
        };
        return (
          <>
            <Button onClick={getEmployeeById} type="primary">
              Check Details
            </Button>
          </>
        );
      },
    },
  ];

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
        <AddEmployee data={null} closeModal={handleCancel} url={URL} />
      </Modal>
      {isLoadding && (
        <div className="example">
          <Spin />
        </div>
      )}
      {!isLoadding && (
        <Table
          className="table"
          pagination={{ pageSize: 5 }}
          dataSource={employees}
          columns={columns}
        />
      )}
    </>
  );
};

export default Employees;
