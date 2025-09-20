import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/Components/ui/card";
import ProductType from "@/types/Products.type";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import Link from "next/link";
import MyStarRating from "./MyStarRating";
import ProductCardAddBtn from "./ProductCardAddBtn";
import WishlistAddBtn from "./Wishlist/WishlistAddBtn";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="group">
      <Card className="p-0 card gap-1 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-0 rounded-xl">
        {/* Action Buttons */}
        <div className="absolute z-10 top-20 right-[-50px] group-hover:right-3 transition-all duration-500 flex flex-col gap-3">
          <ProductCardAddBtn id={product._id} />
          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all duration-300 hover:text-blue-500 hover:bg-white">
            <Link href={`/products/${product._id}`}>
              <ZoomIn size={18} />
            </Link>
          </button>
        </div>
        
        {/* Product Image */}
        <CardHeader className="p-0 relative overflow-hidden">
          <Link href={`/products/${product._id}`}>
            <div className="w-full h-48 md:h-56 lg:h-64 relative overflow-hidden">
              <Image
                src={product.imageCover}
                alt="product-img"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        </CardHeader>
        
        {/* Product Info */}
        <CardContent className="px-4 py-3 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 flex-1">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <WishlistAddBtn id={product._id} />
        </CardContent>
        <CardFooter className="px-4 pb-4 flex-col gap-2 items-start">
          <p className="text-red-600 text-sm font-bold">EGP {product.price}</p>
          <div className="flex items-center gap-1 ">
            <span>{product.ratingsAverage}</span>
            <MyStarRating product={product} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
