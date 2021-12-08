import React from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { login } from "../../app/store/actions/authActions";
import { useHistory } from "react-router-dom";

export const Login = ({ login, user }) => {
  let history = useHistory();

  React.useEffect(() => {
    if (user) history.push("/");
  }, [user]);

  const [userData, setUserData] = React.useState({
    appNo: undefined,
    password: undefined,
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const onFinish = () => {
    let user = new FormData();
    user.append("appNo", userData.appNo);
    user.append("password", userData.password);
    login(user);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="login-form">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="Application Number"
            name="appNo"
            rules={[{ required: true, message: "Please input your id number" }]}
          >
            <Input placeholder="49-XXXXX" name="appNo" onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password name="password" onChange={onChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    user: state?.auth?.user,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
