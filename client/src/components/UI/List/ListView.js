import React from "react";
import { List, Avatar, Button } from "antd";
import { Link } from "react-router-dom";

import style from "./ListView.module.css";

const ListView = (props) => {
  const data = props.latestEmployees;

  return (
    <div className={style.container}>
      <div className={style.label}>Latest Employees</div>
      {data && (
        <>
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar>{item.e_fname[0].toUpperCase()}</Avatar>}
                  title={
                    <Link to={{ pathname: `/employees/${item.id}` }}>
                      {item.e_fname + " " + item.e_lname}
                    </Link>
                  }
                  description={item.e_email}
                />
              </List.Item>
            )}
          />
          <div className="action">
            <Button type="text">
              <Link to="/employees">View More &#8594;</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListView;
