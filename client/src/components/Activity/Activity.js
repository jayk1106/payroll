import React, { useContext, useEffect, useState } from 'react';
import { Table, Spin, Alert } from 'antd';

import useHttp from '../../hooks/useHttp';
import authContext from '../../context/auth/authContext';
import style from './Activity.module.css';

export default function Activity(props) {
  const URL = props.api_url;
  const { sendRequest, error, isLoadding } = useHttp();

  const { id } = useContext(authContext);

  const [activityData, setActivityData] = useState([]);

  const getActivities = async () => {
    const res = await sendRequest({
      url: `${URL}/activity/${id}`,
      options: {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    });

    if (res) {
      setActivityData(res.activities);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (value) => {
        const date = new Date(value);
        return (
          <>
            {date.getDate() +
              '/' +
              Number(date.getMonth() + 1) +
              '/' +
              date.getFullYear()}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className={style.heading}>Activity</div>

      {error && (
        <>
          <div className="errorContainer">
            <Alert
              message="Somthing went wrong!"
              type="error"
              showIcon
              closable
            />
          </div>
        </>
      )}

      {isLoadding && !error && (
        <div className="example">
          <Spin />
        </div>
      )}

      {!isLoadding && !error && (
        <Table
          columns={columns}
          dataSource={activityData}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          className={style.table}
        />
      )}
    </>
  );
}
