import { useContext } from "react";
import { Form, Input, Button, Alert } from "antd";
import authContext from "../../context/auth/authContext";
import useHttp from "../../hooks/useHttp";

import style from "./Login.module.css";

const Login = () => {
  const { login } = useContext(authContext);
  const { isLoadding, error, sendRequest } = useHttp();

  let errorContent = "";

  if (error) {
    errorContent = <Alert message={error} type="error" showIcon closable />;
  }

  const onLoginHandler = async (values) => {
    const data = await sendRequest({
      url: "http://192.168.29.213:8080/api/v1/user/login",
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    });
    console.log(data);
    if (data && data.user.token) {
      login(data.user.token);
    }
    if (data && data.error) {
      errorContent = (
        <Alert message={data.error} type="error" showIcon closable />
      );
    }
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        {errorContent}
        <div className={style}>
          <div className={style.heading}>Welcome Back</div>
          <p>Enter your email and password for sign in</p>
        </div>
        <Form
          layout="vertical"
          // initialValues={{ requiredMarkValue: requiredMark }}
          // onValuesChange={onRequiredTypeChange}
          // requiredMark={requiredMark}
          onFinish={onLoginHandler}
        >
          <Form.Item label="Email" name="email" required>
            <Input className={style.input} placeholder="Enter your Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" required>
            <Input.Password
              className={style.input}
              placeholder="Enter your Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className={style.btn}
              type="primary"
              htmlType="submit"
              loading={isLoadding}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <p>Don't have an account? Sign up</p>
      </div>
    </div>
  );
};

export default Login;
