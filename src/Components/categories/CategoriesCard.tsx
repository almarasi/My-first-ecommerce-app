import React from "react";
import { Card, CardFooter, CardHeader } from "@/Components/ui/card";
import Image from "next/image";
import CategoryType from "@/types/Category.type";

export default function CategoriesCard({
  categorie,
}: {
  categorie: CategoryType;
}) {
  return (
    <div>
      <Card className="p-0 pb-3 gap-1 *:overflow-hidden  hover:shadow-xl transition duration-300">
        <CardHeader className="p-0">
          <div className="w-full h-40 md:h-45 lg:h-50 relative rounded-lg">
            <Image
              src={categorie.image}
              alt="product-img"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover cursor-pointer rounded-t-lg absolute"
            />
          </div>
        </CardHeader>
        <CardFooter className="p-0">
          <span className="font-bold text-center w-full">
            {categorie.name}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
