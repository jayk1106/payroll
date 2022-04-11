import React, { useState } from "react";
import { Avatar, Table, Tag, Tabs, Modal, Button } from "antd";

import RequestDetails from "./RequestDetails";
import LeaveTable from "./LeaveTable";
import style from "./Requests.module.css";

const { TabPane } = Tabs;

export default function Requests() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    console.log("selected");
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dataSource_credit = [
    {
      key: "1",
      name: "Mike",
      title: "Credit for Phone",
      amount: 10000,
      status: "Pending",
    },
    {
      key: "2",
      name: "Jay",
      title: "Credit for Fantasy",
      amount: 10000,
      status: "Rejected",
    },
    {
      key: "3",
      name: "Jay",
      title: "Credit for Laptop",
      amount: 10000,
      status: "Approved",
    },
  ];

  const dataSource_loan = [
    {
      key: "1",
      name: "Mike",
      title: "Loan for Phone",
      amount: 20000,
      status: "Pending",
    },
    {
      key: "2",
      name: "Jay",
      title: "Loan for Fantasy",
      amount: 20000,
      status: "Rejected",
    },
    {
      key: "3",
      name: "Jay",
      title: "Loan for Laptop",
      amount: 20000,
      status: "Approved",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      onClick: showModal,
      render: (value) => {
        return (
          <div className={style.avatar}>
            <Avatar>J</Avatar>
            <div className={style.avatar__details}>
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
      dataIndex: "details",
      key: "details",
      render: (value) => {
        return (
          <Button type="primary" onClick={showModal}>
            Show Details
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <div className={style.heading}>Requests</div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Credit" key="1" onClick>
          <Table
            className={style.table}
            dataSource={dataSource_credit}
            columns={columns}
          />
        </TabPane>
        <TabPane tab="Loan" key="2">
          <Table
            className={style.table}
            dataSource={dataSource_loan}
            columns={columns}
          />
        </TabPane>
        <TabPane tab="Leave" key="3">
          <LeaveTable />
        </TabPane>
      </Tabs>

      <Modal
        title="Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        <RequestDetails />
      </Modal>
    </>
  );
}
