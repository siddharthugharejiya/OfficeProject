import React, { useState } from "react";
// import Nav from "./Nav";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { motion } from "framer-motion";
import { Nav } from "./Nav";

const slidess = [
    {
        id: 1,
        image: "https://cdn.shopify.com/s/files/1/0905/2012/files/shopiodecor-slider02.jpg?v=1645586328",
        subtitle: "online exclusive",
        title: "simple way to setup your space",
        description: "Best furniture for your house.",
        buttonText: "View Collection",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2016&q=80",
        subtitle: "new arrivals",
        title: "modern furniture collection",
        description: "Transform your living space with our premium collection.",
        buttonText: "Shop Now",
    },
];

const AnimatedImageSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full relative overflow-hidden">
            <div className="absolute top-0 w-full z-50">
                <Nav />
            </div>

            <Swiper
                slidesPerView={1}
                loop={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {slidess.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-[50vh] xs:h-[60vh] sm:h-[80vh] md:h-[80vh] lg:h-[110vh] xl:h-screen 2xl:h-screen flex items-center justify-center">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            ></div>

                            {/* Content */}
                            <div className="relative z-10 w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center h-full">
                                    <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-3">
                                        <motion.p
                                            key={activeIndex} // slide change par animate
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.8 }}
                                            className="text-[#b86c59] text-xs xs:text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider"
                                        >
                                            {slide.subtitle}
                                        </motion.p>

                                        <motion.h1
                                            key={activeIndex + "-title"}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4, duration: 0.8 }}
                                            className="font-bold text-white uppercase text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
                                        >
                                            {slide.title}
                                        </motion.h1>

                                        <motion.p
                                            key={activeIndex + "-desc"}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6, duration: 0.8 }}
                                            className="text-gray-200 text-sm xs:text-base sm:text-lg md:text-xl font-medium leading-relaxed"
                                        >
                                            {slide.description}
                                        </motion.p>

                                        <motion.button
                                            key={activeIndex + "-btn"}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8, duration: 0.8 }}
                                            className="bg-gradient-to-r from-[#b86c59] to-[#d4a574] hover:from-[#a55a4a] hover:to-[#c19a6b] text-white font-bold px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-[9px] sm:text-[12px] md:text-[13px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                        >
                                            {slide.buttonText}
                                            <i className="fa-solid fa-arrow-right ml-2"></i>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default AnimatedImageSlider;
