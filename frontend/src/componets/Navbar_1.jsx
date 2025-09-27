import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar_1() {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [animateMenu, setAnimateMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false); // New state for Product dropdown
    const dropdownRef = useRef(null);
    const productDropdownRef = useRef(null); // Ref for Product dropdown

    const nav = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
            if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
                setIsProductDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle Product dropdown hover on desktop
    useEffect(() => {
        const handleMouseEnter = () => {
            if (window.innerWidth >= 768) { // md breakpoint
                setIsProductDropdownOpen(true);
            }
        };
        const handleMouseLeave = (event) => {
            if (window.innerWidth >= 768) {
                const relatedTarget = event.relatedTarget || document.elementFromPoint(event.clientX, event.clientY);
                if (!productDropdownRef.current?.contains(relatedTarget)) {
                    setIsProductDropdownOpen(false);
                }
            }
        };

        const productDropdown = productDropdownRef.current;
        if (productDropdown) {
            productDropdown.addEventListener('mouseenter', handleMouseEnter);
            productDropdown.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (productDropdown) {
                productDropdown.removeEventListener('mouseenter', handleMouseEnter);
                productDropdown.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    const handleOpenMenu = () => {
        setOpenMenu(true);
        setTimeout(() => setAnimateMenu(true), 10);
    };

    const handleCloseMenu = () => {
        setAnimateMenu(false);
        setIsProductDropdownOpen(false); // Close Product dropdown when closing menu
        setTimeout(() => setOpenMenu(false), 300);
    };

    const handleCategory = (category) => {
        nav(`/category/${category}`);
        setIsProductDropdownOpen(false);
        setOpenMenu(false);
    };

    return (
        <div className="bg-white text-black w-full relative z-50 py-1">
            {/* 🔹 Top Bar */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-4 lg:px-30">
                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button onClick={handleOpenMenu}>
                        <i className="fa fa-bars text-2xl text-[#333]"></i>
                    </button>
                </div>

                {/* Left: Phone (desktop only) */}
                <div className="font-medium text-xl hidden md:block">012-345-6789</div>

                {/* Center: Logo */}
                <div className="flex justify-center">
                    <img
                        src="../image/Logo CLR.png"
                        alt="logo"
                        className="w-[120px]"
                    />
                </div>

                {/* Right: Icons (desktop only) */}
                <div className="hidden sm:flex items-center space-x-6 text-[18px] text-[#333] font-normal">
                    <img src="../image/search.png" className='h-[20px]' alt="" />
                    <img src="../image/heart.png" className='h-[20px]' alt="" />
                    <div className="relative" ref={dropdownRef}>
                        <img src="../image/user.png" className='h-[20px]' alt="" onClick={() => setOpen(!open)} />
                        {open && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
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

            {/* 🔹 Feature Divider */}
            <div className="flex items-center justify-center space-x-4 py-3">
                <div className="border-t border-gray-400 flex-grow"></div>
                <span className="px-3 font-medium bg-[#b86c59] text-white rounded-2xl text-sm">
                    Featured
                </span>
                <div className="border-t border-gray-400 flex-grow"></div>
            </div>

            {/* 🔹 Navigation Menu - Desktop */}
            <nav className="hidden md:flex space-x-8 overflow-visible justify-center items-center text-[17px] font-medium py-2">
                <Link to="/" className="hover:text-[#b86c59] transition">Home</Link>
                <Link to="/whoWeAre" className="hover:text-[#b86c59] transition">Who We Are</Link>
                <div className="relative" ref={productDropdownRef}>
                    <Link
                        // to="/product"
                        onClick={() => {
                            if (window.innerWidth < 768) {
                                setIsProductDropdownOpen(!isProductDropdownOpen);
                            }
                        }}
                        className="hover:text-[#b86c59] transition"
                    >
                        Product
                    </Link>
                    <div className={`absolute left-0 top-[50%] mt-2 z-50 w-[90vw] max-w-[300px] sm:w-[80vw] sm:max-w-[380px] md:w-[60vw] md:max-w-[420px] lg:w-[30rem] lg:max-w-[450px] bg-white shadow-lg rounded-md max-h-[60vh] lg:max-h-[50vh] overflow-y-auto ${isProductDropdownOpen ? 'block' : 'hidden'}`}>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-3">
                            {[
                                "One Piece Closet",
                                "Wall Hung Closet",
                                "Water Closet",
                                "Table Top Basin",
                                "One Piece Basin",
                                "Counter Basin",
                                "Basin With Pedestal",
                                "Basin With Half Pedestal",
                                "Wall Hung Basin",
                                "Urinal",
                                "Pan",
                                "Pastel Series",
                            ].map((category) => (
                                <li key={category}>
                                    <button
                                        onClick={() => handleCategory(category)}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 hover:text-[#b86c59] transition"
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Link to="/new" className="hover:text-[#b86c59] transition">New Arrivals</Link>
                <Link to="/contact" className="hover:text-[#b86c59] transition">Contact</Link>
            </nav>

            {/* 🔹 Offcanvas Menu - Mobile Only */}
            {openMenu && (
                <div
                    className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50"
                    onClick={handleCloseMenu}
                >
                    <div
                        className={`fixed left-0 top-0 w-[260px] h-full bg-white shadow-lg p-6 flex flex-col
                        transform transition-transform duration-300 overflow-auto ease-in-out
                        ${animateMenu ? 'translate-x-0' : '-translate-x-full'}
                    `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <div className="flex justify-end mb-6">
                            <i
                                className="fa fa-times text-2xl cursor-pointer"
                                onClick={handleCloseMenu}
                            ></i>
                        </div>

                        {/* Menu Items */}
                        <Link to="/" className="text-left py-2 hover:text-[#b86c59] transition">Home</Link>
                        <Link to="/shop" className="text-left py-2 hover:text-[#b86c59] transition">Shop</Link>
                        <div className="relative">
                            <button
                                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                                className="text-left py-2 hover:text-[#b86c59] transition w-full"
                            >
                                Product
                            </button>
                            {isProductDropdownOpen && (
                                <ul className="mt-2 pl-4 space-y-2">
                                    {[
                                        "One Piece Closet",
                                        "Wall Hung Closet",
                                        "Water Closet",
                                        "Table Top Basin",
                                        "One Piece Basin",
                                        "Counter Basin",
                                        "Basin With Pedestal",
                                        "Basin With Half Pedestal",
                                        "Wall Hung Basin",
                                        "Urinal",
                                        "Pan",
                                        "Pastel Series",
                                    ].map((category) => (
                                        <li key={category}>
                                            <button
                                                onClick={() => handleCategory(category)}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-[#b86c59] transition"
                                            >
                                                {category}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Link to="/blogs" className="text-left py-2 hover:text-[#b86c59] transition">Blogs</Link>
                        <Link to="/contact" className="text-left py-2 hover:text-[#b86c59] transition">Contact</Link>

                        <div className="mt-4 border-t pt-4">
                            <Link to="/login" className="flex items-center space-x-2 py-2">
                                <i className="fa fa-user"></i>
                                <span>User</span>
                            </Link>
                            <Link to="/cart" className="flex items-center space-x-2 py-2">
                                <i className="fa fa-shopping-bag"></i>
                                <span>Cart (0)</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar_1;