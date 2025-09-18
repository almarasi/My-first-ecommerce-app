"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/Components/ui/button";
import { toast } from "sonner";

import { Trash2 } from "lucide-react";
import { LoaderCircle } from "lucide-react";

import { WishlistType } from "@/types/wishlist.type";
import getLoggedUserWishlist from "@/actions/wishlist/getUserWishlist.action";
import removeItemFromWishlist from "@/actions/wishlist/removeWishlistItem.action";
import WishlistAddtoCart from "../../Components/products/Wishlist/WishlistAddtoCart";
import { WishlistCountContext } from "@/context/WishlistCountProvider";

export default function Wishlist() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [removeDisableBtn, setRemoveDisableBtn] = useState(false);
  const [wishlists , setWishlists] = useState<WishlistType[]>([])

  // context
  const WishlistContext = useContext(WishlistCountContext);

  const numberOfWishlistItems = WishlistContext?.numberOfWishlistItems;
  const setNumberOfWishlistItems = WishlistContext?.setNumberOfWishlistItems;
  const setWishlistIds = WishlistContext?.setWishlistIds;

  async function getUserWishlist() {
    try {
      const res = await getLoggedUserWishlist();
      console.log(res);
      if (res.status === "success") {
        setIsLoading(false);
        setWishlists!(res.data);
        setNumberOfWishlistItems!(res.count);
        setWishlistIds!(res.data.map((item: WishlistType) => item.id));
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error("pls login to see products", {
        duration: 2000,
        position: "top-right",
      });
      router.push("/login");
    }
  }

  async function deleteWishlist(id: string) {
    try {
      setRemoveDisableBtn(true);
      const res = await removeItemFromWishlist(id);
      if (res.status === "success") {
        getUserWishlist()
        setRemoveDisableBtn(false);
        toast.success("Product Deleted Successfuly", {
          duration: 2000,
          position: "top-right",
        }); 
      }
    } catch (err) {
      setRemoveDisableBtn(false);
      toast.error("Can't delete this product now!", {
        duration: 2000,
        position: "top-right",
      });
      router.push("/login");
    }
  }

  useEffect(() => {
    getUserWishlist();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin size-[50]" />
      </div>
    );
  }

  return (
    <div className=" w-[95%] sm:w-[90%] md:w-[80%] mt-25 rounded-xl bg-slate-200 mx-auto p-4">
      {wishlists!.length > 0 ? (
        <div className="cart-table">
          <div className="flex justify-between items-center my-5">
            <h2 className="font-bold text-3xl">My Wishlist</h2>
          </div>
          <div className="wishlist-box flex flex-col justify-center mt-6">
            {wishlists!.map((wishlist: WishlistType) => (
              <div
                key={wishlist?.id}
                className="product-row flex justify-between items-center bg-white p-4 rounded-lg mb-4 border-bottom border-slate-50"
              >
                <div className="flex items-center">
                  <Image
                    src={wishlist?.imageCover}
                    alt={wishlist?.title }
                    width={60}
                    height={90}
                    className="sm:w-[150px] w-auto h-auto sm:h-[170px] object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-center ms-3 gap-1">
                    <span className="font-bold line-clamp-1 text-[15px] sm:text-lg">
                      {wishlist?.title
                        ? wishlist.title.split(" ").slice(0, 2).join(" ")
                        : ""}
                    </span>
                    <span className="font-bold">{wishlist?.price} EGP</span>
                    <Button
                      disabled={removeDisableBtn}
                      onClick={() => {
                        deleteWishlist(wishlist?.id);
                      }}
                      className="cursor-pointer text-[13px] sm:text-lg flex items-center gap-2 bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-red-700 w-fit"
                    >
                      <Trash2 className="size-[13px]" />
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="flex items-center">
                  <WishlistAddtoCart getWishlist={getUserWishlist} id={wishlist?.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center font-bold my-12 text-3xl text-emerald-700">
          WISHLIST IS EMPTY
        </h1>
      )}
    </div>
  );
}
