import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from './Nav';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { SingleProduct_Action } from '../Redux/action';

function SinglePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.SinglePageProduct?.Product);
  const product = products?.data || null;

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(SingleProduct_Action(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product?.Image?.[0]) {
      setSelectedImage(product.Image[0]);
    }
  }, [product]);

  // ✅ Zoom effect on main image
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
    <div>
      <Nav />

      <section className="px-4 md:px-10 lg:px-20 py-10 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Image Section */}
          <div className="relative bg-white rounded-xl shadow-md p-5">
            <div className="overflow-hidden rounded-lg group relative image-container">
              <img
                src={selectedImage || 'https://via.placeholder.com/400'}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded-lg transition-transform duration-300 ease-in-out"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="mt-4 flex gap-2 flex-wrap">
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
                        : "hover:ring-2 ring-offset-2 ring-indigo-500"}`}
                  />
                ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-500 mb-4 text-sm sm:text-base">{product.des}</p>

              {/* Ratings */}
              <div className="flex items-center gap-2 mb-3">
                <div className="text-yellow-500 text-lg sm:text-xl">
                  {"★".repeat(Number(product.rating) || 0)}
                  {"☆".repeat(5 - (Number(product.rating) || 0))}
                </div>
                <span className="text-xs sm:text-sm text-gray-600">({product.rating} rating)</span>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
                <div>
                  <p className="font-medium">Category:</p>
                  <p>{product.category}</p>
                </div>
                <div>
                  <p className="font-medium">Weight:</p>
                  <p>{product.weight}</p>
                </div>
                <div>
                  <p className="font-medium">Tag:</p>
                  <p>{product.tag}</p>
                </div>
                <div>
                  <p className="font-medium">In Stock:</p>
                  <p>Yes</p>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
                <p className="text-xl sm:text-2xl font-bold text-indigo-600">₹{product.price}</p>
                <span className="text-xs sm:text-sm text-gray-500">Inclusive of all taxes</span>
              </div>
            </div>
          </div>

        </div>
      </section>
       <div className="overflow-hidden">

      <Footer />
       </div>
    </div>
  );
}

export default SinglePage;
