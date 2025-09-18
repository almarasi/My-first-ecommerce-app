import React from "react";
import getCategories from "@/actions/categories.action";
import CategoriesClient from "./CategoriesClient";

export default async function AllCategories() {
  const res = await getCategories();
  const allCategories = res.data || [];
  const errorMsg = res.message;

  return <CategoriesClient allCategories={allCategories} errorMsg={errorMsg} />;
}
