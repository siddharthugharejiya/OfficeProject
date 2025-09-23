import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Navbar_1() {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openMenu, setOpenMenu] = useState(false); // mobile menu state
    // const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-white text-black w-full relative z-50 py-1">
            {/* 🔹 Top Bar */}
            <div className="flex justify-between items-center px-6 py-4 lg:px-30">
                {/* Left: Phone */}
                <div className="font-medium text-xl hidden md:block">012-345-6789</div>

                {/* Center: Logo */}
                <div className="flex justify-center">
                    <img
                        src="https://demo74leotheme.b-cdn.net/prestashop/leo_shopiodecor_demo/img/logo-1641277924.jpg"
                        alt="logo"
                        className="w-[120px]"
                    />
                </div>

                {/* Right: Icons */}
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

            {/* 🔹 Feature Divider */}
            <div className="flex items-center justify-center space-x-4 py-3">
                <div className="border-t border-gray-400 flex-grow"></div>
                <span className="px-3 font-medium bg-[#b86c59] text-white rounded-2xl text-sm">
                    Featured
                </span>
                <div className="border-t border-gray-400 flex-grow"></div>
            </div>

            {/* 🔹 Navigation Menu - Desktop */}
            <nav className="hidden md:flex space-x-8 justify-center items-center text-[17px] font-medium py-2">
                <Link to="/" className="hover:text-[#b86c59] transition">Home</Link>
                <Link to="/shop" className="hover:text-[#b86c59] transition">Shop</Link>
                <Link to="/product" className="hover:text-[#b86c59] transition">Product</Link>
                {/* <Link to="/pages" className="hover:text-[#b86c59] transition">Pages</Link> */}
                <Link to="/blogs" className="hover:text-[#b86c59] transition">Blogs</Link>
                <Link to="/contact" className="hover:text-[#b86c59] transition">Contact</Link>
            </nav>


            {/* 🔹 Offcanvas Menu - Mobile */}
            {openMenu && (
                <div
                    className="fixed inset-0 z-50 bg-[#00000080] bg-opacity-50 transition-opacity duration-300"
                    onClick={() => setOpenMenu(false)}
                >
                    <div
                        className="fixed right-0 top-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col transform transition-transform duration-300"
                        style={{ transform: openMenu ? "translateX(0)" : "translateX(100%)" }}
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside menu
                    >
                        {/* Close Button */}
                        <div className="flex justify-end mb-6">
                            <i
                                className="fa fa-times text-2xl cursor-pointer"
                                onClick={() => setOpenMenu(false)}
                            ></i>
                        </div>

                        {/* Menu Items */}

                        <Link to="/" className="text-left py-2 hover:text-[#b86c59] transition">Home</Link>
                        <Link to="/shop" className="text-left py-2 hover:text-[#b86c59] transition">Shop</Link>
                        <Link to="/product" className="text-left py-2 hover:text-[#b86c59] transition">Product</Link>
                        {/* <Link to="/pages" className="text-left py-2 hover:text-[#b86c59] transition">Pages</Link> */}
                        <Link to="/blogs" className="text-left py-2 hover:text-[#b86c59] transition">Blogs</Link>
                        <Link to="/contact" className="text-left py-2 hover:text-[#b86c59] transition">Contact</Link>


                        {/* Optional: Cart & User */}
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
