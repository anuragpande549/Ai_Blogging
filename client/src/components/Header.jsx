import React from 'react'
import { assets } from '../assets/assets'

function Header() {
return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-20 mb-8'>
            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4
                border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                <p>New: Ai feature integration</p>
                <img src={assets.star_icon} alt="star-icon" className='w-2.5' />
            </div>
            <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
                Your <span className='text-primary'>AI-powered</span> blogging platform
            </h1>
            <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
                Create, share, and discover amazing stories with ease. Experience seamless writing, powerful AI tools, and a vibrant community—all in one place.
            </p>
            {/* <button className='mt-4 px-8 py-3 bg-primary text-white rounded-full font-semibold shadow hover:bg-primary/90 transition'>
                Start Writing with AI
            </button> */}

            <form className='flex items-center justify-center gap-2 max-w-md mx-auto mt-6'>
                <input
                    type="text"
                    placeholder='Search for blogs'
                    required
                    className='flex-1 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition text-sm'
                />
                <button
                    type='submit'
                    className='px-6 py-2 bg-primary text-white rounded-r-full font-semibold shadow hover:bg-primary/90 transition text-sm'
                >
                    Search
                </button>
            </form>
        </div>
        <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
    </div>
)
}

export default Header