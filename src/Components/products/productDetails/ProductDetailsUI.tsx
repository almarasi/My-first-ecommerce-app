import { ProductDetailsType } from "@/types/ProductDetails.type";
import React from "react";

import MyStarRating from "../MyStarRating";
import ProductDetailsSwipper from "./ProductDetailsSwipper";
import ProductDetailsAddBtn from "./ProductDetailsAddBtn";

export default function ProductDetailsUI({
  product,
}: {
  product: ProductDetailsType;
}) {
  return (
    <div className="flex justify-between items-center gap-4 flex-wrap md:flex-nowrap">
      <div className="w-[80%] mx-auto md:w-2/5 mt-5">
        {" "}
        <ProductDetailsSwipper product={product} />
      </div>
      <div className="w-full md:w-3/5 mt-5">
        <h2 className="text-3xl font-bold tracking-tighter">{product.title}</h2>
        <p className="text-slate-500 my-5 text-lg tracking-tighter">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg my-4">{product.category.name}</p>
            <p className="text-lg my-4">{product.price} EGP</p>
          </div>
          <div className="flex gap-2 items-center">
            <MyStarRating product={product} />
            <span>{product.ratingsAverage}</span>
          </div>
        </div>
        <ProductDetailsAddBtn id={product._id} />
      </div>
    </div>
  );
}
