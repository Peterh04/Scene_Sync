import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBar({
  searchActive,
  setSearchActive,
  searchResources,
  setSearchResources,
}) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODUwYWY0Mzc0MjU3N2QxMGUwOTA4MTM4YmUwYWRmNSIsIm5iZiI6MTc1NzIzMTU2OS4zMiwic3ViIjoiNjhiZDM5ZDE1Mzg1MDE0NTFiNGU1ZDkzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dKy_zn9FWtM_p8bGQzoxEl9jSR413i3ZHUbqEaKkpHA",
    },
  };

  const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=true&language=en-US&page=1`;

  useEffect(() => {
    const getResults = async () => {
      try {
        if (search.length < 3) return;
        const response = await fetch(searchUrl, options);
        if (response.ok) {
          const data = await response.json();
          const resources = data?.results.map((resource) => ({
            id: resource.id,
            type: resource.media_type,
            title: resource?.name ? resource.name : resource?.title,
            overview: resource.overview,
            date: resource?.first_air_date
              ? resource?.first_air_date
              : resource?.release_date,
            poster: resource.poster_path,
          }));
          setSearchResources(resources);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const timeOutId = setTimeout(getResults, 800);
    return () => clearTimeout(timeOutId);
  }, [search]);
  return (
    <div className="search-container">
      <form aria-label="search" className="header-search">
        <div className="input-wrapper">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="fa" />
          <input
            type="search"
            value={search}
            placeholder="Search"
            onFocus={() => setSearchActive(true)}
            onChange={handleSearch}
          />
        </div>
      </form>

      {searchActive && (
        <div
          aria-label="search-suggestion"
          className="search-suggestion-wrapper"
        >
          {searchResources.slice(0, 5).map((resource) => (
            <Link
              to={`/${resource.type}/${resource.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="link-div"
              key={resource.id}
            >
              <div className="search-suggestion">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="fa" />
                <p>{resource.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
