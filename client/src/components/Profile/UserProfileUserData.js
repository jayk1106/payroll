import React, { useLayoutEffect, useState } from 'react';
import { Table, Button, Spin, Alert, Tag } from 'antd';
import { Link } from 'react-router-dom';

import useHttp from '../../hooks/useHttp';
import style from './Profile.module.css';

const cols = [
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
      } else if (value === 'Rejected') {
        color = 'error';
      }
      return <Tag color={color}>{value}</Tag>;
    },
  },
];
let columns = [];

export default function UserProfileUserData(props) {
  const { api_url: URL, requestType: key, eId } = props;

  const { sendRequest, error, isLoadding } = useHttp();

  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await sendRequest({
      url: `${URL}/${key}/${eId}`,
      options: {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    });
    if (res) {
      if (key === 'salary') {
        setData(res.salaries);
      } else if (key === 'credit') {
        setData(res.credits);
      } else if (key === 'loan') {
        setData(res.loans);
      } else if (key === 'leave') {
        setData(res.leaves);
      }

      //   window.scrollTo(0, document.body.scrollHeight - 100);
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  if (key === 'salary') {
    columns = [
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      ...cols,
      {
        title: 'Details',
        dataIndex: 'id',
        key: 'id',
        render: (value) => {
          return (
            <Button type="primary">
              <Link to="/salary"> Show Details</Link>
            </Button>
          );
        },
      },
    ];
  }

  if (key === 'credit' || key === 'loan') {
    columns = [
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
      ...cols,
      {
        title: 'Details',
        dataIndex: 'id',
        key: 'id',
        render: (value) => {
          return (
            <Button type="primary">
              <Link to="/requests"> Show Details</Link>
            </Button>
          );
        },
      },
    ];
  }

  if (key === 'leave') {
    columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      ...cols,
      {
        title: 'Details',
        dataIndex: 'id',
        key: 'id',
        render: (value) => {
          return (
            <Button type="primary">
              <Link to="/requests"> Show Details</Link>
            </Button>
          );
        },
      },
    ];
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      rowKey="id"
      className={style.table}
    />
  );
}
