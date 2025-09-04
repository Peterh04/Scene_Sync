import ContinueSign from "../components/ContinueSign";
import "../styles/signPage.css";

export default function SignPage() {
  return (
    <main aria-label="signPage" className="signPage">
      <div aria-label="Sign-in Actions" className="auth-buttons">
        <button type="button" className="loginBtn">
          Login
        </button>
        <button type="button" className="signUpBtn">
          Sign up
        </button>
      </div>
      <ContinueSign />
    </main>
  );
}
