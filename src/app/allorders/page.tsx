import getAllOrders from "@/actions/checkout/allorders.action";
import { CartItem, orderType } from "@/types/orders.type";
import Image from "next/image";

export default async function AllOrders() {
  const orders = await getAllOrders();
  console.log(orders);


  return (
    <div className=" w-[95%] sm:w-[90%] md:w-[80%] mt-25 rounded-xl bg-slate-200 mx-auto p-4">
      {orders?.length > 0 ? (
        <div>
          <div className="flex justify-between items-center my-5">
            <h2 className="font-bold text-3xl">Your orders</h2>
            <span className="text-slate-600">Total: {orders.length}</span>
          </div>

          <div className="flex flex-col gap-4">
            {orders.map((order: orderType) => {
              const orderId = order._id || order.id || "";
              const createdAt = order.createdAt || "";
              const isPaid = order.isPaid ?? false;
              const isDelivered = order.isDelivered ??  false;
              const paymentMethod = order.paymentMethodType  || "";
              const totalPrice = order.totalOrderPrice  ?? 0;
              const items: CartItem[] = order.cartItems  || [];

              return (
                <div key={orderId} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2 border-b pb-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-500">Order ID</span>
                      <span className="font-semibold break-all">{orderId}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-sm text-slate-500">Placed on</span>
                      <span className="font-medium">{createdAt ? new Date(createdAt).toLocaleString() : "-"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-sm font-medium">
                        {isPaid ? "Paid" : "Unpaid"}
                      </span>
                      <span className="px-2 py-1 rounded bg-sky-50 text-sky-700 text-sm font-medium">
                        {isDelivered ? "Delivered" : "In transit"}
                      </span>
                      {paymentMethod && (
                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-sm font-medium">
                          {String(paymentMethod).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-bold">
                      {totalPrice} EGP
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {items.length > 0 ? (
                      items.map((item: CartItem, idx: number) => {
                        const product = item.product || item;
                        const title = product?.title || "Product";
                        const quantity = item.count ?? 1;
                        const price = item.price ?? 0;
                        const image = product?.imageCover || "/vercel.svg";

                        return (
                          <div key={`${orderId}-${idx}`} className="flex items-center justify-between bg-slate-50 rounded p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-16 relative rounded overflow-hidden border">
                                <Image
                                  src={image}
                                  alt={title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium line-clamp-1 max-w-[220px] sm:max-w-[360px]">{title}</span>
                                <span className="text-sm text-slate-600">Qty: {quantity}</span>
                              </div>
                            </div>
                            <div className="font-semibold">{price * quantity} EGP</div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-slate-500 text-sm">No items found for this order.</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-xl mx-auto my-12">
          <h1 className="text-xl sm:text-3xl text-red-400 font-bold mb-6 text-center">
            no orders ... we are waiting for u !
          </h1>
        </div>
      )}
    </div>
  );
}
