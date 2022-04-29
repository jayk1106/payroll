import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Button } from 'antd';

import authContext from '../../context/auth/authContext';
import RequestData from './RequestData';
import LeaveTable from './LeaveTable';
import style from './Requests.module.css';

const { TabPane } = Tabs;

export default function Requests(props) {
  const URL = props.api_url;
  const { isAdmin } = useContext(authContext);

  return (
    <>
      <div className={style.heading}>Requests</div>
      {!isAdmin && (
        <Button type="primary">
          <Link to="/requests/add-request">Add Request</Link>
        </Button>
      )}
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
