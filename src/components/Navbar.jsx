import {
  faBookmark,
  faHouse,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/navbar.css";
export default function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="navbar">
      <ul className="navbar-links">
        <li className="navbar-link" aria-label="navbar link">
          <FontAwesomeIcon icon={faHouse} className="fa" />
          Home
        </li>
        <li className="navbar-link" aria-label="navbar link">
          <FontAwesomeIcon icon={faMessage} className="fa" />
          Chats
        </li>
        <li className="navbar-link" aria-label="navbar link">
          <FontAwesomeIcon icon={faBookmark} className="fa" />
          Saved
        </li>
      </ul>
    </nav>
  );
}
