import React, { useState } from 'react'
import Nav from './Nav'
import AnimatedImageSlider from './Imageslide'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Product_Get } from '../Redux/action'

function Home() {
    const dispatch = useDispatch()

    const handleclick = (e) => {
        console.log(e);

    }


    useEffect(() => {
        dispatch(Product_Get())
    }, [dispatch])


    const Product = useSelector(state => state.Product.Product)
    // console.log(Product);

    return (
        <div>

            <div className='block lg:hidden'>
                <Nav />
            </div>
            {/* <div className='h-screen'>
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: "url('./image/shopiodecor-slider02.jpg')",
                        backgroundPosition: "top",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className='grid grid-cols-2 justify-center'>
                        <div className='flex flex-col justify-center  items-center'>
                            <div>
                                <p className='text-[rgb(189_156_133)] py-4 animate__animated ' >online exclusive</p>
                                <h1 className='font-bold uppercase lg:text-5xl'>
                                    simple way<br />
                                    to setup <br />
                                    your space <br />

                                </h1>
                                <p className='text-[rgb(102_102_102)] text-[13px] font-bold py-5'>Best furniture for your house.</p>
                                <button className='w-[153px] h-[43px] bg-[#BF624C] text-[12px] text-white font-bold rounded-sm'>View Collection <i className="fa-solid fa-arrow-right "></i></button>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div> */}
            <AnimatedImageSlider />
            <div className="py-15 border-b-1 border-b-[#716147] overflow-hidden">
                <div className="
                grid 
                lg:grid-cols-4
                md:grid-cols-3
                sm:grid-cols-2
                grid-cols-1
                sm:px-35
                px-0
                ">
                    <div className='p-2 flex flex-col justify-center items-center text-center md:m-0 m-5' data-aos="fade-left">
                        {/* image */}
                        <div className='pb-4'>
                            <img src="https://demo74.leotheme.com/prestashop/leo_shopiodecor_demo/themes/leo_shopiodecor/assets/img/modules/appagebuilder/images/decor-icon5.png" alt="" />
                        </div>
                        {/* content */}
                        <div>
                            <h1 className='font-bold uppercase'>Free Delivery</h1>
                            <p className='text-[#666] text-sm font-semibold'>Free shipping over $100</p>
                        </div>
                    </div>

                    <div className='p-2 flex flex-col justify-center items-center text-center md:m-0 m-5' data-aos="fade-up" data-aos-delay="100">
                        {/* image */}
                        <div className='pb-4'>
                            <img src="https://demo74.leotheme.com/prestashop/leo_shopiodecor_demo/themes/leo_shopiodecor/assets/img/modules/appagebuilder/images/decor-icon6.png" alt="" />
                        </div>
                        {/* content */}
                        <div>
                            <h1 className='font-bold uppercase'>Member Discount</h1>
                            <p className='text-[#666] text-sm font-semibold'>Get $15 off your order</p>
                        </div>
                    </div>

                    <div className='p-2 flex flex-col justify-center items-center text-center md:m-0 m-5' data-aos="fade-up" data-aos-delay="100">
                        {/* image */}
                        <div className='pb-4'>
                            <img src="https://demo74.leotheme.com/prestashop/leo_shopiodecor_demo/themes/leo_shopiodecor/assets/img/modules/appagebuilder/images/decor-icon7.png" alt="" />
                        </div>
                        {/* content */}
                        <div>
                            <h1 className='font-bold uppercase'>Money Return</h1>
                            <p className='text-[#666] text-sm font-semibold'>Guarantee under 7 days</p>
                        </div>
                    </div>

                    <div className='p-2 flex flex-col justify-center items-center text-center md:m-0 m-5' data-aos="fade-right" >
                        {/* image */}
                        <div className='pb-4'>
                            <img src="https://demo74.leotheme.com/prestashop/leo_shopiodecor_demo/themes/leo_shopiodecor/assets/img/modules/appagebuilder/images/decor-icon8.png" alt="" />
                        </div>
                        {/* content */}
                        <div>
                            <h1 className='font-bold uppercase'>Support 24/7</h1>
                            <p className='text-[#666] text-sm font-semibold'>Support online 24 hours a day</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="py-5 mt-10 pb-10 overflow-hidden">
                <div className='mb-4' data-aos="fade-up" >
                    <div className="flex items-center justify-center space-x-2 font-semibold text-[#BD9C85] text-[14px] uppercase pb-1">
                        <span>01</span>
                        <span className=" h-[1px] w-[20px] bg-[#BD9C85]"></span>
                        <span>Find Your Favorite</span>
                    </div>
                    <h3 className='text-center sm:text-4xl text-xl uppercase font-bold '>shop by category</h3>
                </div>
                {/* product */}
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 sm:px-30 px-0'>
                        {
                            Product.map((item) => (
                                <div className="card  rounded-md  overflow-hidden transition-all duration-300  group" data-aos="fade-left">
                                    {/* Image */}
                                    <div className="flex justify-center items-center ">
                                        <img
                                            // src="https://cdn.shopify.com/s/files/1/0905/2012/files/s-dcat-6.png?v=1645586327"
                                            src={item.Image}
                                            alt="Chairs"
                                            className="max-w-[200px] transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="relative card-body text-center px-4  h-[68px]">
                                        <h1 className="text-lg font-semibold text-[#2c2c2c]">{item.title}</h1>

                                        {/* Product Text - Visible initially, hides on hover */}
                                        <p className="text-md text-[#444] mt-1 transition-opacity duration-300 group-hover:opacity-0 absolute left-1/2 -translate-x-1/2">
                                            <span className="text-[#716147] font-medium">8</span> Product
                                        </p>

                                        {/* Shop Now Button - hidden initially, appears on hover */}
                                        <div className="flex justify-center items-center mt-2">
                                            <button
                                                className="text-sm text-[#716147] hidden group-hover:inline-block animate__animated animate__fadeInUp"
                                                onClick={() => handleclick(1)}>
                                                Shop Now <i className="fa-solid fa-arrow-right ml-1"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }



                    </div>
                </div>

            </div>

            <div className='overflow-hidden'>
                <div className='pt-4' data-aos="fade-up">

                    <div className="flex items-center justify-center space-x-2 font-semibold text-[#BD9C85] text-[14px] uppercase pb-1">
                        <span>02</span>
                        <span className=" h-[1px] w-[20px] bg-[#BD9C85]"></span>
                        <span>BROWSE OUR ITEMS</span>
                    </div>

                    <p className='text-center sm:text-4xl text-2xl uppercase font-bold '>Top Picks for You</p>
                </div>
                <div className="grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-0 lg:px-20 py-10 gap-5 ">
                    <div
                        className="card shadow-md w-full max-w-[315px] mx-auto h-auto rounded-2xl group bg-white"
                        data-aos="fade-left"
                    >
                        {/* Image Section */}
                        <div className="flex justify-center relative rounded-t-2xl overflow-hidden">
                            <img
                                src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/207-home_default_square/mountain-fox-cushion.jpg"
                                className="h-[383px] w-full object-cover rounded-tl-2xl rounded-tr-2xl"
                                alt="product"
                            />
                            <span className="absolute top-3 left-3 bg-[#B0D3FF] text-white text-xs px-2 py-1 rounded-lg">
                                New
                            </span>
                            {/* Hover Buttons */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition"
                                    data-aos="fade-up" data-aos-delay="0">
                                    <i className="fa-solid fa-bag-shopping"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="100" >
                                    <i className="fa-solid fa-eye"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="200">
                                    <i className="fa-solid fa-heart"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="300">
                                    <i className="fa-solid fa-up-right-from-square"></i>
                                </button>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="card-body p-4 text-center">
                            <h1 className="text-[#BF624C] uppercase text-sm">Chairs</h1>
                            <p className="text-base mt-1 mb-2">
                                Ruud-Jan Kokke Slat Chair, the Netherlands, 1986
                            </p>
                            <div className="text-[#FFD700] mb-2">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span className="text-[#999] text-sm">$18.90</span>
                        </div>
                    </div>

                    <div
                        className="card shadow-md w-full max-w-[315px] mx-auto h-auto rounded-2xl group bg-white"
                        data-aos="fade-left"
                    >
                        {/* Image Section */}
                        <div className="flex justify-center relative rounded-t-2xl overflow-hidden">
                            <img
                                src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/207-home_default_square/mountain-fox-cushion.jpg"
                                className="h-[383px] w-full object-cover rounded-tl-2xl rounded-tr-2xl"
                                alt="product"
                            />
                            <span className="absolute top-3 left-3 bg-[#B0D3FF] text-white text-xs px-2 py-1 rounded-lg">
                                New
                            </span>
                            {/* Hover Buttons */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition"
                                    data-aos="fade-up" data-aos-delay="0">
                                    <i className="fa-solid fa-bag-shopping"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="100" >
                                    <i className="fa-solid fa-eye"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="200">
                                    <i className="fa-solid fa-heart"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="300">
                                    <i className="fa-solid fa-up-right-from-square"></i>
                                </button>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="card-body p-4 text-center">
                            <h1 className="text-[#BF624C] uppercase text-sm">Chairs</h1>
                            <p className="text-base mt-1 mb-2">
                                Ruud-Jan Kokke Slat Chair, the Netherlands, 1986
                            </p>
                            <div className="text-[#FFD700] mb-2">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span className="text-[#999] text-sm">$18.90</span>
                        </div>
                    </div>



                    <div
                        className="card shadow-md w-full max-w-[315px] mx-auto h-auto rounded-2xl group bg-white"
                        data-aos="fade-left"
                    >
                        {/* Image Section */}
                        <div className="flex justify-center relative rounded-t-2xl overflow-hidden">
                            <img
                                src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/207-home_default_square/mountain-fox-cushion.jpg"
                                className="h-[383px] w-full object-cover rounded-tl-2xl rounded-tr-2xl"
                                alt="product"
                            />
                            <span className="absolute top-3 left-3 bg-[#B0D3FF] text-white text-xs px-2 py-1 rounded-lg">
                                New
                            </span>
                            {/* Hover Buttons */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition"
                                    data-aos="fade-up" data-aos-delay="0">
                                    <i className="fa-solid fa-bag-shopping"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="100" >
                                    <i className="fa-solid fa-eye"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="200">
                                    <i className="fa-solid fa-heart"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="300">
                                    <i className="fa-solid fa-up-right-from-square"></i>
                                </button>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="card-body p-4 text-center">
                            <h1 className="text-[#BF624C] uppercase text-sm">Chairs</h1>
                            <p className="text-base mt-1 mb-2">
                                Ruud-Jan Kokke Slat Chair, the Netherlands, 1986
                            </p>
                            <div className="text-[#FFD700] mb-2">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span className="text-[#999] text-sm">$18.90</span>
                        </div>
                    </div>





                    <div
                        className="card shadow-md w-full max-w-[315px] mx-auto h-auto rounded-2xl group bg-white"
                        data-aos="fade-left"
                    >
                        {/* Image Section */}
                        <div className="flex justify-center relative rounded-t-2xl overflow-hidden">
                            <img
                                src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/207-home_default_square/mountain-fox-cushion.jpg"
                                className="h-[383px] w-full object-cover rounded-tl-2xl rounded-tr-2xl"
                                alt="product"
                            />
                            <span className="absolute top-3 left-3 bg-[#B0D3FF] text-white text-xs px-2 py-1 rounded-lg">
                                New
                            </span>
                            {/* Hover Buttons */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition"
                                    data-aos="fade-up" data-aos-delay="0">
                                    <i className="fa-solid fa-bag-shopping"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="100" >
                                    <i className="fa-solid fa-eye"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="200">
                                    <i className="fa-solid fa-heart"></i>
                                </button>
                                <button className="p-2 px-3 rounded-sm hover:bg-black hover:text-white bg-white transition" data-aos="fade-up" data-aos-delay="300">
                                    <i className="fa-solid fa-up-right-from-square"></i>
                                </button>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="card-body p-4 text-center">
                            <h1 className="text-[#BF624C] uppercase text-sm">Chairs</h1>
                            <p className="text-base mt-1 mb-2">
                                Ruud-Jan Kokke Slat Chair, the Netherlands, 1986
                            </p>
                            <div className="text-[#FFD700] mb-2">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span className="text-[#999] text-sm">$18.90</span>
                        </div>
                    </div>


                </div>

            </div>

            {/* about 03 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 px-4 md:px-16 xl:px-28 py-10 bg-white">

                {/* Left Section */}
                <div className="space-y-10" data-aos="fade-left" data-aos-delay="100">
                    {/* Heading Section */}
                    <div>
                        <div className="flex items-center space-x-3 text-[#BD9C85] font-semibold text-sm uppercase mb-3">
                            <span>03</span>
                            <span className="h-[1px] w-[30px] bg-[#BD9C85]"></span>
                            <span>About Us</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-semibold  uppercase mb-6 text-black">
                            Fresh, handmade products
                        </h2>
                        <p className="text-[#666] text-base md:text-lg leading-relaxed max-w-xl">
                            We believe that every product is both a vessel for contemporary culture and an heirloom for future generations. Once you find your perfect piece, we’ll get it to you, no hassle.
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
                <div className="flex flex-col justify-start space-y-6" data-aos="fade-right" data-aos-delay="200">
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
                        <div key={index} className="flex items-start space-x-4">
                            <div className="bg-[#F4EBE4] min-w-[46px] h-[46px] rounded-full flex items-center justify-center">
                                <i className={`fa-solid ${item.icon} text-[#BD9C85]`}></i>
                            </div>
                            <div>
                                <h3 className="text-[16px] sm:text-lg font-bold uppercase text-black">
                                    {item.title}
                                </h3>
                                <p className="text-[#666] text-sm sm:text-base w-[90%]">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* about 03 */}


            {/* Stay in the loop */}
            <div className="w-full px-4 sm:px-8 md:px-16 lg:px-28 py-12">
                <div className="border rounded-md px-6 sm:px-10 py-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
                    {/* Left Text Content */}
                    <div className="space-y-2" data-aos="fade-left" data-aos-delay="100">
                        <h2 className="text-2xl sm:text-3xl font-bold uppercase text-center lg:text-left">
                            Stay in the loop
                        </h2>
                        <p className="text-[#666] text-center lg:text-left">
                            Get weekly inspiration in your inbox.
                        </p>
                    </div>

                    {/* Right Form */}
                    <form className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 w-full" data-aos="fade-right" data-aos-delay="200">
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            className="w-full sm:w-auto px-4 py-3 rounded-md bg-[#f5f5f5] text-[#333] placeholder:text-[#666] outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-[#BD624C] hover:bg-[#a7503b] text-white font-semibold px-6 py-3 rounded-md flex items-center gap-2 transition"
                        >
                            Subscribe <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </form>
                </div>
            </div>

            {/* Stay in the loop */}

            <div className='mb-4'>
                <div className='pt-4' data-aos="fade-up" >

                    <div className="flex items-center justify-center space-x-2 font-semibold text-[#BD9C85] text-[14px] uppercase pb-1">
                        <span>04</span>
                        <span className=" h-[1px] w-[20px] bg-[#BD9C85]"></span>
                        <span>recent blog</span>
                    </div>

                    <p className='text-center text-4xl uppercase font-bold '>Daily articles</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 justify-items-center'>

                    <div className='card   h-auto w-full max-w-[410px] ' data-aos="fade-left"  >
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

                    <div className='card   h-auto w-full max-w-[410px]' data-aos="fade-up" data-aos-delay="100">
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

                    <div className='card   h-auto w-full max-w-[410px]' data-aos="fade-right" >
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

                </div>

            </div>
            <Footer />
        </div>
    )

}


export default Home
