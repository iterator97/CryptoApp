import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, userSelector } from "../../features/UserSlice";
import "./AccountPage.css";
import { Card } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const AccountPage = (props: any) => {
  const dispatch = useDispatch();

  const { firstName, lastName, email, isSuccess, token } =
    useSelector(userSelector);

  const onLogout = () => {
    dispatch(signOut({ token }));
  };

  useEffect(() => {
    if (!isSuccess) {
      props.history.push("/login");
    }
  }, [isSuccess, props.history]);

  return (
    <div className="account-page-container">
      <Card
        title={
          <div className="title-container">
            <div>Account information</div>
            <div>
              <LogoutOutlined onClick={onLogout} />
            </div>
          </div>
        }
      >
        <div className="information-container">
          <div className="value-title">Your email</div>
          <div className="value-content">{email}</div>
        </div>
        <div className="information-container">
          <div className="value-title">First name</div>
          <div className="value-content">{firstName}</div>
        </div>
        <div className="information-container">
          <div className="value-title">Last name</div>
          <div className="value-content">{lastName}</div>
        </div>
      </Card>
    </div>
  );
};

export default AccountPage;
