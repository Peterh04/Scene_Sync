export default function MovieCard({
  imgSrc = "https://m.media-amazon.com/images/M/MV5BYTdmZTA1ODMtMWFkYy00ZTVhLThiNDAtODYwMDBlMzhhMjhiXkEyXkFqcGc@._V1_.jpg",
  title,
  duration,
}) {
  return (
    <div className="individual-show-preview">
      <div className="individual-show-preview-image">
        <img src={imgSrc}></img>
      </div>
      <h5 className="show-title">{title}</h5>
      <h5 className="show-duration">{duration}</h5>
    </div>
  );
}
