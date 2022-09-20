import React from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { login } from "../../app/store/actions/authActions";
import { useHistory } from "react-router-dom";
import { Loading } from "../../app/components";

export const Login = ({ login, user, isLoading }) => {
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
    <div className="position-relative main-page">
      <div className="col-md-6 position-absolute top-50 start-50 translate-middle">
        <h1 className="text-center">GUCians Switching WebApp</h1>
        {isLoading && <div className="text-center"><Loading color="var(--primaryColor)"/></div>}
        {!isLoading && <div className="p-3 login-form">
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
              className="login-item"
              label={<label className="login-label">GUC ID Number</label>}
              name="appNo"
              rules={[
                { required: true, message: "Please input your id number" },
              ]}
            >
              <Input placeholder="49-XXXXX" name="appNo" onChange={onChange} />
            </Form.Item>
            <Form.Item
            label={<label className="login-label">Password</label>}
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password name="password" onChange={onChange} />
            </Form.Item>
            <div className="d-flex justify-content-center">
                <Button disabled={isLoading} className="main-button mx-3" type="primary" htmlType="submit">
                  Log in
                </Button>
              <div>
                <a className="link" href="/signup">Register user</a>
              </div>
              <br/>
              <div>
                <a className="link" href="/forgot-password">Forgot Password?</a>
              </div>
            </div>
          </Form>
        </div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state?.auth?.user,
  isLoading: state?.auth?.isLoading,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
