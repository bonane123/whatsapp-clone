import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="whatsapp logo"
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
