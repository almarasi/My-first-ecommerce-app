import React from "react";
import getCategories from "@/actions/categories.action";
import CategorySwipper from "./CategorySwipper";

const res = await getCategories();
const allCategories = res.data || [];
const errorMsg = res?.message;
// console.log(errorMsg);
// console.log(allCategories);

export default function CategorySlider() {
  return (
    <div className="w-[95%] mt-8 mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Shop by Category
        </h2>
        <p className="text-[15px] sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our diverse range of categories and find exactly what you are looking for
        </p>
      </div>
      <CategorySwipper allCategory={allCategories} />
      {errorMsg && (
        <div className="text-center mt-8">
          <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg inline-block">
            {errorMsg}
          </p>
        </div>
      )}
    </div>
  );
}
