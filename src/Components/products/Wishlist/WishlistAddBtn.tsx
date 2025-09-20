"use client";
import React, { useContext, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AddToWishilist from "@/actions/wishlist/AddToWishlist.action";
import { WishlistCountContext } from "@/context/WishlistCountProvider";
import removeItemFromWishlist from "@/actions/wishlist/removeWishlistItem.action";

export default function WishlistAddBtn({ id }: { id: string }) {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  // context
  const WishlistContext = useContext(WishlistCountContext);
  const wishlistIds = WishlistContext?.wishlistIds ?? [];
  const numberOfWishlistItems = WishlistContext?.numberOfWishlistItems ?? 0;
  const setNumberOfWishlistItems = WishlistContext?.setNumberOfWishlistItems;
  const setWishlistIds = WishlistContext?.setWishlistIds;
  const [isClicked, setIsClicked] = useState(false);

  async function handleWishlist(id: string) {
    setIsDisabled(true);
    if (!isClicked) {
      // Add to wishlist
      try {
        const res = await AddToWishilist(id);
        if (res.status === "success") {
          setIsClicked(true);
          toast.success("Product added successfully", {
            duration: 2000,
            position: "top-right",
          });
          setNumberOfWishlistItems?.(numberOfWishlistItems + 1);
          setWishlistIds?.((prev) => (prev?.includes(id) ? prev : [...prev, id]));
        }
      } catch (err) {
        toast.error("Please login to add products", {
          duration: 2000,
          position: "top-right",
        });
        router.push("/login");
      } finally {
        setIsDisabled(false);
      }
    } else {
      // Remove from wishlist
      try {
        const res = await removeItemFromWishlist(id);
        if (res.status === "success") {
          setIsClicked(false);
          toast.success("Product removed successfully", {
            duration: 2000,
            position: "top-right",
          });
          setNumberOfWishlistItems?.(numberOfWishlistItems - 1);
          setWishlistIds?.((prev) => prev?.filter((pid) => pid !== id) ?? []);
        }
      } catch (err) {
        toast.error("Please login to remove products", {
          duration: 2000,
          position: "top-right",
        });
        router.push("/login");
      } finally {
        setIsDisabled(false);
      }
    }
  }

  useEffect(() => {
    setIsClicked(wishlistIds.includes(id));
  }, [wishlistIds, id]);

  return (
    <button
      disabled={isDisabled}
      className="disabled:opacity-50"
      onClick={() => handleWishlist(id)}
    >
      <Heart
        className={`${
          isClicked ? "text-red-700" : "text-black"
        } size-[25px] cursor-pointer`}
      />
    </button>
  );
}
