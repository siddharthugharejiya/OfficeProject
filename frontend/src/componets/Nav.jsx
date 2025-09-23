import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaHeart, FaUser, FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa';

import { Link } from "react-router-dom";
function Nav() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {/* Header */}
            <header className=" 
            md:py-3 
            md:px-30 
            sm:py-10 py-3
            sm:px-30 px-3
            relative z-50 ">
                <div className="max-w-[1440px] mx-auto">


                    <div className="block lg:hidden ">

                        <div className="w-full flex justify-center items-center mb-3">
                            <img
                                src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/img/logo-1641277924.jpg"
                                alt="Logo"
                                className="h-8"
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <button onClick={handleToggle} className="text-xl">
                                <FaBars />
                            </button>

                            <div className="flex items-center space-x-5 text-lg">
                                <FaSearch className="cursor-pointer" />
                                <FaHeart className="cursor-pointer" />
                                <FaUser className="cursor-pointer" />
                                <div className="relative cursor-pointer">
                                    <FaShoppingBag />
                                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">0</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center justify-between flex-wrap ">
                        <div className="flex items-center flex-wrap">
                            <div className='w-full flex justify-center items-center'>
                                <img
                                    src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/img/logo-1641277924.jpg"
                                    alt="Logo"
                                    className="h-8"
                                />
                            </div>
                            <div className='md:hidden md:ms-5 sm:ms-5 ms-5 mt-1'>
                                <i className="fa-solid fa-bars-staggered text-xl " onClick={handleToggle}></i>
                            </div>
                        </div>

                        <nav className="hidden md:flex space-x-8 items-center relative z-50 text-2xl">

                            <div className="relative group flex">
                                <Link
                                    to="/"
                                    onClick={() => setActiveIndex(0)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Home
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 0 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </Link>
                            </div>

                            <div className="relative group flex">
                                <Link
                                    to="/shop"
                                    onClick={() => setActiveIndex(1)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Shop
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 1 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </Link>
                            </div>

                            <div className="relative group flex">
                                <Link
                                    to="/product"
                                    onClick={() => setActiveIndex(2)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Product
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 2 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </Link>
                            </div>

                            {/* <div className="relative group flex">
                                <Link
                                    to="/pages"
                                    onClick={() => setActiveIndex(3)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Pages
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 3 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </Link>
                            </div> */}

                            <div className="relative group flex">
                                <Link
                                    to="/blogs"
                                    onClick={() => setActiveIndex(4)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Blogs
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 4 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </Link>
                            </div>

                            <div className="relative group flex">
                                <Link
                                    to="/contact"
                                    onClick={() => setActiveIndex(5)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Contact
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 5 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </Link>
                            </div>

                        </nav>


                        {/* Icons Right */}
                        <div className="hidden sm:flex items-center space-x-6 text-[18px] text-[#333] font-normal">
                            <img src="../image/search.png" className='h-[20px]' alt="" />
                            <img src="../image/heart.png" className='h-[20px]' alt="" />
                            <div className="relative" ref={dropdownRef}>
                                <img src="../image/user.png" className='h-[20px]' alt="" onClick={() => setOpen(!open)} />

                                {open && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10 ">
                                        <ul className="flex flex-col">
                                            <li>
                                                <Link
                                                    to="/admin"
                                                    className="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer"
                                                >
                                                    Admin Panel
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="relative cursor-pointer hover:scale-110 transition">
                                <img src="../image/shopping-cart.png" className='h-[20px]' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ---------- Offcanvas Sidebar ---------- */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}   `}>
                <div className="flex justify-between items-center px-4 py-4 border-b">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={handleToggle} className="text-xl">
                        <FaTimes />
                    </button>
                </div>


                <nav className="flex flex-col p-4 space-y-3">
                    <Link
                        to="/"
                        onClick={() => { setActiveIndex(0); setIsOpen(false); }}
                        className="text-left hover:text-[#b86c59]"
                    >
                        Home
                    </Link>

                    <Link
                        to="/shop"
                        onClick={() => { setActiveIndex(1); setIsOpen(false); }}
                        className="text-left hover:text-[#b86c59]"
                    >
                        Shop
                    </Link>

                    <Link
                        to="/product"
                        onClick={() => { setActiveIndex(2); setIsOpen(false); }}
                        className="text-left hover:text-[#b86c59]"
                    >
                        Product
                    </Link>

                    {/* <Link
                        to="/pages"
                        onClick={() => { setActiveIndex(3); setIsOpen(false); }}
                        className="text-left hover:text-[#b86c59]"
                    >
                        Pages
                    </Link> */}

                    <Link
                        to="/blogs"
                        onClick={() => { setActiveIndex(4); setIsOpen(false); }}
                        className="text-left hover:text-[#b86c59]"
                    >
                        Blogs
                    </Link>

                    <Link
                        to="/contact"
                        onClick={() => { setActiveIndex(5); setIsOpen(false); }}
                        className="text-left hover:text-[#b86c59]"
                    >
                        Contact
                    </Link>
                </nav>

            </div>

            {/* Backdrop */}
            {isOpen && (
                <div onClick={handleToggle} className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-40 sm:hidden"></div>
            )}
        </>
    );
}

export default Nav;
