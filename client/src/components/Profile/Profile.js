import React, { useState, useEffect } from "react";
import { Space, Table, Button, Modal, Spin, Tag } from "antd";

import useHttp from "../../hooks/useHttp";
import style from "./Profile.module.css";

export default function Profile(props) {
  const URL = props.api_url;

  const { sendRequest, isLoadding, error } = useHttp();

  const [employeeData, setEmployeeData] = useState({});

  const getEmployeeData = async () => {
    const res = await sendRequest({
      url: `${URL}/employee`,
      options: {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    });

    if (res && res.details) {
      console.log(res);
      setEmployeeData(res.details);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  return (
    <>
      <div className={style.heading}>Employee Profile</div>
      {isLoadding && (
        <div className="example">
          <Spin />
        </div>
      )}

      <div className={style.main}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <h3 className={style.heading__details}>Personal Information</h3>
          <div className={style.main__div}>
            <div className={style.div__left}>
              <p>Name: {employeeData.e_fname + " " + employeeData.e_lname}</p>
              <p>Email: {employeeData.e_email}</p>
            </div>
            <div className={style.div__right}>
              <p>Gender: {employeeData.e_gender}</p>
              <p>Age: {employeeData.e_age}</p>
            </div>
          </div>

          <div className={style.divider}></div>

          <h3 className={style.heading__details}>Organizational Information</h3>
          <div className={style.main__div}>
            <div className={style.div__left}>
              <p>Department: {employeeData.dp_name}</p>
              <p>Branch: {employeeData.br_name}</p>
            </div>
            <div className={style.div__right}>
              <p>
                Date Of Join:{" "}
                {new Date(employeeData.join_date).getDate() +
                  "/" +
                  new Date(employeeData.join_date).getMonth() +
                  "/" +
                  new Date(employeeData.join_date).getFullYear()}
              </p>
              <p>Salary: {employeeData.e_salary_per_year}</p>
            </div>
          </div>
        </Space>
      </div>
    </>
  );
}
