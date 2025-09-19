import React from "react";
import getProducts from "@/actions/products.action";
import ProductType from "@/types/Products.type";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";

export default async function AllProducts() {
  const res = await getProducts();
  const allProducts = res.data || [];
  const errorMsg = res.message;

  return (
    <div className="my-8 ">
      <ProductSearch allProducts={allProducts} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-5 my-8  w-[95%] mx-auto">
        {allProducts.map((product: ProductType) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
    </div>
  );
}
