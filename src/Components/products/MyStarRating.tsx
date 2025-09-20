"use client";
import ProductType from "@/types/Products.type";
import React from "react";
import { StarRating } from "react-flexible-star-rating";

export default function MyStarRating({ product }: { product: ProductType }) {
  return (
    <StarRating
      initialRating={Math.floor(product.ratingsAverage)}
      dimension={5}
      isReadOnly={true}
    />
  );
}
