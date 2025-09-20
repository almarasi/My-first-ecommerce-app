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
    <div className=" my-5 sm:my-8">
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 35,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        keyboard={{ enabled: true }}
        modules={[Autoplay, Keyboard]}
        className="category-swiper"
      >
        {allCategory.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-square relative">
                  <Image
                    priority
                    loading="eager"
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <p className="text-center font-bold text-[12px] lg:text-2xl my-1">
                {category.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
