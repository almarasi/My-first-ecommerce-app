"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Keyboard, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

export default function MainSlider() {
  return (
    <div>
      <Swiper
        modules={[EffectFade, Autoplay, Keyboard]}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        effect={"fade"}
        keyboard={{ enabled: true }}
      >
        <SwiperSlide>
          <div className="w-full h-screen relative overflow-hidden">
            <Image
              priority
              loading="eager"
              src="/Images/sliders/mainSlider-2.jpg"
              alt="Slide 1"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <span className="absolute top-[70%] text-white font-bold text-5xl md:text-6xl w-full text-center">
              accessories
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-screen relative overflow-hidden">
            <Image
              priority
              loading="eager"
              src="/Images/sliders/mainSlider-4.jpg"
              alt="Slide 2"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <span className="absolute top-[70%] text-white font-bold text-5xl md:text-6xl w-full text-center">
              new
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-screen relative overflow-hidden">
            <Image
              priority
              loading="eager"
              src="/Images/sliders/mainSlider-3.jpg"
              alt="Slide 3"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <span className="absolute top-[70%] text-white font-bold text-5xl md:text-6xl w-full text-center">
              baggy trousers
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
