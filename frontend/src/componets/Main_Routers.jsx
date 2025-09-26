import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import AdminPanel from './AdminPanel'
import SinglePage from './SinglePage'
import ProductPage from './ProductPage'
import Contect from './Contect'
import Category from './Category'

function Main_Routers() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<AdminPanel />} />
            <Route path='/SinglePage/:id' element={<SinglePage />} />
            <Route path='/Product/:id' element={<ProductPage />} />
            <Route path='/contact' element={<Contect />} />
            <Route path='/category/:category' element={<Category />} />
        </Routes>
    )
}

export default Main_Routers
