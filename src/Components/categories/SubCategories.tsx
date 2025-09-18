"use client";
import { getSubCategories } from "@/actions/categories.action";
import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { SubType } from "@/types/SubCategory.type";

export default function SubCategories({
  id,
  onLoaded,
  categoryName
}: {
  id: string;
  onLoaded?: () => void;
  loading?: boolean;
  categoryName?: string
}) {
  const [subCategories, setSubCategories] = useState<SubType[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchSubCategories() {
    setIsLoading(true);
    const res = await getSubCategories(id);
    console.log(res)
    setSubCategories(res.data || []);
    setErrorMsg(res.message || "");
    setIsLoading(false);
    onLoaded!();
  }

  useEffect(() => {
    fetchSubCategories();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoaderCircle className="animate-spin size-[50]" />
      </div>
    );
  }

  if (errorMsg) {
    return <p className="text-red-500 text-center">{errorMsg}</p>;
  }

  return (
    <div className="my-12">
      <h2 className="text-center text-xl sm:text-3xl font-bold text-emerald-400">{categoryName}</h2>
      <div className=" my-5 grid gap-4 grid-cols-2 sm:grid-cols-3 px-8">
        {subCategories.map((sub) => (
          <div
            key={sub._id}
            className="border border-slate-200 py-4 px-4 rounded-xl flex items-center justify-center"
          >
            <span className="font-bold block text-center text-[15px] sm:text-2xl">
              {sub.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
