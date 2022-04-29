import React, { useState, useEffect, useContext } from 'react';
import {
  Table,
  Avatar,
  Modal,
  Button,
  Space,
  Tag,
  Alert,
  Spin,
  message,
} from 'antd';
import moment from 'moment';

import useHttp from '../../hooks/useHttp';
import authContext from '../../context/auth/authContext';
import style from './Salary.module.css';

export default function Salary(props) {
  let apiUrl = '';
  const URL = props.api_url;
  const { organizationId, isAdmin, id } = useContext(authContext);
  const { sendRequest, error, isLoadding } = useHttp();

  const [salaryData, setSalaryData] = useState([]);

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [modalData, setModalData] = useState([]);

  const getMessage = (msg) => {
    message.success(msg);
  };

  apiUrl = `${URL}/salary/all/${organizationId}`;
  if (!isAdmin) {
    apiUrl = `${URL}/salary/${id}`;
  }

  const getSalaryData = async () => {
    const res = await sendRequest({
      url: apiUrl,
      options: {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    });

    if (res) {
      setSalaryData(
        res.salaries.map((s) => ({
          ...s,
          avatar: {
            name: s.e_fname + ' ' + s.e_lname,
            email: s.e_email,
          },
          id: s.id,
          date: {
            start_date: moment(s.start_date),
            end_date: moment(s.end_date),
          },
        }))
      );
    }
  };

  const showDetailModal = (id) => {
    setIsDetailModalVisible(true);
    setModalData(salaryData.filter((sd) => sd.id === id));
  };

  const handleDetailOk = () => {
    setIsDetailModalVisible(false);
  };

  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
  };

  const approveSalary = async (id) => {
    const res = await sendRequest({
      url: `${URL}/salary/approve/${id}`,
      options: {
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    });

    if (error) {
      console.log(error);
    }

    if (res) {
      handleDetailCancel();
      getMessage(res.message);
      getSalaryData();
    }
  };

  useEffect(() => {
    getSalaryData();
  }, []);

  let cols = [
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
      title: 'Branch',
      dataIndex: 'br_city',
      key: 'branch',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => {
        let color;
        if (value === 'Pending') {
          color = 'warning';
        } else if (value === 'Approved') {
          color = 'success';
        }
        return <Tag color={color}>{value}</Tag>;
      },
    },
    {
      title: 'Details',
      dataIndex: 'id',
      key: 'salaryId',
      render: (value) => {
        return (
          <>
            <Button onClick={showDetailModal.bind(null, value)} type="primary">
              Check Details
            </Button>
          </>
        );
      },
    },
  ];

  let columns = [];

  if (isAdmin) {
    columns = [...cols];
  }

  if (!isAdmin) {
    columns = [...cols];
  }

  return (
    <>
      <div className={style.heading}>Salary</div>
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
          dataSource={salaryData}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          className={style.table}
        />
      )}

      <Modal
        title="Salary Details"
        visible={isDetailModalVisible}
        onOk={handleDetailOk}
        onCancel={handleDetailCancel}
        style={{ top: 20 }}
      >
        {modalData.length > 0 && (
          <>
            <p>Name : {modalData[0].avatar.name}</p>
            <p>Email : {modalData[0].avatar.email}</p>
            <p>Branch : {modalData[0].br_city}</p>
            <p>
              Start Date :
              {new Date(modalData[0].start_date).getDate() +
                '-' +
                new Date(modalData[0].start_date).getMonth() +
                '-' +
                new Date(modalData[0].start_date).getFullYear()}
            </p>
            <p>
              End Date :
              {new Date(modalData[0].end_date).getDate() +
                '-' +
                new Date(modalData[0].end_date).getMonth() +
                '-' +
                new Date(modalData[0].end_date).getFullYear()}
            </p>
            <p>Amount : {modalData[0].amount}</p>
            <p>Tax : {modalData[0].tax_amount}</p>
            <p>Credits : {modalData[0].total_credits}</p>
            <p>Deductions : {modalData[0].total_deductions}</p>
            <p>Loans : {modalData[0].total_loans}</p>
            <p>Number of worked days : {modalData[0].duration_in_days}</p>
            <p>Status : {modalData[0].status}</p>
            {modalData[0].status !== 'Approved' && isAdmin && (
              <Space direction="horizontal">
                <Button
                  loading={isLoadding}
                  type="primary"
                  onClick={approveSalary.bind(null, modalData[0].id)}
                >
                  Accept
                </Button>
              </Space>
            )}
          </>
        )}
      </Modal>
    </>
  );
}
