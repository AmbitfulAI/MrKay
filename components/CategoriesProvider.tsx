"use client";

import { createContext, useContext, useState } from "react";

export interface CategoryOption { _id: string; title: string; }

const CategoriesContext = createContext<CategoryOption[]>([]);

export function CategoriesProvider({
  children,
  initial = [],
}: {
  children: React.ReactNode;
  initial?: CategoryOption[];
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
