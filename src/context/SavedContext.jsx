import { createContext, useContext, useState } from "react";

const SavedContext = createContext();

export function SavedProvider({ children }) {
  const [savedResources, setSavedResources] = useState([]);

  const saveResource = (resource) => {
    if (savedResources.includes(resource)) return;
    setSavedResources((resources) => [...resources, resource]);
  };

  const removeResource = (resourceId) => {
    const newSavedResources = savedResources.filter(
      (resource) => resource.id !== resourceId
    );

    setSavedResources(newSavedResources);
  };

  const isApproved = (resourceId) => {
    return savedResources.some((resource) => resource.id === resourceId);
  };

  return (
    <SavedContext.Provider
      value={{
        savedResources,
        saveResource,
        removeResource,
        isApproved,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  return useContext(SavedContext);
}
