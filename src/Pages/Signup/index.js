import React from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { signup } from "../../app/store/actions/authActions";
import { useHistory } from "react-router-dom";
import { Loading } from "../../app/components";

export const Signup = ({ signup, user, isLoading }) => {
  let history = useHistory();

  React.useEffect(() => {
    if (user) history.push("/");
  }, [user]);

  const [userData, setUserData] = React.useState({
    appNo: undefined,
    password: undefined,
    name: undefined,
    email: undefined,
    phoneNo: undefined
  });

  let {appNo, password, name, email, phoneNo} = userData;

  const onChange = (e) => {
    let { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const onFinish = () => {
    let data = new FormData();
    data.append("appNo", appNo);
    data.append("name", name);
    data.append("phoneNo", phoneNo);
    data.append("email", email);
    data.append("password", password);
    signup(data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="position-relative main-page">
      <div className="position-absolute top-50 start-50 translate-middle my-3 form-area">
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
              label={<label className="login-label">Name</label>}
              name="name"
              rules={[{ required: true, message: "Please input your name" }]}
            >
              <Input placeholder="John Doe" name="name" onChange={onChange} />
            </Form.Item>
            <Form.Item
              label={<label className="login-label">GUC ID Number</label>}
              name="appNo"
              rules={[
                { required: true, message: "Please input your GUC Id number" },
                {
                  pattern: "[0-9]{2}(-)([0-9]{3,5})",
                  message: "Please input a valid GUC Id",
                },
              ]}
            >
              <Input placeholder="49-XXXXX" name="appNo" onChange={onChange} />
            </Form.Item>
            <Form.Item
              label={<label className="login-label">Mobile Number</label>}
              name="phoneNo"
              rules={[
                { required: true, message: "Please input your mobile number" },
                {
                  pattern: "01[0-9]{9}",
                  message: "Please input a valid phone number",
                },
              ]}
            >
              <Input
                placeholder="01XXXXXXXXX"
                name="phoneNo"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item
              label={<label className="login-label">Email</label>}
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
                { type: "email", message: "Please input a valid email" },
              ]}
            >
              <Input
                placeholder="john.doe@mail.com"
                name="email"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item
              label={<label className="login-label">Password</label>}
              name="password"
              rules={[
                { required: true, message: "Please confirm your password" },
                { min: 8, message: "Password should be atleast 8 characters long"}
              ]}
            >
              <Input.Password name="password" onChange={onChange} />
            </Form.Item>
            <Form.Item
              label={<label className="login-label">Confirm Password</label>}
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "Passwords do not match"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password name="confirmPassword"/>
            </Form.Item>
            <div className="text-center">
              <Button className="main-button" type="primary" htmlType="submit">
                Sign Up
              </Button>
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

const mapDispatchToProps = { signup };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
