import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/UserSlice";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";

const PreAccount = () => {
  const { isSuccess } = useSelector(userSelector);
  const [showLoginPage, setShowLoginPage] = useState(true);

  return (
    <>
      {isSuccess ? (
        <div>Twoje konto</div>
      ) : (
        <div className="container">
          {showLoginPage ? (
            <SignIn changeToRegistration={setShowLoginPage} />
          ) : (
            <SignUp changeToSignIn={setShowLoginPage} />
          )}
        </div>
      )}
    </>
  );
};

export default PreAccount;
