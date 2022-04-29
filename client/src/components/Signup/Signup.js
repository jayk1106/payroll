import { Form, Input, Button, Space, Alert } from 'antd';
import useHttp from '../../hooks/useHttp';
import { useContext } from 'react';
import authContext from '../../context/auth/authContext';
import { useParams, Link } from 'react-router-dom';

import style from './Signup.module.css';

const Signup = (props) => {
  const URL = props.api_url;
  const { login } = useContext(authContext);

  const { isLoadding, error, sendRequest } = useHttp();

  let errorContent = '';

  const formSubmitHandler = async (values) => {
    console.log(values);
    const data = await sendRequest({
      url: `${URL}/user`,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      },
    });
    if (data && data.user.token) {
      login(data.user.token, '/create-organization');
    }
  };

  if (error) {
    errorContent = <Alert message={error} type="error" showIcon closable />;
  }
  return (
    <div className={style.container}>
      <div className={style.form}>
        {errorContent}
        <div className={style}>
          <div className={style.heading}>Welcome, Register Here</div>
          <p>Enter your email and password for sign in</p>
        </div>
        <Form layout="vertical" onFinish={formSubmitHandler}>
          <Space className={style['group-input']} direction="horizontal">
            <Form.Item label="Frist Name" name="frist_name" required>
              <Input className={style.input} placeholder="Enter Frist Name" />
            </Form.Item>
            <Form.Item label="Last Name" name="last_name" required>
              <Input className={style.input} placeholder="Enter Last Name" />
            </Form.Item>
          </Space>
          <Form.Item label="Email" name="email" required>
            <Input
              className={style.input}
              placeholder="Enter your Email"
              name="email"
            />
          </Form.Item>
          <Form.Item label="Password" name="password" required>
            <Input.Password
              className={style.input}
              placeholder="Enter your Password"
              name="password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className={style.btn}
              type="primary"
              htmlType="submit"
              loading={isLoadding}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
        <p>
          Already have an account? <Link to="/login"> Login </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
