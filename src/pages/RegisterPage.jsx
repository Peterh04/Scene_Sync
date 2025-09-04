import view from "../assets/icons/view.png";
import hide from "../assets/icons/hide.png";
import mail from "../assets/icons/mail.png";
import padlock from "../assets/icons/padlock.png";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";
import ContinueSign from "../components/ContinueSign";
import "../styles/registerPage.css";

export default function RegisterPage() {
  const { isPasswordVisible, handlePasswordVisiblity } =
    usePasswordVisibility();
  return (
    <main aria-label="RegisterPage" className="register-page">
      <h2>Register</h2>
      <form role="Register" className="register-form form">
        <div className="form-control">
          <label htmlFor="user-email">Enter your email</label>
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
          <label htmlFor="user-password">Enter your password</label>
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

        <div className="form-control">
          <label htmlFor="user-repeat-password">Re-Enter your password</label>
          <div className="input-wrapper">
            <img src={padlock} alt="padlock" className="fa"></img>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="user-repeat-password"
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
        <button>Sign Up</button>
      </form>
      <ContinueSign />
      <p className="sign-in-footer">
        Have an account?<span className="Sign-up-link">Sign in</span>
      </p>
    </main>
  );
}
