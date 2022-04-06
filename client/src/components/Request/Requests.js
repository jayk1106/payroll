import React from "react";
import { Avatar, Table, Tag } from "antd";

import style from "./Requests.module.css";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    title: "Credit for Phone",
    amount: 10000,
    type: "Credit",
    status: "Pending",
  },
  {
    key: "2",
    name: "Jay",
    title: "Credit for Fantasy",
    amount: 10000,
    type: "Credit",
    status: "Rejected",
  },
  {
    key: "2",
    name: "Jay",
    title: "Credit for Laptop",
    amount: 10000,
    type: "Credit",
    status: "Approved",
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
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
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
];

export default function Requests() {
  return (
    <>
      <div className={style.heading}>Requests</div>
      <Table
        className={style.table}
        dataSource={dataSource}
        columns={columns}
      />
    </>
  );
}
