import React, { useState, useEffect, useContext } from "react";
import { Avatar, Table, Tag, Tabs, Modal, Button, Spin } from "antd";

import useHttp from "../../hooks/useHttp";
import authContext from "../../context/auth/authContext";
import RequestDetails from "./RequestDetails";
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
    const res = await sendRequest({
      url: `${URL}/${key}/all/${organizationId}`,
      options: {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    });

    if (key == "credit" && res && res.credits) {
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

    if (key == "loan" && res) {
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
      <Table columns={columns} dataSource={requestData} />
      <Modal
        title="Request Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        <RequestDetails
          api_url={URL}
          requestType={key}
          data={modalData}
          close={handleOk}
        />
      </Modal>
    </>
  );
}
