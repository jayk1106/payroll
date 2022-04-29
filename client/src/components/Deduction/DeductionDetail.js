import React, { useLayoutEffect, useState, useContext } from 'react';
import { Table, Avatar, Modal, Button, Alert, Spin, message } from 'antd';

import useHttp from '../../hooks/useHttp';
import authContext from '../../context/auth/authContext';
import style from './Deduction.module.css';

export default function DeductionDetail(props) {
  const URL = props.api_url;

  const { sendRequest, error, isLoadding } = useHttp();
  const { id } = useContext(authContext);

  const [deductionData, setDeducitonData] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  const showModal = (id) => {
    setIsModalVisible(true);
    setModalData(deductionData.filter((d) => d.id === id));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getDeductionData = async () => {
    const res = await sendRequest({
      url: `${URL}/deduction/${id}`,
      options: {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    });

    if (res) {
      console.log(res);
      setDeducitonData(
        res.deductions.map((d) => ({
          ...d,
          avatar: {
            name: d.e_fname + ' ' + d.e_lname,
            email: d.e_email,
          },
        }))
      );
    }
  };

  useLayoutEffect(() => {
    getDeductionData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'avatar',
      key: 'avatar',
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },

    {
      title: 'Details',
      dataIndex: 'id',
      key: 'id',
      render: (value) => {
        return (
          <>
            <Button type="primary" onClick={showModal.bind(null, value)}>
              Check Details
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className={style.heading}>Deductions</div>
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

      {!error && !isLoadding && (
        <Table
          columns={columns}
          dataSource={deductionData}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          className={style.table}
        />
      )}

      {modalData.length > 0 && (
        <Modal
          title="Deductoin Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ top: 20 }}
        >
          <>
            <p>Title : {modalData[0].title}</p>
            <p>Description : {modalData[0].description}</p>
            <p>Amount : {modalData[0].amount}</p>
          </>
        </Modal>
      )}
    </>
  );
}
