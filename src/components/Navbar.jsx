import {
  faBookmark,
  faHouse,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="navbar">
      <ul className="navbar-links">
        <Link to={"/"} className="link">
          <li className="navbar-link" aria-label="navbar link">
            <FontAwesomeIcon icon={faHouse} className="fa" />
            Home
          </li>
        </Link>
        <li className="navbar-link" aria-label="navbar link">
          <FontAwesomeIcon icon={faMessage} className="fa" />
          Chats
        </li>
        <Link to={"/saved"} className="link">
          <li className="navbar-link" aria-label="navbar link">
            <FontAwesomeIcon icon={faBookmark} className="fa" />
            Saved
          </li>
        </Link>
      </ul>
    </nav>
  );
}
