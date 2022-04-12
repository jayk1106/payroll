import React, { useState } from "react";
import { Avatar, Table, Tag, Button, Modal } from "antd";

import RequestDetails from "./RequestDetails";
import style from "./Requests.module.css";

export default function LeaveTable() {
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

  const dataSource_leave = [
    {
      key: "1",
      name: "Mike",
      title: "Leave for Sickness",
      status: "Pending",
    },
    {
      key: "2",
      name: "Jay",
      title: "Leave for Date",
      status: "Rejected",
    },
    {
      key: "3",
      name: "Jay",
      title: "Leave for Marriage",
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
            <Avatar> {value[0].toUpperCase()}</Avatar>
            <div className={style.avatar__details}>
              {value} <br />
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
      <Table
        className={style.table}
        dataSource={dataSource_leave}
        columns={columns}
      />
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
