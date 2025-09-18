"use client";
import getLoggedUserCart from "@/actions/Cart/getUserCart.action";
import { CartProductType } from "@/types/cart.type";
import React, { useEffect, useState, createContext } from "react";
import { useSession } from "next-auth/react";

type CartCountContextType = {
  numberOfCartItems: number;
  setNumberOfCartItems: React.Dispatch<React.SetStateAction<number>>;
};

export const CartCountContext = createContext<CartCountContextType | undefined>(
  undefined
);

export default function CartCountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const { data: session } = useSession();

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        const sum = res.data.products.reduce(
          (acc: number, product: CartProductType) => acc + product.count,
          0
        );
        setNumberOfCartItems(sum);
      } else {
        setNumberOfCartItems(0);
      }
    } catch (err) {
      setNumberOfCartItems(0);
    }
  }

  useEffect(() => {
    getUserCart();
  }, [session]);

  return (
    <CartCountContext.Provider
      value={{ numberOfCartItems, setNumberOfCartItems }}
    >
      {children}
    </CartCountContext.Provider>
  );
}
