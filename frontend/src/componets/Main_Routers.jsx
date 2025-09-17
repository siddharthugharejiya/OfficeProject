import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import AdminPanel from './AdminPanel'

function Main_Routers() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<AdminPanel />} />
        </Routes>
    )
}

export default Main_Routers
