import { useEffect } from "react";
import { useSaved } from "../context/SavedContext";
import "../styles/savedPage.css";
import generatePoster from "../utils/generatePoster";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
useSaved;

export default function SavedPage() {
  const { savedResources } = useSaved();

  useEffect(() => {
    console.log(savedResources);
  }, []);

  return (
    <main aria-label="saved page" className="save-page">
      <nav aria-label="filter-resource-type" className="resource-filter">
        <button className="resource_list_item">All</button>
        <button className="resource_list_item">Tv</button>
        <button className="resource_list_item">Movies</button>
      </nav>

      <div className="resources-preview" aria-label="resource-preview">
        {savedResources.map((resource) => (
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
      <Navbar />
    </main>
  );
}
