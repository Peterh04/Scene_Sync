import formatTMDBDate from "../utils/formatDate";

export default function MovieCardL({
  imageSrc = "https://img.freepik.com/premium-photo/flying-popcorn-3d-glasses-film-reel-clapboard-blue-background-3d-render-illustration_989822-1043.jpg?semt=ais_hybrid&w=740",
  title,
  genre,
  releaseDate = "30 Aug 2024",
}) {
  return (
    <div
      className="individual-show-preview-upcoming"
      onClick={() => console.log(formattedDate)}
    >
      <div className="individual-show-preview-image">
        <img src={imageSrc} alt="show image"></img>
      </div>
      <h4 className="show-title">{title}</h4>

      <div className="movie-meta">
        <h5 className="show-genre">{genre}</h5>
        <h5 className="show-release-date">{formatTMDBDate(releaseDate)}</h5>
      </div>
    </div>
  );
}
