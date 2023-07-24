import AuthFrom from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthFrom />
      <div className="authBtns">
        <button onClick={onSocailClick} name="google" className="authBtn">
          구글로 로그인 하기 <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocailClick} name="github" className="authBtn">
          깃허브로 로그인 하기 <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
