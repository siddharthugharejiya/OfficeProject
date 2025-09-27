import React from 'react'

export default function GlobalLoader({ visible }) {
    if (!visible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white/90 rounded-lg p-6 flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-[#BD624C] border-gray-200 rounded-full animate-spin"></div>
                <div className="mt-3 text-gray-700 font-medium">Loading...</div>
            </div>
        </div>
    )
}
