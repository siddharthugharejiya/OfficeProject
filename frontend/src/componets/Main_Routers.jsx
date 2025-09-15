import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'

function Main_Routers() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    )
}

export default Main_Routers
