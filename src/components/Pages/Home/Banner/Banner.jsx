import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  return (
    <div className="banner-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Swiper modules
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay setup
        loop={true} // Infinite loop
        slidesPerView={1}
        spaceBetween={10}
      >
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://i.ibb.co.com/ydK2sWz/DALL-E-2024-12-22-15-36-35-A-visually-striking-banner-design-for-an-online-group-study-web-applicati.webp"
              alt="Slide 1"
              className="w-full max-h-[90vh] object-cover dark:brightness-75"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://i.ibb.co.com/LS0s8H5/DALL-E-2024-12-22-15-35-03-A-modern-and-vibrant-website-banner-for-Task-Hub-an-online-group-study-an.webp"
              alt="Slide 2"
              className="w-full max-h-[90vh] object-cover dark:brightness-75"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://i.ibb.co.com/1ZHj7gk/DALL-E-2024-12-22-15-34-20-A-modern-and-vibrant-website-banner-for-an-online-group-study-platform-na.webp"
              alt="Slide 3"
              className="w-full max-h-[90vh] object-cover dark:brightness-75"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
