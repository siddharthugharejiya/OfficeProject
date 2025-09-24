import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from './Nav';
import Footer1 from './Footer1';
import { useNavigate, useParams } from 'react-router-dom';
import { Product_Action, SingleProduct_Action } from '../Redux/action';
import Navbar_1 from './Navbar_1';

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
      <div className='bg-[#F6F4F2] text-center py-10 text-[#514633] font-semibold text-md'>Home / Storage / {product.category}</div>


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
        <h1 className='uppercase text-2xl text-center font-semibold text-[#514633] mb-7 pb-5 border-b-[#eaeaea] border-b-1'>You might also like</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-30 px-0">
          {releted.map((item) => (
            <div
              key={item._id}
              className="hover:scale-105 transition-all duration-300 flex flex-col"
              onClick={() => handleSinglePageClick(item._id)}
            >
              {/* Image Flip Container */}
              <div className="relative w-[285px] h-[285px] card-flip flex justify-center items-center mx-auto">
                <div className="card-inner">
                  {/* Front Image */}
                  <div className="card-front">
                    <img
                      src={item.Image?.[0] || '/placeholder.png'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.tag && (
                      <span className="absolute top-3 -left-3 text-xs font-semibold rounded-full z-10">
                        <div className="bg-[#B0D3FF] text-white h-[20px] px-2 flex items-center justify-center rounded-full">
                          {item.tag}
                        </div>
                      </span>
                    )}
                  </div>

                  {/* Back Image */}
                  <div className="card-back">
                    <img
                      src={item.Image?.[1] || '/placeholder.png'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>


              {/* Product Text */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className='text-center'>
                  <h2 className="text-lg font-medium text-[#BF624C] mb-1">{item.name}</h2>
                  <p className="text-gray-500 text-sm line-clamp-3">{item.des}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export default SinglePage;
