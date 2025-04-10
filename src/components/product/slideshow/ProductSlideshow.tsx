"use client";

import React, { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideshow.css";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      {images.length === 0 ? (
        <ProductImage
          alt={title}
          width={1024}
          height={800}
          className="rounded-md"
        />
      ) : (
        <>
          <Swiper
            spaceBetween={10}
            navigation={true}
            autoplay={{ delay: 4000 }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2"
          >
            {images.map((image) => (
              <SwiperSlide key={image}>
                <ProductImage
                  src={image}
                  alt={title}
                  key={image}
                  width={1024}
                  height={800}
                  className="rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {images.map((image) => (
              <SwiperSlide key={image}>
                <ProductImage
                  src={image}
                  alt={title}
                  width={300}
                  height={300}
                  className="rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};
