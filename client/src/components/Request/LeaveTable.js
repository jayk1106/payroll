import React, { useState, useContext, useEffect } from "react";
import {
  Avatar,
  Alert,
  Table,
  Tag,
  Button,
  Modal,
  Spin,
  Space,
  message,
} from "antd";

import useHttp from "../../hooks/useHttp";
import authContext from "../../context/auth/authContext";
import style from "./Requests.module.css";

export default function LeaveTable(props) {
  const URL = props.api_url;
  const key = "leave";
  const { isLoadding, error, sendRequest } = useHttp();
  const { organizationId } = useContext(authContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [modalData, setModalData] = useState();

  const getRequestData = async () => {
    try {
      const res = await sendRequest({
        url: `${URL}/${key}/all/${organizationId}`,
        options: {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      });

      if (error) {
        throw new Error(error);
      }

      if (res) {
        setLeaveData(
          res.loans.map((loan) => ({
            ...loan,
            avatar: {
              name: loan.e_fname + " " + loan.e_lname,
              email: loan.e_email,
            },
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequestData();
  }, [isModalVisible]);

  const showModal = (id) => {
    setIsModalVisible(true);
    setModalData(leaveData.filter((cd) => cd.id === id));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getMessage = (msg) => {
    message.success(msg);
  };

  const settleRequest = async (isAccept) => {
    let url;

    if (isAccept) {
      url = `${URL}/${key}/settle/${modalData[0].id}`;
    } else {
      url = `${URL}/${key}/settle/${modalData[0].id}?reject=true`;
    }

    const res = await sendRequest({
      url: url,
      options: {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    });

    if (res) {
      handleOk();
      getMessage(res.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "avatar",
      key: "name",
      onClick: showModal,
      render: (value) => {
        return (
          <div className={style.avatar}>
            <Avatar>{value.name[0].toUpperCase()}</Avatar>
            <div className={style.avatar__details}>
              {value.name} <br />
              {value.email}
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
      dataIndex: "id",
      key: "id",
      render: (value) => {
        return (
          <Button type="primary" onClick={showModal.bind(null, value)}>
            Show Details
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {isLoadding && (
        <div className={style.example}>
          <Spin />
        </div>
      )}
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
      {!isLoadding && !error && (
        <Table
          className={style.table}
          dataSource={leaveData}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      )}

      <Modal
        title="Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        {modalData && (
          <>
            <p>Title : {modalData[0]?.title}</p>
            <p>Description : {modalData[0]?.description}</p>
            <p>Requested By : {modalData[0]?.avatar.name}</p>
            <Space direction="horizontal">
              <Button type="primary" onClick={settleRequest.bind(null, true)}>
                Accept
              </Button>
              <Button
                type="primary"
                onClick={settleRequest.bind(null, false)}
                danger
              >
                Reject
              </Button>
            </Space>
          </>
        )}
      </Modal>
    </>
  );
}
