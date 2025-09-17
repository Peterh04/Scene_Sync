import "../styles/moviePage.css";
import back from "../assets/icons/back.png";
import bookmark from "../assets/icons/bookmark_plain.png";
import fillBookmark from "../assets/icons/bookmark.png";
import share from "../assets/icons/share.png";
import shareBlack from "../assets/icons/share_black.png";
import star from "../assets/icons/star.png";
import play from "../assets/icons/play.png";
import downArrow from "../assets/icons/down-arrow.png";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import generatePoster from "../utils/generatePoster";
import generateTimestamps from "../utils/generateTimestamps";
import generateTrailer from "../utils/generateTrailer";

export default function MoviePage({ genres }) {
  const [resource, setResource] = useState([]);
  const [resourceTrailer, setResourceTrailer] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODUwYWY0Mzc0MjU3N2QxMGUwOTA4MTM4YmUwYWRmNSIsIm5iZiI6MTc1NzIzMTU2OS4zMiwic3ViIjoiNjhiZDM5ZDE1Mzg1MDE0NTFiNGU1ZDkzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dKy_zn9FWtM_p8bGQzoxEl9jSR413i3ZHUbqEaKkpHA",
    },
  };

  const getGenreName = (id, type) => {
    const genre = genres.filter((genre) => genre.id === id);
    return genre.length > 0 ? genre[0]?.name : `TBD (${type})`;
  };

  const { resourceType, resourceId } = useParams();
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);

  const url = `https://api.themoviedb.org/3/${resourceType}/${resourceId}`;
  const videoUrl = `https://api.themoviedb.org/3/${resourceType}/${resourceId}/videos`;

  useEffect(() => {
    const fetchRsource = async () => {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const resourceData = {
            id: data.id,
            title: data.title,
            date: data.release_date.split("-")[0],
            rating: Math.floor(data.vote_average),
            runtime: generateTimestamps(data.runtime),
            poster: data.poster_path,
            // genre: getGenreName(data.genre_ids?.[0], "Movie"),
            overview: data.overview,
          };

          setResource(resourceData);

          // console.log(resourceData.id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRsource();
  }, [resourceId]);

  useEffect(() => {
    const fetchResourceVideo = async () => {
      try {
        const response = await fetch(videoUrl, options);

        if (response.ok) {
          const data = await response.json();
          const resourceTrailerData = data.results.filter(
            (trailer) => trailer.type === "Trailer"
          );
          const trailer = {
            id: `${resourceId}`,
            key: resourceTrailerData[0].key,
          };
          setResourceTrailer(trailer);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchResourceVideo();
  }, [resourceId]);

  const handleTrailer = () => {
    setIsTrailerVisible((cond) => !cond);
  };
  return (
    <main aria-label="movie page" className="movie-page">
      <header role="header" className="movie-page-primary-header">
        <Link to={"/"}>
          <button role="button" className="backBtn">
            <img src={back} alt="back"></img>
          </button>
        </Link>

        <div className="header-actions">
          <button role="button" className="bookmarKBtn">
            <img src={bookmark} alt="bookmark"></img>
          </button>

          <button
            role="button"
            className="shareBtn"
            onClick={() => console.log(resourceType)}
          >
            <img src={share} alt="share"></img>
          </button>
        </div>
      </header>

      <div className="show-case-show">
        <div className="show-image-container">
          {isTrailerVisible ? (
            <iframe
              src={`${generateTrailer(resourceTrailer.key)}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="show-image"
              loading="lazy"
            ></iframe>
          ) : (
            <img
              src={
                resource.poster
                  ? generatePoster(resource.poster)
                  : "https://img.freepik.com/premium-photo/flying-popcorn-3d-glasses-film-reel-clapboard-blue-background-3d-render-illustration_989822-1043.jpg?semt=ais_hybrid&w=740"
              }
              alt="show image"
              className="show-image"
              loading="lazy"
            />
          )}
        </div>
        {!isTrailerVisible && (
          <div className="show-details">
            <h3>{resource.title}</h3>
            <div className="film-metadata">
              <p className="film-year">{resource.date}</p>
              <div className="divider">|</div>
              <p>
                <img src={star} className="fa"></img>
                <span className="film-rating">{resource.rating}</span>
                /10
              </p>
              <div className="divider">|</div>

              <p className="film-duration">
                {resource.runtime !== "0min" ? resource.runtime : "-"}
              </p>
            </div>
            <div className="film-genre">
              <div>Sci-fi</div>
              <div>Action</div>
            </div>
          </div>
        )}
      </div>

      <div className="show-actions">
        <button onClick={handleTrailer}>
          <img src={play} alt="play" className="fa"></img>
          Trailer
        </button>
        <button>
          <img src={shareBlack} className="fa"></img>
          Share
        </button>
      </div>
      <section role="storyline" className="storyline-section">
        <h4>Storyline</h4>
        <p className="film-storyline">
          {resource.overview ? resource.overview : "Sorry no overview for now!"}
        </p>
        <button>
          Read more
          <img src={downArrow} alt="down-arrow" className="fa"></img>
        </button>
      </section>

      <section role="similar shows" className="similar-shows">
        <h4>More like this</h4>
        <div className="show-previews">
          <MovieCard
            imgSrc="https://m.media-amazon.com/images/M/MV5BYTdmZTA1ODMtMWFkYy00ZTVhLThiNDAtODYwMDBlMzhhMjhiXkEyXkFqcGc@._V1_.jpg"
            duration={"2h 49mm"}
            title={"John Wick Chapter 4"}
          />

          <MovieCard
            imgSrc="https://m.media-amazon.com/images/M/MV5BYTdmZTA1ODMtMWFkYy00ZTVhLThiNDAtODYwMDBlMzhhMjhiXkEyXkFqcGc@._V1_.jpg"
            duration={"2h 49mm"}
            title={"John Wick Chapter 4"}
          />

          <MovieCard
            imgSrc="https://m.media-amazon.com/images/M/MV5BYTdmZTA1ODMtMWFkYy00ZTVhLThiNDAtODYwMDBlMzhhMjhiXkEyXkFqcGc@._V1_.jpg"
            duration={"2h 49mm"}
            title={"John Wick Chapter 4"}
          />

          <MovieCard
            imgSrc="https://m.media-amazon.com/images/M/MV5BYTdmZTA1ODMtMWFkYy00ZTVhLThiNDAtODYwMDBlMzhhMjhiXkEyXkFqcGc@._V1_.jpg"
            duration={"2h 49mm"}
            title={"John Wick Chapter 4"}
          />
        </div>
      </section>
    </main>
  );
}
