import React from 'react'

function Loding() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 to-indigo-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-indigo-100 rounded-full animate-spin" />
                <p className="mt-6 text-indigo-500 text-xl font-medium tracking-wide">Loading...</p>
            </div>
        </div>
    );
}

export default Loding