import React from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { requestReset } from "../../app/store/actions/passwordActions";

export const ForgotPassword = ({ requestReset }) => {

  const [userData, setUserData] = React.useState({
    appNo: undefined,
    email: undefined,
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const onFinish = () => {
    let user = new FormData();
    user.append("appNo", userData.appNo);
    user.append("email", userData.email);
    requestReset(user);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="position-relative main-page">
      <div className="col-md-6 position-absolute top-50 start-50 translate-middle">
        <h1 className="text-center">Forgot you password?</h1>
        <div className="p-3 login-form">
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
            label={<label className="login-label">Email</label>}
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
              ]}
            >
              <Input name="email" onChange={onChange} />
            </Form.Item>
            <div className="d-flex justify-content-center">
              <Button className="main-button mx-3" type="primary" htmlType="submit">
                Send Link
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = { requestReset };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
