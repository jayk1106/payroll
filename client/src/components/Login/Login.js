import { useContext } from "react";
import { Form, Input, Button, Alert } from "antd";
import authContext from "../../context/auth/authContext";
import useHttp from "../../hooks/useHttp";
import { useParams } from "react-router-dom";

import style from "./Login.module.css";

const Login = (props) => {
  const { login } = useContext(authContext);
  const { isLoadding, error, sendRequest } = useHttp();

  const { orgId } = useParams();

  let errorContent = "";

  if (error) {
    errorContent = <Alert message={error} type="error" showIcon closable />;
  }

  

  const onLoginHandler = async (values) => {
  
    let requestData = {
      url: `${props.api_url}/user/login`,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    };
  
    if(props.employeeLogin){
      requestData = {
        url: `${props.api_url}/employee/login`,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      }
    }
    const data = await sendRequest(requestData);
    console.log(data);
    if (data && data?.user?.token) {
      login(data.user.token, data.user.organizationId);
    }
    if(data && data?.employee?.token){
      console.log(data.employee.token, data.employee.organization);
      login(data.employee.token , data.employee.organization);
    }
    if (data && data?.error) {
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
          { props.employeeLogin && <Form.Item hidden={true} name="organization" initialValue={orgId}>
            <Input />
          </Form.Item>
          }
          <Form.Item label="Email" name={props.employeeLogin ? "e_email" : "email"} required>
            <Input className={style.input} placeholder="Enter your Email" />
          </Form.Item>
          <Form.Item label="Password" name={ props.employeeLogin ? "e_password" : "password"} required>
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
        { !props.employeeLogin && <p>Don't have an account? Sign up</p>}
      </div>
    </div>
  );
};

export default Login;
