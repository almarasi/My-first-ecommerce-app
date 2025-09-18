"use client";
import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Keyboard, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import ProductType from "@/types/Products.type";

export default function ProductDetailsSwipper({
  product,
}: {
  product: ProductType;
}) {
  return (
    <Swiper
      modules={[EffectFade, Autoplay, Keyboard, Pagination]}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      spaceBetween={30}
      effect={"fade"}
      keyboard={{ enabled: true }}
      pagination={{ clickable: true }}
    >
      {product.images.map((src, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-[550] relative">
            <Image
              src={src}
              priority
              alt="Product Image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
