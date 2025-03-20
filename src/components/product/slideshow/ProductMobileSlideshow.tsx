"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      {images.length === 0 ? (
        <ProductImage
          alt={title}
          className="block sm:hidden"
          width={600}
          height={500}
        />
      ) : (
        <Swiper
          style={{
            width: "100vw",
            height: "500px",
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 2500 }}
          modules={[FreeMode, Autoplay, Pagination]}
          className="mySwiper2"
        >
          {images.map((image) => (
            <SwiperSlide key={image}>
              <ProductImage
                src={image}
                alt={title}
                key={image}
                width={600}
                height={500}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
