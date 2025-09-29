import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Nav from './Nav';
import Footer1 from './Footer1';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Product_Action, SingleProduct_Action } from '../Redux/action';
import Navbar_1 from './Navbar_1';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SinglePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.SinglePageProduct?.Product);
  const product = products?.data || null;
  const [selectedImage, setSelectedImage] = useState(null);

  const nav = useNavigate()
  useEffect(() => {
    if (id) {
      dispatch(Product_Action(id));
    }
  }, [id, dispatch]);

  const releted = useSelector(state => state.Product_getting?.Product?.data) || [];


  useEffect(() => {
    if (id) {
      dispatch(SingleProduct_Action(id));
    }
  }, [id, dispatch]);
  const handleSinglePageClick = (productId) => {
    nav(`/SinglePage/${productId}`);
  }

  useEffect(() => {
    if (product?.Image?.[0]) {
      setSelectedImage(product.Image[0]);
    }
  }, [product]);

  useLayoutEffect(() => {
    const container = document.querySelector(".image-container");
    const img = container?.querySelector("img");

    if (img && container) {
      const handleMouseMove = (e) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = "scale(2.5)";
      };

      const handleMouseLeave = () => {
        img.style.transform = "scale(1)";
        img.style.transformOrigin = "center center";
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [product, id, selectedImage]);

  if (!product) return <div className="text-center p-10 text-xl font-medium">Loading...</div>;

  return (
    <div className="bg-gray-50">
      <Navbar_1 />
      <div className='bg-[#F6F4F2] text-center py-10 text-[#514633] font-semibold text-md'><Link to="/"> Home </Link> / Storage / {product.category}</div>


      <section className="px-4 md:px-10 lg:px-20 py-12 min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image Section */}
          <div className="">
            <div className="overflow-hidden  group relative image-container border border-gray-200">
              <img
                src={selectedImage || 'https://via.placeholder.com/400'}
                alt={product.name}
                className="w-full h-[560px] object-cover transition-transform duration-300 ease-in-out"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="mt-5 flex gap-3 flex-wrap">
              {Array.isArray(product.Image) &&
                product.Image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`preview-${index}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover rounded-lg border cursor-pointer
                      ${selectedImage === img
                        ? "ring-2 ring-indigo-500"
                        : "hover:ring-2 ring-offset-2 ring-indigo-300"}`}
                  />
                ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 sm:p-6 flex flex-col ">
            <div>
              <div className='border-b border-gray-300 pb-4 mb-6'>
                <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 wrap-anywhere">{product.des}</p>

              {/* Security, Delivery, Return */}
              <div className="space-y-5">
                <div className='flex items-center'>
                  <img src="../image/security.svg" alt="" className='h-[30px]' />
                  <div className='ml-3'>
                    <p className='font-medium text-sm text-gray-700'>Security policy</p>
                    <p className='text-xs text-gray-500'>(edit with the Customer Reassurance module)</p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <img src="../image/carrier.svg" alt="" className='h-[30px]' />
                  <div className='ml-3'>
                    <p className='font-medium text-sm text-gray-700'>Delivery policy</p>
                    <p className='text-xs text-gray-500'>(edit with the Customer Reassurance module)</p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <img src="../image/return.svg" alt="" className='h-[30px]' />
                  <div className='ml-3'>
                    <p className='font-medium text-sm text-gray-700'>Return policy</p>
                    <p className='text-xs text-gray-500'>(edit with the Customer Reassurance module)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Icons */}
            <div className='mt-8 flex items-center gap-3 text-gray-600'>
              <span className='text-sm font-medium'>Share:</span>
              <a href="#" className="hover:text-blue-600">
                <i className="fa-brands fa-facebook text-lg"></i>
              </a>
              <a href="#" className="hover:text-sky-500">
                <i className="fa-brands fa-twitter text-lg"></i>
              </a>
              <a href="#" className="hover:text-red-600">
                <i className="fa-brands fa-pinterest text-lg"></i>
              </a>
              <a href="#" className="hover:text-pink-500">
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div>
        <h1 className='uppercase text-2xl text-center font-semibold text-[#514633] mb-7 pb-5 border-b-[#eaeaea] border-b-1'>
          You might also like
        </h1>

        <div className="w-full flex justify-center px-2 sm:px-4 py-6">
          <div className="w-full max-w-7xl mx-auto">
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              breakpoints={{
                1536: { slidesPerView: 4 },
                1280: { slidesPerView: 3 },
                1024: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
                640: { slidesPerView: 1 },
                480: { slidesPerView: 1 },
                300: { slidesPerView: 1 },
              }}
              loop={true}
            >
              {releted.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <div key={index} className="flex justify-center items-stretch h-full">
                    <div className="card w-full max-w-[18rem] sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[18rem] xl:max-w-[20rem] flex group flex-col items-center transition-transform duration-300 cursor-pointer m-1 origin-center z-0" onClick={() => handleSinglePageClick(item._id)}>

                      {/* 🔄 Image Flip Section */}
                      <div className="flex items-center justify-center w-full">
                        <div className="relative w-full aspect-square max-w-[285px] max-h-[285px] mx-auto [perspective:1000px]">
                          <div className="w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d] group-hover:md:[transform:rotateY(180deg)]">

                            {/* Front Image */}
                            <div className="absolute inset-0 [backface-visibility:hidden]">
                              <img
                                src={item.Image[0] || "/placeholder.png"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                              {item.tag && (
                                <span className="absolute top-3 -left-5 text-xs font-semibold rounded-full z-10">
                                  <div className="bg-[#B0D3FF] text-white h-[20px] px-2 flex items-center justify-center rounded-full">
                                    {item.tag}
                                  </div>
                                </span>
                              )}
                            </div>

                            {/* Back Image */}
                            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                              <img
                                src={item.Image[1] || "/placeholder.png"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-body h-[150px] p-3 sm:p-4 text-center w-full flex flex-col justify-start">
                        {/* Title */}
                        <h5 className="text-[17px] sm:text-base lg:text-md font-semibolde uppercase text-[#BF624C] mb-2">
                          {item.name}
                        </h5>

                        {/* Description */}
                        <div className="text-gray-600">
                          <p className="text-[15px] sm:text-sm lg:text-base text-gray-600 break-words">
                            {item.des}
                          </p>


                        </div>
                      </div>

                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export default SinglePage;
