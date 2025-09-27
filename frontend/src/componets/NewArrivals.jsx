import React, { useEffect, useState } from 'react'
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Product_Get } from '../Redux/action'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import { LoadingSpinner } from './SkeletonLoader'

const sampleProducts = [
    {
        _id: 'p1',
        name: 'Ceramic Vase',
        des: 'Handmade ceramic vase with matte finish.',
        Image: ['https://via.placeholder.com/600x600?text=Vase']
    },
    {
        _id: 'p2',
        name: 'Oak Side Table',
        des: 'Solid oak side table, oiled finish.',
        Image: ['https://via.placeholder.com/600x600?text=Table']
    },
    {
        _id: 'p3',
        name: 'Woven Rug',
        des: 'Flatweave rug with warm tones.',
        Image: ['https://via.placeholder.com/600x600?text=Rug']
    },
    {
        _id: 'p4',
        name: 'Brass Lamp',
        des: 'Minimal brass lamp with linen shade.',
        Image: ['https://via.placeholder.com/600x600?text=Lamp']
    },
]

function NewArrivals() {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const productsFromStore = useSelector(state => state.Product.Product || [])
    const isLoading = useSelector(state => state.Product.loading || false)
    const [addedIds, setAddedIds] = useState([])
    const [wishlistIds, setWishlistIds] = useState([])
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('newest')
    const [page, setPage] = useState(1)
    const perPage = 8

    useEffect(() => {
        dispatch(Product_Get())
    }, [dispatch])

    // reset page when filters/search/sort change
    useEffect(() => {
        setPage(1)
    }, [search, selectedCategory, sortBy])

    const goToProduct = (id) => {
        nav(`/Product/${id}`)
    }

    const showToast = (message, type = 'success') => {
        Toastify({
            text: message,
            duration: 2500,
            gravity: 'top',
            position: 'right',
            className: `custom-toast ${type}`,
            style: { background: type === 'success' ? '#00b09b' : '#ff4e4e' }
        }).showToast()
    }

    const addToCart = (product) => {
        try {
            const raw = localStorage.getItem('cart')
            const cart = raw ? JSON.parse(raw) : []
            const exists = cart.find(item => item._id === product._id)
            if (!exists) cart.push({ ...product, qty: 1 })
            else exists.qty = (exists.qty || 1) + 1
            localStorage.setItem('cart', JSON.stringify(cart))
            setAddedIds(prev => [...new Set([...prev, product._id])])
            showToast('Added to cart', 'success')
        } catch (e) {
            console.error(e)
            showToast('Failed to add to cart', 'error')
        }
    }

    const addToWishlist = (product) => {
        try {
            const raw = localStorage.getItem('wishlist')
            const list = raw ? JSON.parse(raw) : []
            if (!list.find(i => i._id === product._id)) list.push(product)
            localStorage.setItem('wishlist', JSON.stringify(list))
            setWishlistIds(prev => [...new Set([...prev, product._id])])
            showToast('Added to wishlist', 'success')
        } catch (e) {
            console.error(e)
            showToast('Failed to add to wishlist', 'error')
        }
    }

    // derived data
    const allProducts = productsFromStore.length ? productsFromStore : sampleProducts
    const categories = ['All', ...Array.from(new Set(allProducts.map(p => p.category).filter(Boolean)))]

    const filtered = allProducts.filter(p => {
        const matchesSearch = (p.name || '').toLowerCase().includes(search.toLowerCase()) || (p.des || '').toLowerCase().includes(search.toLowerCase())
        const matchesCategory = selectedCategory === 'All' ? true : p.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const sorted = filtered.slice().sort((a, b) => {
        if (sortBy === 'newest') return 0 // assume incoming order is newest first
        if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0)
        if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0)
        return 0
    })

    const totalPages = Math.max(1, Math.ceil(sorted.length / perPage))
    const paginated = sorted.slice((page - 1) * perPage, page * perPage)

    return (
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-20 xl:px-28 py-12 bg-white text-gray-800">
            <section className="max-w-7xl mx-auto text-center mb-8">
                <div className="text-[#BD9C85] font-semibold uppercase text-sm mb-2">New</div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase mb-4">New Arrivals</h1>
                <p className="text-gray-600 max-w-3xl mx-auto">Browse the latest products added to our collection. Handpicked and crafted with care.</p>
            </section>

            {/* Filters */}
            <section className="max-w-7xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 overflow-x-auto">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-2 rounded ${selectedCategory === cat ? 'bg-[#BD9C85] text-white' : 'bg-[#f3f3f3]'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="flex items-center space-x-3">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 border rounded">
                        <option value="newest">Newest</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search new arrivals" className="px-3 py-2 border rounded" />
                </div>
            </section>

            {/* Product grid */}
            <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading && (
                    <div className="col-span-full flex justify-center items-center py-20">
                        <LoadingSpinner />
                    </div>
                )}

                {!isLoading && paginated.length === 0 && (
                    <div className="col-span-full text-center py-14 text-gray-600">No products found for your search/filter.</div>
                )}

                {!isLoading && paginated.length > 0 && paginated.map((p) => (
                    <div key={p._id} className="bg-white rounded-lg overflow-hidden">
                        <div className="relative h-64 bg-gray-100">
                            <img src={(p.Image && p.Image[0]) || p.Image} alt={p.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-3">
                                <button className="bg-white p-2 rounded" onClick={() => addToCart(p)}>
                                    <FaShoppingCart />
                                </button>
                                <button className="bg-white p-2 rounded" onClick={() => addToWishlist(p)}>
                                    <FaHeart />
                                </button>
                                <button className="bg-white p-2 rounded" onClick={() => goToProduct(p._id)}>
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-semibold">{p.name}</h3>
                            <p className="text-sm text-gray-600">{p.des}</p>
                            <button className="mt-3 bg-[#BD624C] text-white px-4 py-2 rounded" onClick={() => goToProduct(p._id)}>View</button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Pagination */}
            <div className="max-w-7xl mx-auto mt-8 flex items-center justify-center space-x-4">
                <button className="px-3 py-2 border rounded" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
                <div>Page {page} / {totalPages}</div>
                <button className="px-3 py-2 border rounded" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    )
}

export default NewArrivals
