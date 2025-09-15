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
import { useState } from "react";

export default function MoviePage() {
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);

  const handleTrailer = () => {
    setIsTrailerVisible((cond) => !cond);
  };
  return (
    <main aria-label="movie page" className="movie-page">
      <header role="header" className="movie-page-primary-header">
        <button role="button" className="backBtn">
          <img src={back} alt="back"></img>
        </button>
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
              src="https://www.youtube.com/embed/nb_fFj_0rq8"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="show-image"
              loading="lazy"
            ></iframe>
          ) : (
            <img
              src="https://wallpaper.forfun.com/fetch/4c/4caea87d8a186baa83735280328a1582.jpeg"
              alt="show image"
              className="show-image"
              loading="lazy"
            />
          )}
        </div>
        <div className="show-details">
          <h3>Avatar: The Way of Water</h3>
          <div className="film-metadata">
            <p className="film-year">2022</p>
            <div className="divider">|</div>
            <p>
              <img src={star} className="fa"></img>
              <span className="film-rating">8</span>
              /10
            </p>
            <div className="divider">|</div>

            <p className="film-duration">3h 12min</p>
          </div>
          <div className="film-genre">
            <div>Sci-fi</div>
            <div>Action</div>
          </div>
        </div>
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
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur...
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
