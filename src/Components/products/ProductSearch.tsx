"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import ProductType from "@/types/Products.type";
import ProductCard from "./ProductCard";

export default function ProductSearch({
  allProducts,
}: {
  allProducts: ProductType[];
}) {
  const [searchedProducts, setsearchedProducts] = useState([]);

  function handleSearch(value: string) {
    const SearchedProducts = allProducts.filter((product) => {
      return product.title
        .trim()
        .toLowerCase()
        .includes(value.toLowerCase().trim());
    });
    if (value === "") {
      setsearchedProducts([]);
      console.log(searchedProducts);
    } else {
      setsearchedProducts(SearchedProducts as []);
      console.log(searchedProducts);
    }
  }

  return (
    <div className="mb-8 w-[95%] mx-auto">
      <Input
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        type="text"
        placeholder="Search"
      />
      {searchedProducts?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-7 py-3 gap-x-2 mt-8 mb-15 border border-slate-200 shadow ">
          {searchedProducts.map((product: ProductType) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}
