import { Swiper } from 'swiper/react';
import { Autoplay } from 'swiper';

const Slider = ({ children }) => {
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={3.5}
            className="w-full lg:w-4/6 mx-auto"
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            breakpoints={{
                320: {
                    width: 320,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    centeredSlides: true,
                },
                425: {
                    width: 425,
                    slidesPerView: 2,
                    spaceBetween: 5,
                    centeredSlides: true,
                },
                768: {
                    width: 768,
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    width: 1024,
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1440: {
                    width: 1440,
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }}
        >
            {children}
        </Swiper>
    );
};

export default Slider;
