import React, { useState, useEffect, useContext } from 'react';
import { Statistic, Spin, Alert } from 'antd';

import useHttp from '../../hooks/useHttp';
import authContext from '../../context/auth/authContext';
import ListView from '../UI/List/ListView';
import './Dashboard.css';

const Dashboard = (props) => {
  const URL = props.api_url;
  const { organizationId } = useContext(authContext);
  const { sendRequest, isLoadding, error } = useHttp();

  const [data, setData] = useState({});
  const [employees, setEmployees] = useState([]);

  const getData = async () => {
    const res = await sendRequest({
      url: `${URL}/general/dashboard/${organizationId}`,
      options: {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    });

    if (res) {
      setData({
        paidSalary: res.paidSalary,
        pendingRequests: res.pendingRequests,
        pendingSalary: res.pendingSalary,
        totalEmployees: res.totalEmployees,
      });
      setEmployees(res.latestEmployees);
    }
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="main-layout__heading">Dashboard</div>
      {isLoadding && (
        <>
          <div className="example">
            <Spin size="large" />
          </div>
        </>
      )}
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
      {!isLoadding && !error && (
        <>
          <div className="main-layout__content__container">
            <div className="statistic-container">
              <div className="statistic">
                <Statistic
                  title="Total Employees"
                  value={data.totalEmployees}
                />
              </div>
              <div className="statistic">
                <Statistic
                  title="Pending Requests"
                  value={data.pendingRequests}
                />
              </div>
              <div className="statistic">
                <Statistic title="Pending Salary" value={data.pendingSalary} />
              </div>
              <div className="statistic">
                <Statistic title="Paid Salary" value={data.paidSalary} />
              </div>
            </div>
            <div className="list-container">
              <div className="list">
                <ListView latestEmployees={employees} />
              </div>
              {/* <div className="list">
                <ListView />
              </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
