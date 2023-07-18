import AuthFrom from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import React from "react";

const Auth = () => {
  const onSocailClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <AuthFrom />
      <div>
        <button onClick={onSocailClick} name="google">
          구글로 계속하기
        </button>
        <button onClick={onSocailClick} name="github">
          깃허브로 계속하기
        </button>
      </div>
    </div>
  );
};

export default Auth;
