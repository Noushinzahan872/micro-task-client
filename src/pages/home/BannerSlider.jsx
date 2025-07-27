import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";


const banners = [
  {
    image: "https://i.ibb.co/0jNsDdXJ/215e72cb-ff40-4c32-9682-7a42a6963529.jpg",
    title: "Earn Coins by Completing Tasks",
    description:
      "Join thousands of workers and earn coins by completing simple online micro-tasks daily.",
    buttonText: "Browse Tasks",
    route: "/dashboard/tasks",
  },
  {
    image: "https://i.ibb.co/TzGgw36/815045c8-4d31-4e7d-822d-ca432b6f9763.jpg",
    title: "Post Your Tasks, Get Work Done Fast",
    description:
      "As a buyer, you can post any task and let verified workers complete it quickly.",
    buttonText: "Post a Task",
    route: "/dashboard/add-task",
  },
  {
    image: "https://i.ibb.co/ymxNTyTx/fa340b36-836a-40d9-a2a7-01d190f2118b.jpg",
    title: "Withdraw Your Earnings Instantly",
    description:
      "Convert coins into real money and withdraw your earnings through secure methods.",
    buttonText: "Withdraw Now",
    route: "/dashboard/withdraw",
  },
];

const BannerSlider = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500 }}
        loop={true}
        className="rounded-2xl overflow-hidden shadow-lg"
      >
        {banners.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[520px]">
              <img
                className="w-full h-full object-cover"
                src={slide.image}
                alt={slide.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-6 sm:bottom-10 md:bottom-16 left-4 sm:left-8 md:left-16 z-10 text-white space-y-2 md:space-y-4 max-w-md sm:max-w-lg">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-green-500 drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-white drop-shadow-sm">
                  {slide.description}
                </p>
                <Link
                  to={slide.route}
                  className="btn btn-sm sm:btn-md bg-green-500 hover:bg-green-600 border-none text-black font-semibold rounded-full"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
