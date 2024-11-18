import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Slide from "./Slide";
import "./swiper.css";

const bannerImages = [
  "https://images.unsplash.com/photo-1576091358783-a212ec293ff3?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1523243319451-54b60322f948?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1579723798913-390e4be1d6ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Banner = () => {
  return (
    <div className="mx-auto mt-6 mb-10 h-[350px] md:h-[450px] lg:h-[480px] relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{ delay: 2000 }}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
        className="mySwiper"
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Slide image={image} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-4xl md:text-5xl w-[80%] mx-auto lg:text-6xl absolute top-[20%] left-[10%] z-20 text-center">
        <h1 className="font-bold w-fit mx-auto  select-none font-lexend mb-8 text-primary-teal">
          Pharma<span className="font-bold text-sec-mint-green">Mart</span>
        </h1>
        <p className="text-base lg:text-xl w-[80%] md:w-[70%] lg:w-[60%] mx-auto text-slate-200">
          Welcome to PharmaMart - Your Trusted Online Pharmacy! Discover a wide
          range of medicines, health essentials, and wellness products at
          unbeatable prices. Shop conveniently, securely, and with confidence.
          Your health, our priority!
        </p>
      </div>
    </div>
  );
};

export default Banner;
