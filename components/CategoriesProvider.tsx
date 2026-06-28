"use client";

import { createContext, useContext, useState } from "react";

const CategoriesContext = createContext<string[]>([]);

export function CategoriesProvider({
  children,
  initial = [],
}: {
  children: React.ReactNode;
  initial?: string[];
}) {
  const [categories] = useState(initial);
  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
