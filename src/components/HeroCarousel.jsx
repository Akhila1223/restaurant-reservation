import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./HeroCarousel.css";

const slides = [
  {
    title: "Discover the Best Restaurants",
    description: "Explore amazing dining experiences across the USA.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600",
  },
  {
    title: "Reserve Your Perfect Table",
    description: "Find your favourite restaurant and book your table easily.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600",
  },
  {
    title: "Enjoy Delicious Moments",
    description: "Great food, beautiful places, unforgettable experiences.",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600",
  },
];

function HeroCarousel() {
  return (
    <section className="hero-carousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `linear-gradient(
                  rgba(0,0,0,0.5),
                  rgba(0,0,0,0.5)
                ), url("${slide.image}")`,
              }}
            >
              <div className="hero-slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroCarousel;