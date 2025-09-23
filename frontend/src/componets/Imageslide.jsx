import React, { useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from "./Nav";

const slides = [
    {
        id: 1,
        image: "https://cdn.shopify.com/s/files/1/0905/2012/files/shopiodecor-slider02.jpg?v=1645586328",
        subtitle: "online exclusive",
        title: "simple way to setup your space",
        description: "Best furniture for your house.",
        buttonText: "View Collection",
        direction: "top",
    },
    // {
    //     id: 2,
    //     image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2016&q=80",
    //     subtitle: "new arrivals",
    //     title: "modern furniture collection",
    //     description: "Transform your living space with our premium collection.",
    //     buttonText: "Shop Now",
    //     direction: "right",
    // },
    // {
    //     id: 3,
    //     image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    //     subtitle: "limited time",
    //     title: "luxury home decor",
    //     description: "Elevate your home with our exclusive luxury pieces.",
    //     buttonText: "Explore",
    //     direction: "left",
    // },
];

const getInitialPosition = (direction) => {
    switch (direction) {
        case "left": return { x: "-100%", opacity: 0 };
        case "right": return { x: "100%", opacity: 0 };
        case "top": return { y: "-100%", opacity: 0 };
        case "bottom": return { y: "100%", opacity: 0 };
        default: return { opacity: 0 };
    }
};

const AnimatedImageSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        pauseOnHover: true,
        beforeChange: (_, next) => setActiveSlide(next),
    };

    return (
        <div className="w-full relative overflow-hidden">
            {/* Navigation */}
            <div className="absolute top-0 w-full z-50">
                <Nav />
            </div>

            {/* Slider */}
            <Slider {...settings}>
                {slides.map((slide, index) => {
                    const isActive = index === activeSlide;
                    const initial = getInitialPosition(slide.direction);

                    return (
                        <div key={slide.id} className="relative">
                            <div>
                                <AnimatePresence mode="wait">
                                    {isActive && (
                                        <motion.div
                                            key={slide.id}
                                            className="w-full h-[48vh] xs:h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-screen 2xl:h-screen flex items-center justify-center relative"
                                            initial={initial}
                                            animate={{ x: 0, y: 0, opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1 }}
                                        >
                                            {/* Background Image with responsive classes */}
                                            <div
                                                className="absolute inset-0 bg-contain xs:bg-contain sm:bg-cover md:bg-cover lg:bg-cover xl:bg-cover 2xl:bg-cover bg-center bg-no-repeat"
                                                style={{ backgroundImage: `url(${slide.image})` }}
                                            ></div>

                                            {/* Overlay for better text readability */}
                                            {/* <div className="absolute inset-0 bg-black/40 xs:bg-black/35 sm:bg-black/25 md:bg-black/20 lg:bg-black/15 xl:bg-black/10 2xl:bg-black/5"></div> */}

                                            {/* Content */}
                                            <div className="relative z-10 w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-center h-full">
                                                    {/* Text Content */}
                                                    <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                                                        <div className="max-w-2xl">
                                                            {/* Subtitle */}
                                                            <motion.p
                                                                className="text-[#b86c59] text-xs xs:text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider mb-2 sm:mb-4"
                                                                initial={{ y: -30, opacity: 0 }}
                                                                animate={{ y: 0, opacity: 1 }}
                                                                transition={{ delay: 0.5 }}
                                                            >
                                                                {slide.subtitle}
                                                            </motion.p>

                                                            {/* Title */}
                                                            <motion.h1
                                                                className="font-bold text-white uppercase text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-3 sm:mb-6"
                                                                initial={{ x: -100, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                transition={{ delay: 0.7 }}
                                                            >
                                                                {slide.title}
                                                            </motion.h1>

                                                            {/* Description */}
                                                            <motion.p
                                                                className="text-gray-200 text-sm xs:text-base sm:text-lg md:text-xl font-medium mb-4 sm:mb-8 leading-relaxed"
                                                                initial={{ x: 100, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                transition={{ delay: 0.9 }}
                                                            >
                                                                {slide.description}
                                                            </motion.p>

                                                            {/* Button */}
                                                            <motion.button
                                                                className="bg-gradient-to-r from-[#b86c59] to-[#d4a574] hover:from-[#a55a4a] hover:to-[#c19a6b] text-white font-bold px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-sm md:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                                                initial={{ y: 50, opacity: 0 }}
                                                                animate={{ y: 0, opacity: 1 }}
                                                                transition={{ delay: 1.1 }}
                                                            >
                                                                {slide.buttonText}
                                                                <i className="fa-solid fa-arrow-right ml-2"></i>
                                                            </motion.button>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </Slider>

            {/* Custom Dots Styling */}
            <style jsx>{`
                .slick-dots {
                    bottom: 20px !important;
                    z-index: 20;
                }
                .slick-dots li {
                    margin: 0 8px !important;
                }
                .slick-dots li button:before {
                    font-size: 12px !important;
                    color: white !important;
                    opacity: 0.5 !important;
                }
                .slick-dots li.slick-active button:before {
                    color: #b86c59 !important;
                    opacity: 1 !important;
                }
                .slick-dots li button {
                    width: 12px !important;
                    height: 12px !important;
                    border-radius: 50% !important;
                    background: rgba(255, 255, 255, 0.3) !important;
                }
                .slick-dots li.slick-active button {
                    background: #b86c59 !important;
                }
            `}</style>
        </div>
    );
};

export default AnimatedImageSlider;
