import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from './Nav';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { SingleProduct_Action } from '../Redux/action';

function SinglePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.SinglePageProduct?.Product.data);
  console.log(product);


  useEffect(() => {
    if (id) {
      dispatch(SingleProduct_Action(id));
    }
  }, [id, dispatch]);


  if (!product) return <div className="text-center p-10 text-xl font-medium">Loading...</div>;

  return (
    <div>
      <Nav />

      <section className="px-4 md:px-10 lg:px-20 py-10 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="relative bg-white rounded-xl shadow-md p-5">
            <div className="overflow-hidden rounded-lg group relative">
              <img
                src={product.Image || product.image?.[0] || 'https://via.placeholder.com/400'}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="mt-4 flex gap-2">
              {[product.image?.[0], product.image?.[1], product.image?.[2]]
                .filter(Boolean)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`preview-${index}`}
                    className="w-20 h-20 object-cover rounded-lg border hover:ring-2 ring-offset-2 ring-indigo-500 cursor-pointer"
                  />
                ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-500 mb-4">{product.des}</p>

              <div className="flex items-center gap-2 mb-3">
                <div className="text-yellow-500 text-xl">{"★".repeat(4)}</div>
                <span className="text-sm text-gray-600">(102 reviews)</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
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

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold text-indigo-600">₹{product.price}</p>
                <span className="text-sm text-gray-500">Inclusive of all taxes</span>
              </div>


            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SinglePage;
