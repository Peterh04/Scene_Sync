import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import "../styles/resultsPage.css";

export default function ResultsPage() {
  return (
    <main aria-label="results page" className="results-page">
      <header role="header" className="reults-page-primary-header">
        <SearchBar />
      </header>

      <h4 aria-label="title" className="title">
        Search results for "<soan>wednesday</soan>"
      </h4>
    </main>
  );
}
