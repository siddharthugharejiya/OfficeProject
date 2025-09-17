import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Product, Product_del, Product_edite_get } from '../Redux/action';
import { useLocation, useNavigate } from 'react-router-dom';
// import Product_add from './Product_add';
import { FaGlobe } from "react-icons/fa";
import { FiHome, FiBox, FiPlusCircle, FiShoppingBag } from 'react-icons/fi';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';
import { Product_del, Product_edite_get, Product_Get } from '../Redux/action';
import Product_add from './Product_Add';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);
// Image URL handle karne ke liye helper function
const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/200?text=No+Image";

    // Agar already full URL hai
    if (imagePath.startsWith('http')) {
        return imagePath;
    }

    // Agar upload folder se image hai
    if (imagePath.startsWith('/uploads/')) {
        return `http://localhost:9595${imagePath}`;
    }

    // Agar sirf filename hai
    if (!imagePath.includes('/')) {
        return `http://localhost:9595/uploads/${imagePath}`;
    }

    return imagePath;
};
const AdminPanel = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [state, setstate] = useState("Desh")

    const handleClick = (e) => {
        setstate(e);
    };
    const products = useSelector(state => state.Product.Product || [])

    console.log(products);


    const handleDelete = (el) => {
        console.log(el);

        dispatch(Product_del(el)).then(() => {
            dispatch(Product_Get())
        })
    }

    const nav = useNavigate();
    const handleEdite = (el) => {
        dispatch(Product_edite_get(el)).then(() => {
            dispatch(Product_Get())
            setstate("add");
        })

    };

    useLayoutEffect(() => {
        dispatch(Product_Get())
    }, [dispatch])

    useEffect(() => {
        if (location.state?.reload) {
            // dispatch(Product());
        }
    }, [location.state, dispatch])

    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Sales 2023',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 1,
            },
        ],
    };

    const revenueData = {
        labels: ['Electronics', 'Clothing', 'Home', 'Food', 'Other'],
        datasets: [
            {
                label: 'Revenue by Category',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(79, 70, 229, 0.8)',
                    'rgba(67, 56, 202, 0.8)',
                    'rgba(55, 48, 163, 0.8)',
                    'rgba(49, 46, 129, 0.8)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            <aside className="w-full lg:w-64 bg-indigo-800 text-white p-4">
                <h1 className="text-2xl font-bold mb-8 flex items-center">
                    <FiShoppingBag className="mr-2" />
                    Admin Panel
                </h1>
                <div className="space-y-2">
                    <button onClick={() => handleClick("Desh")} className={`flex items-center w-full p-3 rounded-lg ${state === "Desh" ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
                        <FiHome className="mr-3" /> Dashboard
                    </button>
                    <button onClick={() => handleClick("prod")} className={`flex items-center w-full p-3 rounded-lg ${state === "prod" ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
                        <FiBox className="mr-3" /> Products
                    </button>
                    <button onClick={() => handleClick("add")} className={`flex items-center w-full p-3 rounded-lg ${state === "add" ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
                        <FiPlusCircle className="mr-3" /> Add Product
                    </button>
                    <button onClick={() => nav("/")} className={`flex items-center w-full p-3 rounded-lg ${state === "website" ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
                        <FaGlobe className="mr-3 text-lg " /> Website
                    </button>
                </div>
            </aside>

            <div className="flex-1 p-4 sm:p-6">
                {state === "Desh" && (
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
                                <h3 className="text-gray-500">Total Products</h3>
                                <p className="text-2xl sm:text-3xl font-bold text-indigo-600">{products.length}</p>
                            </div>
                            <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
                                <h3 className="text-gray-500">Monthly Sales</h3>
                                <p className="text-2xl sm:text-3xl font-bold text-indigo-600">$12,345</p>
                            </div>
                            <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
                                <h3 className="text-gray-500">New Customers</h3>
                                <p className="text-2xl sm:text-3xl font-bold text-indigo-600">124</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
                                <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
                                <Line data={salesData} />
                            </div>
                            <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
                                <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
                                <Pie data={revenueData} />
                            </div>
                        </div>
                    </div>
                )}
                {state === "prod" && (
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Product Management</h1>
                            <button onClick={() => handleClick("add")} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                                Add Product
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((el) => (
                                <div key={el._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                    {/* Product Image */}
                                    <div className="h-48 w-full relative bg-gray-100">
                                        <img
                                            src={
                                                el.Image
                                                    ? el.Image.startsWith('http')
                                                        ? el.Image
                                                        : `http://localhost:9595${el.Image.startsWith('/') ? el.Image : '/uploads/' + el.Image}`
                                                    : "https://via.placeholder.com/200?text=No+Image"
                                            }
                                            alt={el.name}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/200?text=No+Image";
                                            }}
                                        />
                                        {el.tag && (
                                            <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                                                {el.tag}
                                            </span>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{el.name}</h3>
                                            <div className="text-yellow-500 text-sm flex items-center">
                                                ★{el.rating || '0'}
                                            </div>
                                        </div>

                                        {el.title && (
                                            <p className="text-sm text-gray-500 mb-2">{el.title}</p>
                                        )}

                                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{el.des}</p>

                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-800 font-bold">${el.price}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">{el.weight}</span>
                                        </div>

                                        <div className="text-xs text-gray-500">
                                            Category: {el.category}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="px-4 pb-4 flex gap-2">
                                        <button
                                            onClick={() => handleDelete(el._id)}
                                            className="flex-1 py-2 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleEdite(el._id)}
                                            className="flex-1 py-2 text-sm bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 transition-colors"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {state === "add" && (
                    <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
                        <Product_add />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
