"use client";
import React, { useContext, useState } from "react";
import AddTocart from "../../../actions/Cart/addToCart.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";

import { CartCountContext } from "@/context/CartCountProvider";
import removeItemFromWishlist from "@/actions/wishlist/removeWishlistItem.action";
import { WishlistCountContext } from "@/context/WishlistCountProvider";

export default function WishlistAddtoCart({ id , getWishlist }: { id: string , getWishlist: ()=> void }) {
  const router = useRouter();
  const [isdisabled, setIsDisabled] = useState(false);

  // context
  const CartContext = useContext(CartCountContext);
  const WishlistContext = useContext(WishlistCountContext);
  const numberOfCartItems = CartContext?.numberOfCartItems;
  const setNumberOfCartItems = CartContext?.setNumberOfCartItems;
  const numberOfWishlistItems = WishlistContext?.numberOfWishlistItems;
  const setNumberOfWishlistItems = WishlistContext?.setNumberOfWishlistItems;
  const setWishlistIds = WishlistContext?.setWishlistIds;

  async function Addproduct(id: string) {
    setIsDisabled(true);
    try {
      const res = await AddTocart(id);
      if (res.status === "success") {
        const res = await removeItemFromWishlist(id);
        if (res.status === "success") {
          setIsDisabled(false);
          setNumberOfCartItems!(numberOfCartItems! + 1);
          setNumberOfWishlistItems?.(numberOfWishlistItems! - 1);
          toast.success("product Added Successfully", {
            duration: 2000,
            position: "top-right",
          });
          setWishlistIds!((prev) => prev.filter((itemId) => itemId !== id));
          getWishlist()
        }
      }
    } catch (err) {
      setIsDisabled(false);
      toast.error("pls login to add products", {
        duration: 2000,
        position: "top-right",
      });
      router.push("/login");
    }
  }

  return (
    <Button
      disabled={isdisabled}
      onClick={() => Addproduct(id)}
      className="cursor-pointer bg-white text-black border border-emerald-300 hover:bg-emerald-300 hover:text-white transition duration-300 p-3 sm:p-6 text-[13px] sm:text-lg"
    >
      Add to cart
    </Button>
  );
}
