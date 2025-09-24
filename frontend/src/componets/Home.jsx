import React, { useState } from 'react'
import Nav from './Nav'
import AnimatedImageSlider from './Imageslide'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useLayoutEffect } from 'react'
import { Product_del, Product_Get } from '../Redux/action'
import Slider from 'react-slick'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import { ProductCardSkeleton, FeaturedProductSkeleton, BlogCardSkeleton, LoadingSpinner } from './SkeletonLoader'

function Home() {
    const dispatch = useDispatch()
    const nav = useNavigate()


    const handleclick = (e) => {
        console.log(e);

        nav(`/Product/${e}`)

    }

    useEffect(() => {
        dispatch(Product_Get())
    }, [dispatch])
    const Product = useSelector(state => state.Product.Product || [])

    // Zoom effect for slider images
    useLayoutEffect(() => {
        const containers = document.querySelectorAll(".slider-image-container");

        const handleMouseMove = (e) => {
            const container = e.currentTarget;
            const img = container.querySelector("img");
            if (!img) return;

            const { left, top, width, height } = container.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;

            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = "scale(2.5)";
            img.style.transition = "transform 0.1s ease-out";
        };

        const handleMouseLeave = (e) => {
            const container = e.currentTarget;
            const img = container.querySelector("img");
            if (!img) return;

            img.style.transform = "scale(1)";
            img.style.transformOrigin = "center center";
            img.style.transition = "transform 0.3s ease-out";
        };

        containers.forEach(container => {
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            containers.forEach(container => {
                container.removeEventListener("mousemove", handleMouseMove);
                container.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [Product]);



    const isLoading = useSelector(state => state.Product.loading || false)
    console.log("Product:", Product);
    const settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Default for larger screens
        slidesToScroll: 1,
        centerMode: true, // Enable center mode for xs screens
        centerPadding: '0px', // No padding to ensure the card fits perfectly
        responsive: [
            {
                breakpoint: 1280, // xl
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: false,
                },
            },
            {
                breakpoint: 1024, // lg
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: false,
                },
            },
            {
                breakpoint: 768, // md
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: false,
                },
            },
            {
                breakpoint: 640, // sm
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true, // Center the single card
                    centerPadding: '0px', // No extra padding to match card width
                },
            },
        ],
    };


    const firstProductsByCategory = Object.values(
        Product.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = product; // सिर्फ पहला product रखो
            }
            return acc;
        }, {})
    );
    console.log(firstProductsByCategory);


    return (
        <div className="overflow-hidden">
            <AnimatedImageSlider />
            <div className="sm:py-15 py-2 border-b-1 border-b-[#716147]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32">
                    <div className='p-4 flex flex-col justify-center items-center text-center' data-aos="fade-up" data-aos-delay="0">
                        {/* image */}
                        <div className='pb-4'>
                            <img src="https://demo74.leotheme.com/prestashop/leo_shopiodecor_demo/themes/leo_shopiodecor/assets/img/modules/appagebuilder/images/decor-icon5.png" alt="" className="w-9 h-9 sm:w-14 sm:h-14" />
                        </div>
                        {/* content */}
                        <div>
                            <h1 className='font-bold uppercase text-sm sm:text-base'>Free Delivery</h1>
                            <p className='text-[#666] text-xs sm:text-sm font-semibold'>Free shipping over $100</p>
                        </div>
                    </div>

                    <div className='p-4 flex flex-col justify-center items-center text-center' data-aos="fade-up" data-aos-delay="100">
                        {/* image */}
                        <div className='pb-4'>
                            <img src="https://demo74.leotheme.com/prestashop/leo_shopiodecor_demo/themes/leo_shopiodecor/assets/img/modules/appagebuilder/images/decor-icon6.png" alt="" className="w-9 h-9 sm:w-14 sm:h-14" />
                        </div>
                        {/* content */}
                        <div>
                            <h1 className='font-bold uppercase text-sm sm:text-base'>Member Discount</h1>
                            <p className='text-[#666] text-xs sm:text-sm font-semibold'>Get $15 off your order</p>
                        </div>
                    </div>

                    <div className='p-4 flex flex-col justify-center items-center text-center' data-aos="fade-up" data-aos-delay="200">
                        {/* image */}
                        <div className='pb-4'>
                            <img src="https://demo74.leotheme.com/prestashop/leo_shopiodecor_demo/themes/leo_shopiodecor/assets/img/modules/appagebuilder/images/decor-icon7.png" alt="" className="w-9 h-9 sm:w-14 sm:h-14" />
                        </div>
                        {/* content */}
                        <div>
                            <h1 className='font-bold uppercase text-sm sm:text-base'>Money Return</h1>
                            <p className='text-[#666] text-xs sm:text-sm font-semibold'>Guarantee under 7 days</p>
                        </div>
                    </div>

                    <div className='p-4 flex flex-col justify-center items-center text-center' data-aos="fade-up" data-aos-delay="300">
                        {/* image */}
                        <div className='pb-4'>
                            <img src="https://demo74.leotheme.com/prestashop/leo_shopiodecor_demo/themes/leo_shopiodecor/assets/img/modules/appagebuilder/images/decor-icon8.png" alt="" className="w-9 h-9 sm:w-14 sm:h-14" />
                        </div>
                        {/* content */}
                        <div>
                            <h1 className='font-bold uppercase text-sm sm:text-base'>Support 24/7</h1>
                            <p className='text-[#666] text-xs sm:text-sm font-semibold'>Support online 24 hours a day</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:py-5 sm:mt-10 mb-3  py-2 mt-1 pb-1">
                <div className='mb-6 px-4' data-aos="fade-up">
                    <div className="flex items-center justify-center space-x-2 font-semibold text-[#BD9C85] text-sm uppercase pb-2">
                        <span>01</span>
                        <span className="h-[1px] w-[20px] bg-[#BD9C85]"></span>
                        <span>Find Your Favorite</span>
                    </div>
                    <h3 className='text-center text-2xl sm:text-3xl md:text-4xl uppercase font-bold'>shop by category</h3>
                </div>
                {/* product */}
                <div className="w-full flex justify-center px-2 sm:px-4 py-6">
                    <div className="w-full max-w-[1400px] product-slider-wrapper">
                        {isLoading ? (
                            <Slider {...settings1}>
                                {[1, 2, 3, 4].map((index) => (
                                    <ProductCardSkeleton key={index} />
                                ))}
                            </Slider>
                        ) : (
                            <Slider {...settings1}>
                                {Product.map((item, index) => {
                                    const image1 = Array.isArray(item.Image) && item.Image.length > 0 ? item.Image[0] : "";
                                    const image2 = Array.isArray(item.Image) && item.Image.length > 1 ? item.Image[1] : image1;

                                    return (
                                        <div key={index} className="flex justify-center px-2"> {/* Spacing between slides */}
                                            <div className="card w-full max-w-[18rem] sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[18rem] xl:max-w-[20rem] flex group flex-col items-center transition-transform duration-300 hover:scale-[1.03] cursor-pointer min-h-[390px] m-1">
                                                {/* Card Image Flip Section */}
                                                <div className="flex items-center justify-center w-full">
                                                    <div className="relative w-full aspect-square max-w-[285px] max-h-[285px] card-flip flex justify-center items-center mx-auto">
                                                        <div className="card-inner w-full h-full">
                                                            <div className="card-front w-full h-full">
                                                                <img
                                                                    src={image1 || '/placeholder.png'}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                {item.tag && (
                                                                    <span className="absolute top-3 left-3 text-xs font-semibold rounded-full z-10">
                                                                        <div className="bg-[#B0D3FF] text-white h-[20px] px-2 flex items-center justify-center rounded-full">
                                                                            {item.tag}
                                                                        </div>
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="card-back w-full h-full">
                                                                <img
                                                                    src={image2 || '/placeholder.png'}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Card Text */}
                                                <div className="card-body p-3 sm:p-4 text-center w-full min-h-[120px] md:min-h-[120px] flex flex-col justify-center">
                                                    <h5 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-[#BD9C85] mb-2 line-clamp-2">
                                                        {item.name}
                                                    </h5>
                                                    <div className="text-gray-600 min-h-[80px] md:min-h-[45px]">
                                                        <p className="text-xs sm:text-sm lg:text-base text-gray-600 line-clamp-2 group-hover:hidden block min-h-[10px]">
                                                            {item.des}
                                                        </p>
                                                        {/* View More - always visible on mobile, hover on desktop */}
                                                        <div
                                                            className="block md:hidden text-xs sm:text-[13px] text-[#BD9C85] font-medium cursor-pointer mt-2"
                                                            onClick={() => handleclick(item._id)}
                                                        >
                                                            View More <i className="fa-solid fa-arrow-right ml-1"></i>
                                                        </div>
                                                        <div
                                                            className="hidden md:group-hover:block text-sm sm:text-base text-[#BD9C85] font-medium cursor-pointer "
                                                            onClick={() => handleclick(item._id)}
                                                        >
                                                            View More <i className="fa-solid fa-arrow-right ml-1"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Slider>
                        )}
                    </div>
                </div>



            </div>

            <div className='sm:py-5 py-1'>
                <div className='pt-4 px-4' data-aos="fade-up">
                    <div className="flex items-center justify-center space-x-2 font-semibold text-[#BD9C85] text-sm uppercase pb-2">
                        <span>02</span>
                        <span className="h-[1px] w-[20px] bg-[#BD9C85]"></span>
                        <span>BROWSE OUR ITEMS</span>
                    </div>
                    <p className='text-center text-2xl sm:text-3xl md:text-4xl uppercase font-bold'>Top Picks for You</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10">
                    {isLoading ? (
                        <>
                            {[1, 2, 3, 4].map((index) => (
                                <FeaturedProductSkeleton key={index} />
                            ))}
                        </>
                    ) : (
                        <>
                            <div
                                className="hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                                data-aos="fade-up"
                                data-aos-delay="0"
                            >
                                {/* Image Section */}
                                <div className="relative overflow-hidden cursor-zoom-in">
                                    <img
                                        src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/207-home_default_square/mountain-fox-cushion.jpg"
                                        className="h-[300px] w-full object-cover"
                                        alt="product"
                                    />

                                    {/* Sale Badge */}
                                    <div className="absolute top-2 left-2 bg-[#B0D3FF] text-white text-xs font-semibold px-2 py-0.5 rounded">
                                        Sale
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-3 text-center">
                                    <div className="mb-1">
                                        <span className="text-xs text-gray-600 uppercase tracking-wide">Furniture</span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        Ruud-Jan Kokke Slat Chair
                                    </h3>

                                    <p className="text-gray-600 text-sm">
                                        The Netherlands, 1986 - Premium quality furniture with timeless design.
                                    </p>
                                </div>
                            </div>


                            <div
                                className="hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                                data-aos="fade-up"
                                data-aos-delay="0"
                            >
                                {/* Image Section */}
                                <div className="relative overflow-hidden cursor-zoom-in">
                                    <img
                                        src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/207-home_default_square/mountain-fox-cushion.jpg"
                                        className="h-[300px] w-full object-cover"
                                        alt="product"
                                    />

                                    {/* Sale Badge */}
                                    <div className="absolute top-2 left-2 bg-[#B0D3FF] text-white text-xs font-semibold px-2 py-0.5 rounded">
                                        Sale
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-3 text-center">
                                    <div className="mb-1">
                                        <span className="text-xs text-gray-600 uppercase tracking-wide">Furniture</span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        Ruud-Jan Kokke Slat Chair
                                    </h3>

                                    <p className="text-gray-600 text-sm">
                                        The Netherlands, 1986 - Premium quality furniture with timeless design.
                                    </p>
                                </div>
                            </div>





                            <div
                                className="hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                                data-aos="fade-up"
                                data-aos-delay="0"
                            >
                                {/* Image Section */}
                                <div className="relative overflow-hidden cursor-zoom-in">
                                    <img
                                        src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/207-home_default_square/mountain-fox-cushion.jpg"
                                        className="h-[300px] w-full object-cover"
                                        alt="product"
                                    />

                                    {/* Sale Badge */}
                                    <div className="absolute top-2 left-2 bg-[#B0D3FF] text-white text-xs font-semibold px-2 py-0.5 rounded">
                                        Sale
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-3 text-center">
                                    <div className="mb-1">
                                        <span className="text-xs text-gray-600 uppercase tracking-wide">Furniture</span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        Ruud-Jan Kokke Slat Chair
                                    </h3>

                                    <p className="text-gray-600 text-sm">
                                        The Netherlands, 1986 - Premium quality furniture with timeless design.
                                    </p>
                                </div>
                            </div>






                            <div
                                className="hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                                data-aos="fade-up"
                                data-aos-delay="0"
                            >
                                {/* Image Section */}
                                <div className="relative overflow-hidden cursor-zoom-in">
                                    <img
                                        src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/207-home_default_square/mountain-fox-cushion.jpg"
                                        className="h-[300px] w-full object-cover"
                                        alt="product"
                                    />

                                    {/* Sale Badge */}
                                    <div className="absolute top-2 left-2 bg-[#B0D3FF] text-white text-xs font-semibold px-2 py-0.5 rounded">
                                        Sale
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-3 text-center">
                                    <div className="mb-1">
                                        <span className="text-xs text-gray-600 uppercase tracking-wide">Furniture</span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        Ruud-Jan Kokke Slat Chair
                                    </h3>

                                    <p className="text-gray-600 text-sm">
                                        The Netherlands, 1986 - Premium quality furniture with timeless design.
                                    </p>
                                </div>
                            </div>



                        </>
                    )}
                </div>

            </div>

            {/* about 03 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 py-10 ">

                {/* Left Section */}
                <div className="space-y-6 lg:space-y-10" data-aos="fade-up" data-aos-delay="100">
                    {/* Heading Section */}
                    <div>
                        <div className="flex items-center space-x-3 text-[#BD9C85] font-semibold text-sm uppercase mb-3">
                            <span>03</span>
                            <span className="h-[1px] w-[30px] bg-[#BD9C85]"></span>
                            <span>About Us</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase mb-4 lg:mb-6 text-black">
                            Fresh, handmade products
                        </h2>
                        <p className="text-[#666] text-sm sm:text-base md:text-lg leading-relaxed">
                            We believe that every product is both a vessel for contemporary culture and an heirloom for future generations. Once you find your perfect piece, we'll get it to you, no hassle.
                        </p>
                    </div>

                    {/* Bottom Chair Image */}
                    <div className="bg-[#f8f2ee] rounded-lg p-4">
                        <img
                            src="https://cdn.shopify.com/s/files/1/0905/2012/files/s-dbanner-5.png?v=1645586327"
                            alt="Chair"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col justify-start space-y-4 lg:space-y-6" data-aos="fade-up" data-aos-delay="200">
                    {/* Top Chair Image */}
                    <div className="bg-[#f8f2ee] rounded-lg p-4">
                        <img
                            src="https://cdn.shopify.com/s/files/1/0905/2012/files/s-dbanner-4_a6224ad9-a4c7-4198-93f1-c63532deb906.jpg?v=1645586327"
                            alt="Chair 2"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Features */}
                    {[
                        {
                            title: "Imaginative Design",
                            desc: "We collaborate with designers whose bodies of work reflect their unique identities.",
                            icon: "fa-headphones",
                        },
                        {
                            title: "Obsessive Quality",
                            desc: "Our dedication to quality influences every aspect of our brand.",
                            icon: "fa-chair",
                        },
                        {
                            title: "Effortless Experience",
                            desc: "Our user-journey is highly streamlined, and we offer quick and efficient delivery.",
                            icon: "fa-globe",
                        },
                    ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                            <div className="bg-[#F4EBE4] min-w-[40px] h-[40px] sm:min-w-[46px] sm:h-[46px] rounded-full flex items-center justify-center flex-shrink-0">
                                <i className={`fa-solid ${item.icon} text-[#BD9C85] text-sm sm:text-base`}></i>
                            </div>
                            <div>
                                <h3 className="text-sm sm:text-base lg:text-lg font-bold uppercase text-black">
                                    {item.title}
                                </h3>
                                <p className="text-[#666] text-xs sm:text-sm lg:text-base">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* about 03 */}


            {/* Stay in the loop */}
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 py-12">
                <div className="border rounded-md px-4 sm:px-6 lg:px-10 py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
                    {/* Left Text Content */}
                    <div className="space-y-2" data-aos="fade-up" data-aos-delay="100">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase text-center lg:text-left">
                            Stay in the loop
                        </h2>
                        <p className="text-[#666] text-sm sm:text-base text-center lg:text-left">
                            Get weekly inspiration in your inbox.
                        </p>
                    </div>

                    {/* Right Form */}
                    <form className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3 sm:gap-4 w-full" data-aos="fade-up" data-aos-delay="200">
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-[#f5f5f5] text-[#333] placeholder:text-[#666] outline-none text-sm sm:text-base"
                        />
                        <button
                            type="submit"
                            className="bg-[#BD624C] hover:bg-[#a7503b] text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-md flex items-center gap-2 transition text-sm sm:text-base"
                        >
                            Subscribe <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </form>
                </div>
            </div>

            {/* Stay in the loop */}

            <div className='mb-4 py-10'>
                <div className='pt-4 px-4' data-aos="fade-up">
                    <div className="flex items-center justify-center space-x-2 font-semibold text-[#BD9C85] text-sm uppercase pb-2">
                        <span>04</span>
                        <span className="h-[1px] w-[20px] bg-[#BD9C85]"></span>
                        <span>recent blog</span>
                    </div>
                    <p className='text-center text-2xl sm:text-3xl md:text-4xl uppercase font-bold'>Daily articles</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20'>
                    {isLoading ? (
                        <>
                            {[1, 2, 3].map((index) => (
                                <BlogCardSkeleton key={index} />
                            ))}
                        </>
                    ) : (
                        <>

                            <div className='card h-auto w-full' data-aos="fade-up" data-aos-delay="0">
                                <div>
                                    <img src="https://demo74.leotheme.com/prestashop/leo_shopiodecor_demo/img/leoblog/b/1/23/576_350/b-b-blog-7.jpg" className='h-[200px] sm:h-[247px] w-full object-cover' alt="" />
                                </div>
                                <div className='card-body p-4'>
                                    <div className="title flex flex-wrap items-center text-xs sm:text-sm">
                                        <span className='text-[#999999]'>Sohoconcept.com</span>
                                        <div className='h-[4px] w-[4px] sm:h-[5px] sm:w-[5px] rounded-full bg-[#CB8161] mx-2'></div>
                                        <span>Living Room</span>
                                        <div className='h-[4px] w-[4px] sm:h-[5px] sm:w-[5px] rounded-full bg-[#CB8161] mx-2'></div>
                                        <div className='text-[#999999]'><i className="fa-solid fa-comments"></i> Comment: 0</div>
                                    </div>
                                    <p className='text-lg sm:text-xl font-semibold py-2 sm:py-3'>Grandmillenial Style & Modern Furniture</p>
                                    <p className='text-[#444343] text-sm sm:text-base'>Grandmilenial style could be one of the reasons that velvet is making such a comeback. This new popular trend is a bold one, mixing woods and modern..</p>
                                    <button className="bg-[#BF624C] px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-white font-bold rounded-sm mt-2 sm:mt-3">
                                        Read more <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>

                            <div className='card h-auto w-full' data-aos="fade-up" data-aos-delay="100">
                                <div>
                                    <img src="https://demo74.leotheme.com/prestashop/leo_shopiodecor_demo/img/leoblog/b/1/23/576_350/b-b-blog-7.jpg" className='h-[247px] w-full object-cover' alt="" />
                                </div>
                                <div className='card-body p-4'>
                                    <div className="title flex flex-wrap items-center text-sm">
                                        <span className='text-[#999999]'>Sohoconcept.com</span>
                                        <div className='h-[5px] w-[5px] rounded-full bg-[#CB8161] mx-2'></div>
                                        <span>Living Room</span>
                                        <div className='h-[5px] w-[5px] rounded-full bg-[#CB8161] mx-2'></div>
                                        <div className='text-[#999999]'><i className="fa-solid fa-comments"></i> Comment: 0</div>
                                    </div>
                                    <p className='text-xl font-semibold py-3'>Grandmillenial Style & Modern Furniture</p>
                                    <p className='text-[#444343]'>Grandmilenial style could be one of the reasons that velvet is making such a comeback. This new popular trend is a bold one, mixing woods and modern..</p>
                                    <button className="bg-[#BF624C] xs:p-1.5 sm:p-3 p-2 xs:text-[10px] sm:text-[14px] text-[12px] text-white font-bold rounded-sm xs:mt-1 sm:mt-2 mt-2">
                                        Read more <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>

                            <div className='card h-auto w-full' data-aos="fade-up" data-aos-delay="200">
                                <div>
                                    <img src="https://demo74.leotheme.com/prestashop/leo_shopiodecor_demo/img/leoblog/b/1/23/576_350/b-b-blog-7.jpg" className='h-[247px] w-full object-cover' alt="" />
                                </div>
                                <div className='card-body p-4'>
                                    <div className="title flex flex-wrap items-center text-sm">
                                        <span className='text-[#999999]'>Sohoconcept.com</span>
                                        <div className='h-[5px] w-[5px] rounded-full bg-[#CB8161] mx-2'></div>
                                        <span>Living Room</span>
                                        <div className='h-[5px] w-[5px] rounded-full bg-[#CB8161] mx-2'></div>
                                        <div className='text-[#999999]'><i className="fa-solid fa-comments"></i> Comment: 0</div>
                                    </div>
                                    <p className='text-xl font-semibold py-3'>Grandmillenial Style & Modern Furniture</p>
                                    <p className='text-[#444343]'>Grandmilenial style could be one of the reasons that velvet is making such a comeback. This new popular trend is a bold one, mixing woods and modern..</p>
                                    <button className="bg-[#BF624C] xs:p-1.5 sm:p-3 p-2 xs:text-[10px] sm:text-[14px] text-[12px] text-white font-bold rounded-sm xs:mt-1 sm:mt-2 mt-2">
                                        Read more <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </div>
            <Footer />
        </div>
    )

}


export default Home
