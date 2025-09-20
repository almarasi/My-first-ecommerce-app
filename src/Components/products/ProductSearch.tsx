"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import ProductType from "@/types/Products.type";
import ProductCard from "./ProductCard";
import { Search, X } from "lucide-react";

export default function ProductSearch({
  allProducts,
}: {
  allProducts: ProductType[];
}) {
  const [searchedProducts, setsearchedProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(value: string) {
    setSearchValue(value);
    const SearchedProducts = allProducts.filter((product) => {
      return product.title
        .trim()
        .toLowerCase()
        .includes(value.toLowerCase().trim());
    });
    if (value === "") {
      clearSearch();
    } else {
      setsearchedProducts(SearchedProducts as []);
    }
  }

  function clearSearch() {
    setSearchValue("");
    setsearchedProducts([]);
  }

  return (
    <div className="mb-12 w-[95%] mx-auto">
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 z-10 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            value={searchValue}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            type="text"
            placeholder="Search for products..."
            className="pl-12 pr-12 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
          {searchValue && (
            <button
              onClick={clearSearch}
              className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchedProducts?.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Search Results
            </h3>
            <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
              {searchedProducts.length} product{searchedProducts.length !== 1 ? 's' : ''} found
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            {searchedProducts.map((product: ProductType) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchValue && searchedProducts?.length === 0 && (
        <div className="mt-8 text-center py-12">
          <div className="max-w-md mx-auto">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              Try searching with different keywords or browse our categories
            </p>
            <button
              onClick={clearSearch}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
