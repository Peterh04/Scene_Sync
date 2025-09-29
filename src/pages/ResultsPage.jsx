import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { useSearch } from "../context/SearchContext";
import "../styles/resultsPage.css";
import generatePoster from "../utils/generatePoster";
import { useLocation } from "react-router-dom";

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODUwYWY0Mzc0MjU3N2QxMGUwOTA4MTM4YmUwYWRmNSIsIm5iZiI6MTc1NzIzMTU2OS4zMiwic3ViIjoiNjhiZDM5ZDE1Mzg1MDE0NTFiNGU1ZDkzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dKy_zn9FWtM_p8bGQzoxEl9jSR413i3ZHUbqEaKkpHA",
    },
  };

  const { search } = useSearch();

  const params = new URLSearchParams(location.search);

  const keyword = params.get("keyword") || "";

  useEffect(() => {
    const fetchResults = async () => {
      if (!keyword) return;

      const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=true&language=en-US&page=1`;

      try {
        const response = await fetch(searchUrl, options);
        if (response.ok) {
          const data = await response.json();
          const mapped = data.results.map((r) => ({
            id: r.id,
            type: r.media_type,
            title: r?.name ? r.name : r?.title,
            overview: r.overview,
            date: r?.first_air_date || r?.release_date,
            poster: r.poster_path,
          }));
          setResults(mapped);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchResults();
  }, [keyword]);

  return (
    <main aria-label="results page" className="results-page">
      <header role="header" className="reults-page-primary-header">
        <SearchBar />
      </header>

      <h4 aria-label="title" className="title">
        Search results for "<span>{search}</span>"
      </h4>

      <nav aria-label="filter-resource-type" className="resource-filter">
        <button className="resource_list_item">All</button>
        <button className="resource_list_item">Tv</button>
        <button className="resource_list_item">Movies</button>
      </nav>

      <div className="resources-preview" aria-label="resource-preview">
        {results.map((resource) => (
          <MovieCard
            key={resource.id}
            imgSrc={
              resource.poster
                ? generatePoster(resource.poster)
                : "https://img.freepik.com/premium-photo/flying-popcorn-3d-glasses-film-reel-clapboard-blue-background-3d-render-illustration_989822-1043.jpg?semt=ais_hybrid&w=740"
            }
            title={resource.title}
            resourceId={resource.id}
            resourceType={resource.type}
          />
        ))}
      </div>
    </main>
  );
}
