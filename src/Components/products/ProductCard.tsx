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
    <div>
      <Card className="p-0 card gap-1 relative overflow-hidden group hover:shadow-lg">
        <div className="absolute z-1 top-[20%] right-[-30%] group-hover:right-[3%] transition-all duration-400 flex flex-col gap-2">
          <ProductCardAddBtn id={product._id} />
          <button className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform duration-500 hover:text-blue-300 ">
            <Link href={`/products/${product._id}`}>
              <ZoomIn />
            </Link>
          </button>
        </div>
        <CardHeader className="p-0">
          <Link href={`/products/${product._id}`}>
            <div className="w-full h-40 md:h-50 lg:h-60 relative">
              <Image
                src={product.imageCover}
                alt="product-img"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover cursor-pointer absolute"
              />
            </div>
          </Link>
        </CardHeader>
        <CardContent className="px-3 flex justify-between items-center">
          <p className="text-sm">
            {product.title.split(" ").slice(0, 2).join()}
          </p>
          <WishlistAddBtn id={product._id} />
        </CardContent>
        <CardFooter className="px-3 flex-col gap-2 items-start">
          <p className="text-red-600">EGP {product.price}</p>
          <div className="flex items-center gap-1">
            <span>{product.ratingsAverage}</span>
            <MyStarRating product={product} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
