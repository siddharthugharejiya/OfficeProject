import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaHeart, FaUser, FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from "react-router-dom";
import { Product_category } from '../Redux/action';
import { useDispatch, useSelector } from 'react-redux';

export function Nav() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const productDropdownRef = useRef(null);

    const dispatch = useDispatch();
    const nav = useNavigate();
    const categories = useSelector(state => state.category?.category);
    console.log(categories);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    // Click outside to close user dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle Product dropdown hover on desktop
    useEffect(() => {
        const handleMouseEnter = () => {
            if (window.innerWidth >= 1024) {
                setIsProductDropdownOpen(true);
            }
        };
        const handleMouseLeave = (event) => {
            if (window.innerWidth >= 1024) {
                // Check if the cursor is leaving to an element outside the dropdown
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

    const handleCategory = (e) => {
        console.log(e);
        dispatch(Product_category(e));
        nav(`/category/${e}`);
        setIsProductDropdownOpen(false);
        setIsOpen(false);
    };

    return (
        <>
            <header className="md:py-3 md:px-30 sm:py-2 py-3 lg:px-5 sm:px-30 px-3 relative z-50">
                <div className="max-w-[1440px] mx-auto">
                    <div className="block lg:hidden">
                        <div className="w-full flex justify-center items-center mb-3">
                            <img
                                src="../image/Logo CLR.png"
                                alt="Logo"
                                className="sm:h-8 h-5"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <button onClick={handleToggle} className="sm:text-xl text-md">
                                <FaBars />
                            </button>
                            <div className="flex sm:flex items-center space-x-6 text-[18px] text-[#333] font-normal">
                                <img src="../image/search.png" className='sm:h-[20px] h-[15px]' alt="" />
                                <img src="../image/heart.png" className='sm:h-[20px] h-[15px]' alt="" />
                                <div className="relative" ref={dropdownRef}>
                                    <img src="../image/user.png" className='sm:h-[20px] h-[15px]' alt="" onClick={() => setOpen(!open)} />
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
                    </div>

                    <div className="hidden lg:flex items-center justify-between pt-5 flex-wrap">
                        <div className="flex items-center flex-wrap">
                            <div className='w-full flex justify-center items-center'>
                                <img
                                    src="../image/Logo CLR.png"
                                    alt="Logo"
                                    className="h-8"
                                />
                            </div>
                            <div className='md:hidden md:ms-5 sm:ms-5 ms-5 mt-1'>
                                <i className="fa-solid fa-bars-staggered text-xl" onClick={handleToggle}></i>
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
                                    to="/whoWeAre"
                                    onClick={() => setActiveIndex(1)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    Who We Are
                                    <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 1 ? 'w-full translate-x-[-50%]' : 'w-0 group-hover:w-full group-hover:translate-x-[-50%]'} `}></span>
                                </Link>
                            </div>

                            <div className="relative" ref={productDropdownRef}>
                                <button
                                    onClick={() => {
                                        setActiveIndex(2);
                                        if (window.innerWidth < 1024) {
                                            setIsProductDropdownOpen(!isProductDropdownOpen);
                                        }
                                    }}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative inline-block"
                                >
                                    Product
                                    <span
                                        className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#b86c59] transition-all duration-300 ${activeIndex === 2 ? "w-full translate-x-[-50%]" : "w-0 group-hover:w-full group-hover:translate-x-[-50%]"}`}
                                    ></span>
                                </button>

                                <div className={`absolute left-0 top-[90%] mt-2 z-50 w-[90vw] max-w-[300px] sm:w-[80vw] sm:max-w-[380px] md:w-[60vw] md:max-w-[420px] lg:w-[30rem] lg:max-w-[450px] bg-white shadow-lg rounded-md max-h-[250px] overflow-y-auto ${isProductDropdownOpen ? 'block' : 'hidden'}`}>
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
                                                    onClick={() => {
                                                        handleCategory(category);
                                                    }}
                                                    className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 hover:text-gray-900 transition"
                                                >
                                                    {category}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="relative group flex">
                                <Link
                                    to="/new"
                                    onClick={() => setActiveIndex(4)}
                                    className="text-[17px] font-medium text-[#2c2c2c] hover:text-[#b86c59] focus:outline-none relative"
                                >
                                    New Arrivals
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
                </div>
            </header>

            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                        to="/whoWeAre"
                        onClick={() => { setActiveIndex(1); setIsOpen(false); }}
                        className="text-left hover:text-[#b86c59]"
                    >
                        Who We Are
                    </Link>
                    <div className="relative">
                        <button
                            onClick={() => {
                                setActiveIndex(2);
                                setIsProductDropdownOpen(!isProductDropdownOpen);
                            }}
                            className="text-left hover:text-[#b86c59] w-full"
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
                                            onClick={() => {
                                                handleCategory(category);
                                            }}
                                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-[#b86c59]"
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <Link
                        to="/new"
                        onClick={() => { setActiveIndex(4); setIsOpen(false); }}
                        className="text-left hover:text-[#b86c59]"
                    >
                        New Arrivals
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

            {isOpen && (
                <div onClick={handleToggle} className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-40 sm:hidden"></div>
            )}
        </>
    );
}