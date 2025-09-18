"use client";
import React, { useState } from "react";
import CategoriesCard from "./CategoriesCard";
import SubCategories from "./SubCategories";
import CategoryType from "@/types/Category.type";

export default function CategoriesClient({
  allCategories,
  errorMsg,
}: {
  allCategories: CategoryType[];
  errorMsg?: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [CategoryName , setCategoryName] = useState<string>("");

  const handleCategoryClick = (id: string , CategoryName:string) => {
    setSelectedId(id);
    setLoading(true);
    setCategoryName(CategoryName)
  };

  const handleLoaded = () => setLoading(false);

  return (
    <div className="my-10 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-6 my-4 px-8">
        {allCategories.map((categorie) => (
          <button
            key={categorie._id}
            onClick={() => handleCategoryClick(categorie._id , categorie.name)}
            disabled={loading}
            className={loading ? "opacity-50" : ""}
          >
            <CategoriesCard categorie={categorie} />
          </button>
        ))}
      </div>
      {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
      {selectedId && (
        <SubCategories
          id={selectedId}
          onLoaded={handleLoaded}
          loading={loading}
          categoryName={CategoryName}
        />
      )}
    </div>
  );
}
