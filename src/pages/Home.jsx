import "../styles/home.css";
import passwordImage from "../assets/password.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import bell from "../assets/icons/bell.png";

import { useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieCardL from "../components/MovieCardL";
import generatePoster from "../utils/generatePoster";

export default function Home({ resources, upcomingResoures }) {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <main aria-label="Home" className="home-page">
      <header className="profile-primary-header" role="header">
        <div
          className={`user-profile-section ${searchActive ? "disabled" : ""}`}
        >
          <div className="profile-img">
            <img src={passwordImage} alt="profile image" />
          </div>
          <div className="user-welcome">
            <p className="welcome-message" aria-label="welcome">
              Welcome back,
            </p>
            <h4>William Krisna</h4>
          </div>
        </div>
        <div className="header-actions">
          <form aria-label="search" className="header-search">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="fa" />
              <input
                type="search"
                placeholder="Search"
                onFocus={() => setSearchActive(true)}
                onBlur={() => setSearchActive(false)}
              />
            </div>
          </form>

          {!searchActive && (
            <button>
              <img src={bell} className="fa" alt="bell" />
            </button>
          )}
        </div>
      </header>

      <h2 aria-label="title" className="title">
        Your Next Favorite, Saved.
      </h2>

      <nav aria-label="Movie genres" className="genre-filter">
        <button className="genre_list_item">All</button>
        <button className="genre_list_item">Comedy</button>
        <button className="genre_list_item">Action</button>
        <button className="genre_list_item">Drama</button>
        <button className="genre_list_item">Horror</button>
        <button className="genre_list_item">Thriller</button>
        <button className="genre_list_item">Romance</button>
        <button className="genre_list_item">Sci-Fi</button>
        <button className="genre_list_item">Documentarry</button>
      </nav>

      <section role="latest shows" className="latest-shows">
        <header className="section-header">
          <h3 aria-label="latest shows" className="section-title">
            Latest
          </h3>
          <p aria-label="see all">See all</p>
        </header>

        <div className="show-previews">
          {resources.map((resource) => (
            <MovieCard
              key={resource.id}
              title={resource.title}
              imgSrc={
                resource.poster
                  ? generatePoster(resource.poster)
                  : "https://img.freepik.com/premium-photo/flying-popcorn-3d-glasses-film-reel-clapboard-blue-background-3d-render-illustration_989822-1043.jpg?semt=ais_hybrid&w=740"
              }
            />
          ))}
        </div>
      </section>

      <section role="upcoming shows" className="upcoming-shows">
        <header className="section-header">
          <h3 aria-label="upcoming shows" className="section-title">
            Upcoming
          </h3>
        </header>

        <div className="show-previews">
          {upcomingResoures.map((upcomingResoure) => (
            <MovieCardL
              key={upcomingResoure.id}
              imageSrc={
                upcomingResoure.poster
                  ? generatePoster(upcomingResoure.poster)
                  : "https://img.freepik.com/premium-photo/flying-popcorn-3d-glasses-film-reel-clapboard-blue-background-3d-render-illustration_989822-1043.jpg?semt=ais_hybrid&w=740"
              }
              title={upcomingResoure.title}
              genre={upcomingResoure.genre}
              releaseDate={upcomingResoure.date}
            />
          ))}
        </div>
      </section>

      <footer className="home-footer" role="footer">
        <div className="nav-item"></div>
      </footer>
    </main>
  );
}
