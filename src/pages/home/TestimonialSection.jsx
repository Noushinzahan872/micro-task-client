// components/TestimonialSection.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Fatema Akter",
    photo: "https://i.pravatar.cc/150?img=10",
    quote: "This platform changed the way I work online. Payments are smooth and tasks are interesting!",
  },
  {
    name: "Rafiul Islam",
    photo: "https://i.pravatar.cc/150?img=14",
    quote: "Amazing experience! As a buyer, I found the best workers here. Highly recommended.",
  },
  {
    name: "Jannat Jahan",
    photo: "https://i.pravatar.cc/150?img=20",
    quote: "I love how organized and fast this platform is. I got paid on time every time.",
  },
  {
    name: "Rabiul Karim",
    photo: "https://i.pravatar.cc/150?img=18",
    quote: "A really helpful platform for students like me to earn coins and learn!",
  },
];

const TestimonialSection = () => {
  return (
    <div className="py-16 bg-base-200">
      <div className="max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-600">What Our Users Say</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-center bg-base-100 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold">{t.name}</h4>
                <p className="text-gray-600 mt-2 italic">"{t.quote}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSection;
