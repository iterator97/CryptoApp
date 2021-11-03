import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { signIn, userSelector } from "../../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import "./SignIn.css";
import SignInData from "../../models/SignInData";

interface SignInProps {
  changeToRegistration: Dispatch<SetStateAction<boolean>>;
}

function SignIn(props: SignInProps) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isRegistrationSuccesfull, isFetching } = useSelector(userSelector);

  const onSignInClick = () => {
    let signInValues: SignInData = {
      email: email,
      password: password,
    };
    dispatch(signIn(signInValues));
  };

  return (
    <>
      <div className="sign-in-container">
        <div>
          <div className="sign-in-title">
            <h3>Sign into your account</h3>
            <br />
            {/* TODO notyfikacja z toast  */}
            {isRegistrationSuccesfull ? (
              <h4>Teraz mozesz sie zalogowac</h4>
            ) : null}
          </div>
          <Form
            size="large"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div>
                <Button
                  className="sing-in-button"
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  onClick={onSignInClick}
                  loading={isFetching}
                >
                  Log in
                </Button>
              </div>
            </Form.Item>
          </Form>
          <Button
            onClick={() => props.changeToRegistration(false)}
            className="redirect-button"
            shape="round"
            type="text"
          >
            Change to sign up
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
