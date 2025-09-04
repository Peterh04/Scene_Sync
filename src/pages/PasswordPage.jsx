import passwordImage from "../assets/password.jpg";
import mail from "../assets/icons/mail.png";
import "../styles/password.css";

export default function ForgotPasswordPage() {
  return (
    <main aria-label="forgotPassword" className="password-page">
      <h2 className="Headertitle">Forgot</h2>
      <div className="password-image-holder">
        <img src={passwordImage} alt="passwordImage"></img>
      </div>
      <h2 className="password-title">Forgot Password?</h2>
      <p>
        Don't worry! It happens. Please enter the email address associated with
        your account
      </p>

      <form role="Password" className="forgot-password-form form">
        <div className="form-control">
          <label htmlFor="user-email">Enter your email address</label>
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
        <button>Get OTP</button>
      </form>
    </main>
  );
}
