import React from "react";
import { getProductDetails, getRelatedProducts } from "@/actions/products.action";
import ProductDetailsUI from "../../../Components/products/productDetails/ProductDetailsUI";
import ProductType from "@/types/Products.type";
import ProductCard from "@/Components/products/ProductCard";
import ScrollToTop from "@/Components/ScrollToTop";
export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // console.log(id);

  const res = await getProductDetails(id);
  const productDetails = res.data || {};
  const errorMsg = res.message;
  console.log(errorMsg);
  if(!res){
    return null
  }
  console.log(res)
  const cartId = res.data.category._id
  const RelatedProducts = await getRelatedProducts(cartId)
  console.log(RelatedProducts)

  return (
    <div className="my-25 lg:w-[95%] mx-auto px-2 sm:px-4">
      <ScrollToTop />
      <ProductDetailsUI product={productDetails} />
      {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
      <div className="my-7 ">
      <h1 className="text-start font-bold text-3xl px-2 sm:px-4 py-2.5 lg:w-[95%] mx-auto">
        Related Products
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-7 gap-x-2 my-8 px-1">
        {RelatedProducts.data.map((product: ProductType) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
    </div>
    </div>
  );
}
