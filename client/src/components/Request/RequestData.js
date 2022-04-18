import React, { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Table,
  Tag,
  Modal,
  Button,
  Spin,
  Space,
  Alert,
  message,
} from "antd";

import useHttp from "../../hooks/useHttp";
import authContext from "../../context/auth/authContext";
import style from "./Requests.module.css";

export default function RequestData(props) {
  const URL = props.api_url;
  const key = props.requestType;
  const { isLoadding, error, sendRequest } = useHttp();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState();

  const [requestData, setRequestData] = useState([]);
  const { organizationId } = useContext(authContext);

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

      if (key === "credit" && res && res.credits) {
        setRequestData(
          res.credits.map((credit) => ({
            ...credit,
            avatar: {
              name: credit.e_fname + " " + credit.e_lname,
              email: credit.e_email,
            },
          }))
        );
      }

      if (key === "loan" && res && res.loans) {
        setRequestData(
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
    setModalData(requestData.filter((cd) => cd.id === id));
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
    try {
      const res = await sendRequest({
        url: url,
        options: {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      });

      if (error) {
        console.log(error);
        handleCancel();
        throw new Error(error);
      }

      if (res) {
        console.log(res);
        handleOk();
        getMessage(res.message);
      }
    } catch (error) {
      console.log(error);
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
          columns={columns}
          dataSource={requestData}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          className={style.table}
        />
      )}
      <Modal
        title="Request Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        {modalData && (
          <>
            <p>Title : {modalData[0].title}</p>
            <p>Description : {modalData[0].description}</p>
            <p>Requested By : {modalData[0].avatar.name}</p>
            <p>Amount : {modalData[0].amount}</p>
            {!modalData[0].is_settled && (
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
            )}
          </>
        )}
      </Modal>
    </>
  );
}
