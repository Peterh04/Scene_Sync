import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchResources, setSearchResources] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchActive,
        setSearchActive,
        searchResources,
        setSearchResources,
        search,
        setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
