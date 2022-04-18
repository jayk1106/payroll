import React from "react";
import { Tabs } from "antd";

import RequestData from "./RequestData";
import LeaveTable from "./LeaveTable";
import style from "./Requests.module.css";

const { TabPane } = Tabs;

export default function Requests(props) {
  const URL = props.api_url;
  return (
    <>
      <div className={style.heading}>Requests</div>

      <Tabs defaultActiveKey="credit">
        <TabPane tab="Credit" key="credit">
          <RequestData requestType="credit" api_url={URL} />
        </TabPane>
        <TabPane tab="Loan" key="loan">
          <RequestData requestType="loan" api_url={URL} />
        </TabPane>
        <TabPane tab="Leave" key="leave">
          <LeaveTable api_url={URL} />
        </TabPane>
      </Tabs>
    </>
  );
}
