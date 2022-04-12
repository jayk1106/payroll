import React from "react";
import { Space, Button } from "antd";

import useHttp from "../../hooks/useHttp";

export default function RequestDetails(props) {
  const URL = props.api_url;
  const key = props.requestType;

  const { title, description, avatar, amount, id } = props.data[0];
  const { isLoadding, error, sendRequest } = useHttp();

  const settleRequest = async (isAccept) => {
    let url;

    if (isAccept) {
      url = `${URL}/${key}/settle/${id}`;
    } else {
      url = `${URL}/${key}/settle/${id}?reject=true`;
    }

    const res = await sendRequest({
      url: url,
      options: {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    });

    if (res) {
      props.close();
    }
  };

  return (
    <>
      <p> Title : {title}</p>
      <p> Description : {description}</p>
      <p> Requested By : {avatar.name}</p>
      <p> Amount : {amount}</p>
      <Space direction="horizontal">
        <Button
          type="primary"
          onClick={settleRequest.bind(null, true)}
          loading={isLoadding}
        >
          Accept
        </Button>
        <Button
          type="primary"
          danger
          onClick={settleRequest.bind(null, false)}
          loading={isLoadding}
        >
          Reject
        </Button>
      </Space>
    </>
  );
}
