"use client";

import React, { useEffect, useState, createContext } from "react";
import { useSession } from "next-auth/react";
import getLoggedUserWishlist from "@/actions/wishlist/getUserWishlist.action";
import { WishlistType } from "@/types/wishlist.type";

type WishlistCountContextType = {
  numberOfWishlistItems: number;
  setNumberOfWishlistItems: React.Dispatch<React.SetStateAction<number>>;
  wishlistIds: string[];
  setWishlistIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export const WishlistCountContext = createContext<
  WishlistCountContextType | undefined
>(undefined);

export default function WishlistCountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [numberOfWishlistItems, setNumberOfWishlistItems] = useState(0);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const { data: session} = useSession();
  async function getUserWishlist() {
    try {
      const res = await getLoggedUserWishlist();
      if (res.status === "success") {
        setNumberOfWishlistItems(res.count);
        setWishlistIds(res.data.map((item: WishlistType) => item.id));
      }
    } catch (err) {
      setNumberOfWishlistItems(0);
      setWishlistIds([]);
    }
  }

  useEffect(() => {
    getUserWishlist();
  }, [session]);

  return (
    <WishlistCountContext.Provider
      value={{
        numberOfWishlistItems,
        setNumberOfWishlistItems,
        wishlistIds,
        setWishlistIds,
      }}
    >
      {children}
    </WishlistCountContext.Provider>
  );
}
