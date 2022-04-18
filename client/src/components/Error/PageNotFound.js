import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";

import style from "./ErrorPage.module.css";

export default function PageNotFound() {
  return (
    <div className={style.container}>
      <Result
        status="404"
        title="404 Page Not Found"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to="/">Go Back Home</Link>}
      />
    </div>
  );
}
