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
import sharePage from "../utils/share";

export default function MoviePage({
  genres,
  isTrailerVisible,
  playTrailer,
  closeTrailer,
}) {
  const { resourceType, resourceId } = useParams();
  const [resource, setResource] = useState([]);
  const [resourceTrailer, setResourceTrailer] = useState([]);
  const [similarResource, setSimilarResource] = useState([]);

  const url = `https://api.themoviedb.org/3/${resourceType}/${resourceId}`;
  const videoUrl = `https://api.themoviedb.org/3/${resourceType}/${resourceId}/videos`;
  const similarResourcesUrl = `https://api.themoviedb.org/3/${resourceType}/${resourceId}/similar`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODUwYWY0Mzc0MjU3N2QxMGUwOTA4MTM4YmUwYWRmNSIsIm5iZiI6MTc1NzIzMTU2OS4zMiwic3ViIjoiNjhiZDM5ZDE1Mzg1MDE0NTFiNGU1ZDkzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dKy_zn9FWtM_p8bGQzoxEl9jSR413i3ZHUbqEaKkpHA",
    },
  };

  useEffect(() => {
    const fetchRsource = async () => {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const resourceData = {
            id: data.id,
            title: data.title || data.name,
            // date:
            //   data?.release_date || data?.release_date != ""
            //     ? data?.release_date.split("-")[0]
            //     : data?.first_air_date.split("-")[0],
            rating: Math.floor(data.vote_average),
            runtime:
              data.runtime || data.runtime == 0
                ? generateTimestamps(data.runtime)
                : generateTimestamps(data.episode_run_time[0]),
            poster: data.poster_path,

            genre: data.genres.length > 0 ? data.genres : null,
            overview: data.overview,
          };

          console.log(data);
          console.log(resourceData);

          setResource(resourceData);
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
          console.log(data);
          if (data.results.length > 0) {
            const resourceTrailerData = data.results.filter(
              (trailer) => trailer.type === "Trailer"
            );
            const trailer = {
              id: `${resourceId}`,
              key: resourceTrailerData[0].key,
            };
            setResourceTrailer(trailer);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchResourceVideo();
  }, [resourceId]);

  useEffect(() => {
    const fetchSimilarResources = async () => {
      try {
        const similarResourceResponse = await fetch(
          similarResourcesUrl,
          options
        );

        if (similarResourceResponse.ok) {
          const similarResourceData = await similarResourceResponse.json();
          const similar = similarResourceData.results.map((item) => ({
            id: item.id,
            type: resourceType,
            title: item.name,
            overview: item.overview,
            date: item.release_date || item.first_air_date,
            poster: item.poster_path,
          }));
          setSimilarResource(similar);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSimilarResources();
  }, [resourceId]);

  return (
    <main aria-label="movie page" className="movie-page">
      <header role="header" className="movie-page-primary-header">
        <Link to={"/"}>
          <button
            role="button"
            className="backBtn"
            onClick={() => closeTrailer()}
          >
            <img src={back} alt="back"></img>
          </button>
        </Link>

        <div className="header-actions">
          <button role="button" className="bookmarKBtn">
            <img src={bookmark} alt="bookmark"></img>
          </button>

          <button role="button" className="shareBtn">
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

            {resource.genre !== null && (
              <div className="film-genre">
                {resource.genre?.[0] && (
                  <div onClick={() => console.log(resource.genre[0])}>
                    {resource.genre?.[0].name}
                  </div>
                )}
                {resource.genre?.[1] && (
                  <div onClick={() => console.log(resource.genre[0])}>
                    {resource.genre?.[1].name}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="show-actions">
        <button onClick={() => playTrailer()}>
          <img src={play} alt="play" className="fa"></img>
          Trailer
        </button>
        <button onClick={() => share()}>
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
          {similarResource.map((similarR) => (
            <MovieCard
              key={similarR.id}
              imgSrc={
                similarR.poster
                  ? generatePoster(similarR.poster)
                  : "https://img.freepik.com/premium-photo/flying-popcorn-3d-glasses-film-reel-clapboard-blue-background-3d-render-illustration_989822-1043.jpg?semt=ais_hybrid&w=740"
              }
              title={similarR.name}
              resourceType={similarR.type}
              resourceId={similarR.id}
              click={() => closeTrailer()}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
