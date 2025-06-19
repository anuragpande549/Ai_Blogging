import React from 'react';
import { Link } from 'react-router-dom';
import { assets, footer_data } from '../assets/assets';

const Footer = () => {
    return (
        <footer className="bg-pink-50 mt-5 text-gray-900 pt-10 pb-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:justify-between gap-8">
                    {/* Logo & Description */}
                    <div className="md:w-1/4">
                        <div className="flex items-center mb-3">
                            <img src={assets.logo} alt="" className='w-32 sm:w-44'/>
                        
                        </div>
                        <p className="text-gray-400 text-sm">
                            Welcome to our blog! Sharing insights, stories, and resources for curious minds.
                        </p>
                    </div>
                    {/* Quick Links */}
                    <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
                        {footer_data.map((section, index)=>(
                            <div key={index}>
                                <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
                                <ul className='text-sm space-y-1'>
                                    {section.links.map((link,i)=>(
                                        <li key={i}>
                                            <Link to={"#"} className='hover:underline transition'>{link}</Link>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Quickblog. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
