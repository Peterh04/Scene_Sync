export default function MovieCardL({
  imageSrc = "https://m.media-amazon.com/images/M/MV5BNjZhMTI0MjAtOTEyZC00MDdjLTg4ZTEtMTQ4ODY1YzQxYWU1XkEyXkFqcGc@._V1_.jpg",
  title = "The Upshaws",
  genre = "Adventure",
  releaseDate = "30 Aug 2024",
}) {
  return (
    <div className="individual-show-preview-upcoming">
      <div className="individual-show-preview-image">
        <img src={imageSrc} alt="show image"></img>
      </div>
      <h4 className="show-title">{title}</h4>

      <div className="movie-meta">
        <h5 className="show-genre">{genre}</h5>
        <h5 className="show-release-date">{releaseDate}</h5>
      </div>
    </div>
  );
}
