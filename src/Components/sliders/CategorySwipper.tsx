"use client";

import CategoryType from "@/types/Category.type";
import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Keyboard } from "swiper/modules";

export default function CategorySwipper({
  allCategory,
}: {
  allCategory: CategoryType[];
}) {
  return (
    <div className="my-6">
      <Swiper
        slidesPerView={3}
        spaceBetween={25}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        keyboard={{ enabled: true }}
        modules={[Autoplay, Keyboard]}
      >
        {allCategory.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="w-[30vw] h-[100] md:h-[200] lg:h-[300] relative">
              <Image
                priority
                loading="eager"
                src={category.image}
                alt="Slide 1"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <p className="text-center font-bold text-[12px] lg:text-2xl my-1">
              {category.name}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
