import React from 'react';
import { Link } from 'react-router-dom';
import { assets, footer_data } from '../assets/assets';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-pink-50 mt-10 text-gray-800 pt-12 pb-6 border-t border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Logo & Description */}
          <div className="md:w-1/3">
            <div className="flex items-center mb-4">
              <img src={assets.logo} alt="Logo" className="w-36 sm:w-44" />
            </div>
            <p className="text-sm text-gray-600">
              Welcome to our blog! Sharing insights, stories, and resources for curious minds.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-between w-full md:w-[60%] gap-y-8">
            {footer_data.map((section, index) => (
              <div key={index} className="min-w-[120px]">
                <h3 className="font-semibold text-base text-gray-900 mb-3">{section.title}</h3>
                <ul className="text-sm space-y-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to="#"
                        className="hover:text-primary hover:underline transition-colors duration-200"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-gray-300 mt-10 pt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Quickblog. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
