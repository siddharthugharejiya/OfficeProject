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
    //     id: 1,
    //     image: "https://cdn.shopify.com/s/files/1/0905/2012/files/shopiodecor-slider02.jpg?v=1645586328",
    //     subtitle: "online exclusive",
    //     title: "simple way to setup your space",
    //     description: "Best furniture for your house.",
    //     buttonText: "View Collection",
    //     direction: "top",
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
            <div className="absolute top-0 w-full z-50 lg:block hidden">
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
                                            className="w-full h-[50vh] xs:h-[55vh] sm:h-[70vh] md:h-[80vh] lg:h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
                                            style={{ backgroundImage: `url(${slide.image})` }}
                                            initial={initial}
                                            animate={{ x: 0, y: 0, opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1 }}
                                        >
                                            <div className="grid grid-cols-1 sm:grid-cols-2 w-full xs:px-2 sm:px-10 xl:px-22 px-4">
                                                <div className="flex flex-col justify-center items-start sm:items-center h-full">
                                                    <div className="flex flex-col justify-center max-w-[90%] xs:max-w-[85%] sm:w-[90%] w-full">
                                                        {/* Subtitle */}
                                                        <motion.p
                                                            className="text-[rgb(189_156_133)] xs:py-1 sm:py-4 py-2 xs:text-[10px] sm:text-[14px] text-[12px] font-semibold"
                                                            initial={{ y: -30, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            transition={{ delay: 0.5 }}
                                                        >
                                                            {slide.subtitle}
                                                        </motion.p>

                                                        {/* Title */}
                                                        <motion.h1
                                                            className="font-bold uppercase xs:text-lg sm:text-3xl lg:text-5xl text-xl leading-tight xl:pr-30 sm:pr-5 pr-20"
                                                            initial={{ x: -100, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: 0.7 }}
                                                        >
                                                            {slide.title}
                                                        </motion.h1>

                                                        {/* Description */}
                                                        <motion.p
                                                            className="text-[rgb(102_102_102)] xs:text-[10px] sm:text-[14px] text-[12px] font-medium xs:py-1 sm:py-4 py-2"
                                                            initial={{ x: 100, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: 0.9 }}
                                                        >
                                                            {slide.description}
                                                        </motion.p>

                                                        {/* Button */}
                                                        <div>

                                                            <motion.button
                                                                className="bg-[#BF624C] xs:p-1.5 sm:p-3 p-2 xs:text-[10px] sm:text-[14px] text-[12px] text-white font-bold rounded-sm xs:mt-1 sm:mt-2 mt-2"
                                                                initial={{ y: 50, opacity: 0 }}
                                                                animate={{ y: 0, opacity: 1 }}
                                                                transition={{ delay: 1.1 }}
                                                            >
                                                                {slide.buttonText} <i className="fa-solid fa-arrow-right"></i>
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
        </div>
    );
};

export default AnimatedImageSlider;
