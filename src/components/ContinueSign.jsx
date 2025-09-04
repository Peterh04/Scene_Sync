import googleIcon from "../assets/icons/google.png";
import appleIcon from "../assets/icons/apple-logo.png";

export default function ContinueSign() {
  return (
    <section role="Continue-SignIn" className="continue-section">
      <h4 className="auth-divider">or</h4>
      <div className="continue-actions">
        <button>
          <img src={googleIcon} className="fa" alt="Google"></img>
          Continue with Google
        </button>
        <button>
          <img src={appleIcon} className="fa" alt="Apple"></img>
          Continue with Apple
        </button>
      </div>
    </section>
  );
}
