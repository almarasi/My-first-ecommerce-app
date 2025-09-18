import React from "react";
import getCategories from "@/actions/categories.action";
import CategorySwipper from "./CategorySwipper";

const res = await getCategories();
const allCategories = res.data || [];
const errorMsg = res.message;
// console.log(errorMsg);
// console.log(allCategories);

export default function CategorySlider() {
  return (
    <div className="my-7 w-[95%]  mx-auto">
      <h1 className="text-start font-bold text-3xl">Category Slider</h1>
      <CategorySwipper allCategory={allCategories} />
      {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
    </div>
  );
}
