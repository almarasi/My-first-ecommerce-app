import React from "react";
import getBrands from "@/actions/brands.action";
import { BrandType } from "@/types/Brand.type";
import { Card, CardFooter, CardHeader } from "@/Components/ui/card";
import Image from "next/image";

export default async function AllBrands() {
  const res = await getBrands();
  const allBrands = res.data || [];
  const errorMsg = res.message;

  return (
    <div className="my-7 ">
      <h1 className="text-center font-bold text-3xl px-2 sm:px-4 py-2.5 lg:w-[95%] mx-auto">
        All Brands
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-5 my-8 px-8">
        {allBrands.map((brand: BrandType) => (
          <div key={brand._id}>
            <Card className="p-0 pb-3 gap-1 *:overflow-hidden  hover:shadow-xl transition duration-300">
              <CardHeader className="p-0">
                <div className="w-full h-40 md:h-45 lg:h-50 relative rounded-lg">
                  <Image
                    src={brand.image}
                    alt="product-img"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-t-lg absolute"
                  />
                </div>
              </CardHeader>
              <CardFooter className="p-0">
                <span className="font-bold text-center w-full">
                  {brand.name}
                </span>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
    </div>
  );
}
