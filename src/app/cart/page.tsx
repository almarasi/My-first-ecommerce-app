"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import { Button } from "@/Components/ui/button";
import { Trash2 } from "lucide-react";
import { LoaderCircle } from "lucide-react";

import getLoggedUserCart from "@/actions/Cart/getUserCart.action";
import { CartProductType } from "@/types/cart.type";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import removeItemFromCart from "@/actions/Cart/removeCartItem.action";
import ClearCart from "@/actions/Cart/clearCartItems.action";
import UpdateCartQuantity from "@/actions/Cart/updateCartQuantity.action";
import { CartCountContext } from "@/context/CartCountProvider";
import Link from "next/link";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [removeDisableBtn, setRemoveDisableBtn] = useState(false);
  const [clearDisableBtn, setClearDisableBtn] = useState(false);
  const [updateDisableBtn, setUpdateDisableBtn] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUpdatedID, setCurrentUpdatedID] = useState("0");

  // context
  const cartContext = useContext(CartCountContext);
  const numberOfCartItems = cartContext?.numberOfCartItems;
  const setNumberOfCartItems = cartContext?.setNumberOfCartItems;
  const [cartId , setCartId] = useState("")

  console.log(cartId);

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();
      console.log(res);
      if (res.status === "success") {
        setIsLoading(false);
        setTotalPrice(res.data.totalCartPrice);
        setProducts(res.data.products);
        setCartId(res.cartId)
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error("pls login to add products", {
        duration: 2000,
        position: "top-right",
      });
      redirect("/login");
    }
  }

  async function deleteProduct(id: string) {
    try {
      setRemoveDisableBtn(true);
      setUpdateDisableBtn(true);
      const res = await removeItemFromCart(id);
      if (res.status === "success") {
        setRemoveDisableBtn(false);
        setUpdateDisableBtn(false);
        setProducts(res.data.products);
        setTotalPrice(res.data.totalCartPrice);
        toast.success("Product Deleted Successfuly", {
          duration: 2000,
          position: "top-right",
        });
        const sum = res.data.products.reduce(
          (acc: number, product: CartProductType) => acc + product.count,
          0
        );
        setNumberOfCartItems!(sum);
      }
    } catch (err) {
      setRemoveDisableBtn(false);
      setUpdateDisableBtn(false);
      toast.error("Can't delete this product now!", {
        duration: 2000,
        position: "top-right",
      });
    
    }
  }

  async function Clear() {
    try {
      setClearDisableBtn(true);
      const res = await ClearCart();
      if (res.message === "success") {
        console.log("1");
        setClearDisableBtn(false);
        setProducts([]);
        toast.success("cart cleared successfuly", {
          duration: 2000,
          position: "top-right",
        });
        setNumberOfCartItems!(0);
      }
    } catch (err) {
      setClearDisableBtn(false);
      toast.error("Can't clear the cart right now", {
        duration: 2000,
        position: "top-right",
      });
      return err
    }
  }

  async function UpdateProduct(id: string, count: string, sign: string) {
    try {
      setCurrentUpdatedID(id);
      setUpdateDisableBtn(true);
      setRemoveDisableBtn(true);
      setUpdateLoading(true);
      const res = await UpdateCartQuantity(id, count);
      console.log(res);
      if (res.status === "success") {
        setUpdateDisableBtn(false);
        setRemoveDisableBtn(false);
        setUpdateLoading(false);
        setProducts(res.data.products);
        setTotalPrice(res.data.totalCartPrice);
        toast.success("Quantity Updated successfuly", {
          duration: 2000,
          position: "top-right",
        });
        if (sign === "+") {
          setNumberOfCartItems!(numberOfCartItems! + 1);
        } else if (sign === "-") {
          setNumberOfCartItems!(numberOfCartItems! - 1);
        }
      }
    } catch (err) {
      setUpdateDisableBtn(false);
      setRemoveDisableBtn(false);
      setUpdateLoading(false);
      toast.error("Can't update the cart right now", {
        duration: 2000,
        position: "top-right",
      });
      return err
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin size-[50]" />
      </div>
    );
  }

  return (
    <div className=" w-[95%] sm:w-[90%] md:w-[80%] mt-30 rounded-xl bg-slate-200 mx-auto p-4">
      {products.length > 0 ? (
        <div className="cart-table">
          <div className="flex justify-between items-center my-5">
            <h2 className="font-bold text-3xl">Cart Shop</h2>
            <Link href={`/checkout/${cartId}`}>
              <Button className="py-6 px-5 bg-blue-600 hover:bg-blue-700 cursor-pointer">
                Checkout
              </Button>
            </Link>
          </div>
          <div className="flex justify-between items-center my-5">
            <span className="font-bold text-[15px] sm:text-lg">
              total price:
              <span className="text-emerald-600"> {totalPrice}</span>
            </span>
            <span className="font-bold text-[15px] sm:text-lg">
              total number of items:{" "}
              <span className="text-emerald-600">{numberOfCartItems}</span>
            </span>
          </div>
          <div className="product-box flex flex-col justify-center mt-6">
            {products.map((product: CartProductType) => (
              <div
                key={product._id}
                className="product-row flex justify-between items-center bg-white p-4 rounded-lg mb-4 border-bottom border-slate-50"
              >
                <div className="flex items-center">
                  <Image
                    src={product.product.imageCover}
                    alt="product image"
                    width="60"
                    height="90"
                    className="sm:w-[150px] w-auto h-auto sm:h-[170px] object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-center ms-5 gap-1">
                    <span className="font-bold line-clamp-1 text-[15px] sm:text-lg">
                      {product.product.title}
                    </span>
                    <span className="font-bold">
                      {product.price * product.count} EGP
                    </span>
                    <Button
                      disabled={removeDisableBtn}
                      onClick={() => {
                        deleteProduct(product.product._id);
                      }}
                      className="cursor-pointer text-[15px] sm:text-lg flex items-center gap-2 bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-red-700 w-fit"
                    >
                      <Trash2 className="size-[15px]" />
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    onClick={() => {
                      UpdateProduct(
                        product.product.id,
                        `${product.count - 1}`,
                        "-"
                      );
                    }}
                    disabled={updateDisableBtn}
                    className="px-2 py-1 sm:px-4 sm:py-3 text-black bg-white border border-blue-400 hover:bg-blue-200 cursor-pointer"
                  >
                    <span className="text-[15px] sm:text-lg font-bold ">-</span>
                  </Button>
                  <div className="mx-3 text-lg font-bold">
                    {updateLoading ? (
                      <div>
                        {" "}
                        {currentUpdatedID == product.product.id ? (
                          <LoaderCircle className="animate-spin size-[20]" />
                        ) : (
                          <div>{product.count}</div>
                        )}{" "}
                      </div>
                    ) : (
                      <div>{product.count}</div>
                    )}
                  </div>
                  <Button
                    onClick={() => {
                      UpdateProduct(
                        product.product.id,
                        `${product.count + 1}`,
                        "+"
                      );
                    }}
                    disabled={updateDisableBtn}
                    className="px-2 py-2 sm:px-4 sm:py-3 text-black bg-white border border-blue-400 hover:bg-blue-200 cursor-pointer"
                  >
                    <span className="text-[15px] sm:text-lg font-bold">+</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="my-2">
            <Button
              disabled={clearDisableBtn}
              onClick={Clear}
              className="w-full cursor-pointer"
            >
              Clear Your Cart
            </Button>
          </div>
        </div>
      ) : (
        <h1 className="text-center font-bold my-12 text-3xl text-emerald-700">
          CART IS EMPTY
        </h1>
      )}
    </div>
  );
}
