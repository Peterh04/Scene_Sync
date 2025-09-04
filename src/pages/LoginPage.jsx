import "../styles/loginPage.css";
import mail from "../assets/icons/mail.png";
import padlock from "../assets/icons/padlock.png";
import view from "../assets/icons/view.png";
import hide from "../assets/icons/hide.png";
import ContinueSign from "../components/ContinueSign";
import { useState } from "react";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";

useState;

export default function LoginPage() {
  const { isPasswordVisible, handlePasswordVisiblity } =
    usePasswordVisibility();

  return (
    <main aria-label="loginPage" className="login-page">
      <h2>Login</h2>
      <p>Please login to your account</p>
      <form role="login" className="login-form form">
        <div className="form-control">
          <label htmlFor="user-email">E-mail Address</label>
          <div className="input-wrapper">
            <img src={mail} className="fa" alt="mail"></img>
            <input
              type="email"
              id="user-email"
              name="userEmail"
              required={true}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="user-password">Password</label>
          <div className="input-wrapper">
            <img src={padlock} alt="padlock" className="fa"></img>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="user-password"
              name="userPassword"
              required={true}
              autoComplete="off"
            />
            <button
              className="btn-password-toggle"
              onClick={handlePasswordVisiblity}
            >
              {isPasswordVisible ? (
                <img className="fa eye" alt="view" src={view}></img>
              ) : (
                <img className="fa eye" alt="hide" src={hide}></img>
              )}
            </button>
          </div>
        </div>

        <div className="form-actions">
          <div>
            <input type="checkbox" id="remember" name="userRememberStatus" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <p>Forgot password?</p>
        </div>

        <button>Login</button>
      </form>
      <ContinueSign />

      <p className="login-footer">
        Don't have an account?<span className="Sign-up-link">Sign up</span>
      </p>
    </main>
  );
}
