import React, { useState } from 'react';
import { FaSearch, FaHeart, FaUser, FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa';

function Nav() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

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

                    {/* ---------- XS: Mobile View ---------- */}
                    <div className="block lg:hidden ">
                        {/* Logo */}
                        <div className="w-full flex justify-center items-center mb-3">
                            <img
                                src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/img/logo-1641277924.jpg"
                                alt="Logo"
                                className="h-8"
                            />
                        </div>

                        {/* Hamburger + Icons */}
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

                    {/* ---------- SM and Up: Original Design ---------- */}
                    <div className="hidden lg:flex items-center justify-between flex-wrap ">
                        {/* Logo */}
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

                        {/* Navigation */}
                        <nav className="hidden md:flex space-x-8 items-center relative z-50 text-2xl">

                            <div className="relative group flex">
                                <button
                                    onClick={() => setActiveIndex(0)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Home
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 0 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </button>
                            </div>

                            <div className="relative group flex">
                                <button
                                    onClick={() => setActiveIndex(1)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Shop
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 1 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </button>
                            </div>

                            <div className="relative group flex">
                                <button
                                    onClick={() => setActiveIndex(2)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Product
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 2 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </button>
                            </div>

                            <div className="relative group flex">
                                <button
                                    onClick={() => setActiveIndex(3)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Pages
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 3 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </button>
                            </div>

                            <div className="relative group flex">
                                <button
                                    onClick={() => setActiveIndex(4)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Blogs
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 4 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </button>
                            </div>

                            <div className="relative group flex">
                                <button
                                    onClick={() => setActiveIndex(5)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Contact
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 5 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </button>
                            </div>

                        </nav>

                        {/* Icons Right */}
                        <div className="hidden sm:flex items-center space-x-6 text-[18px] text-[#333] font-normal">
                            <i className="fa fa-search cursor-pointer hover:scale-110 transition"></i>
                            <i className="fa fa-heart cursor-pointer hover:scale-110 transition"></i>
                            <i className="fa fa-user cursor-pointer hover:scale-110 transition"></i>
                            <div className="relative cursor-pointer hover:scale-110 transition">
                                <i className="fa fa-shopping-bag"></i>
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
                                    0
                                </span>
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
                    <button onClick={() => { setActiveIndex(0); setIsOpen(false); }} className="text-left hover:text-[#b86c59]">Home</button>
                    <button onClick={() => { setActiveIndex(1); setIsOpen(false); }} className="text-left hover:text-[#b86c59]">Shop</button>
                    <button onClick={() => { setActiveIndex(2); setIsOpen(false); }} className="text-left hover:text-[#b86c59]">Product</button>
                    <button onClick={() => { setActiveIndex(3); setIsOpen(false); }} className="text-left hover:text-[#b86c59]">Pages</button>
                    <button onClick={() => { setActiveIndex(4); setIsOpen(false); }} className="text-left hover:text-[#b86c59]">Blogs</button>
                    <button onClick={() => { setActiveIndex(5); setIsOpen(false); }} className="text-left hover:text-[#b86c59]">Contact</button>
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
