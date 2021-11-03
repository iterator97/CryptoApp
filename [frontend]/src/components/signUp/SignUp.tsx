import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { signupUser, userSelector, clearState } from "../../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import SignUpData from "../../models/SignUpData";
import "./SignUp.css";

interface SignUpProps {
  changeToSignIn: Dispatch<SetStateAction<boolean>>;
}

function SignUp(props: SignUpProps) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { isRegistrationSuccesfull, isFetching } = useSelector(userSelector);

  const onSignUp = async () => {
    let signInValues: SignUpData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    dispatch(signupUser(signInValues));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isRegistrationSuccesfull) {
      props.changeToSignIn(true);
    }
  }, [isRegistrationSuccesfull, props]);

  return (
    <>
      <div className="sign-up-container">
        <div>
          <div className="sign-in-title">
            <h4>Sign in</h4>
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
              label="First name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your lastName!" },
              ]}
            >
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Item>
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
            <Form.Item
              label="Confirm password"
              name="confirmPassword"
              rules={[{ required: true, message: "Please confirm password!" }]}
            >
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div>
                <Button
                  loading={isFetching}
                  type="primary"
                  onClick={onSignUp}
                  shape="round"
                  className="sign-up-button"
                >
                  Register
                </Button>
              </div>
            </Form.Item>
          </Form>
          <Button
            className="redirect-button"
            onClick={() => props.changeToSignIn(true)}
            shape="round"
            type="text"
          >
            Already have an account ? Change to login
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
