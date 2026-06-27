"use client";

import { createContext, useContext, useState } from "react";

const NoteCategoriesContext = createContext<string[]>([]);

export function NoteCategoriesProvider({
  children,
  initial = [],
}: {
  children: React.ReactNode;
  initial?: string[];
}) {
  const [categories] = useState(initial);
  return (
    <NoteCategoriesContext.Provider value={categories}>
      {children}
    </NoteCategoriesContext.Provider>
  );
}

export function useNoteCategories() {
  return useContext(NoteCategoriesContext);
}
