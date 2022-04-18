import React from "react";
import { Table, Avatar, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";

import style from "./Salary.module.css";

export default function Salary() {
  const navigate = useNavigate();

  const salaryData = [
    {
      name: "Jay",
      branch: "Bangalore",
      amount: 100000,
      status: "Approved",
      id: 123,
    },
    {
      name: "Test",
      branch: "Ahmedabad",
      amount: 10000,
      status: "Rejected",
      id: 1234,
    },
    {
      name: "Vivek",
      branch: "Ahmedabad",
      amount: 50000,
      status: "Pending",
      id: 12345,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value) => {
        return (
          <div className={style.avatar}>
            <Avatar>{value[0].toUpperCase()}</Avatar>
            <div className={style.avatar__details}>
              {value} <br />
              test@test.com
            </div>
          </div>
        );
      },
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        let color;
        if (value === "Pending") {
          color = "warning";
        } else if (value === "Approved") {
          color = "success";
        } else if (value === "Rejected") {
          color = "error";
        }
        return <Tag color={color}>{value}</Tag>;
      },
    },
    {
      title: "Details",
      dataIndex: "id",
      key: "id",
      render: (value) => {
        const getSalaryById = () => {
          navigate(`/salary/${value}`);
        };
        return (
          <Button onClick={getSalaryById} type="primary">
            Show Details
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <div className={style.heading}>Salary</div>
      <Table
        columns={columns}
        dataSource={salaryData}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        className={style.table}
      />
    </>
  );
}
