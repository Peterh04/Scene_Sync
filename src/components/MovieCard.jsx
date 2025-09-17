import { Link } from "react-router-dom";

export default function MovieCard({
  imgSrc = "https://www.google.com/search?q=movie+images&rlz=1C5CHFA_enKE1161KE1161&oq=movie+image&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyBggBEEUYOTIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCTE2NTAwajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#vhid=cwDXy-RNvAP9hM&vssid=_W9DHaNXFOeqZ-d8Pku_l2QU_44",
  title,
  click,
  resourceType,
  resourceId,
}) {
  return (
    <Link
      to={`/${resourceType}/${resourceId}`}
      style={{ textDecoration: "none", color: "inherit" }}
      className="link-div"
    >
      <div className="individual-show-preview" onClick={click}>
        <div className="individual-show-preview-image">
          <img src={imgSrc} loading="lazy"></img>
        </div>
        <h5 className="show-title">{title}</h5>
      </div>
    </Link>
  );
}
