"use client";
import React, { useContext, useState } from "react";
import { ShoppingCart } from "lucide-react";
import AddTocart from "../../actions/Cart/addToCart.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { CartCountContext } from "@/context/CartCountProvider";

export default function ProductCardAddBtn({ id }: { id: string }) {
  const [isdisabled, setIsDisabled] = useState(false);
  const cartContext = useContext(CartCountContext);
  const numberOfCartItems = cartContext?.numberOfCartItems;
  const setNumberOfCartItems = cartContext?.setNumberOfCartItems;


  async function Addproduct(id: string) {
    setIsDisabled(true);
    const res = await AddTocart(id);
    console.log(res);
    try {
      if (res.status === "success") {
        setIsDisabled(false);
        toast.success("product Added Successfully", {
          duration: 2000,
          position: "top-right",
        });
        setNumberOfCartItems!(numberOfCartItems! + 1);
      }
    } catch (err) {
      setIsDisabled(false);
      toast.error("pls login to add products", {
        duration: 2000,
        position: "top-right",
      });
      redirect("/login");
    }
  }

  return (
    <button
      disabled={isdisabled}
      onClick={() => Addproduct(id)}
      className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform duration-500 hover:text-blue-300 "
    >
      <ShoppingCart />
    </button>
  );
}
