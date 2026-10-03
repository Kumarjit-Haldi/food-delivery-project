import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white px-6 py-10">

      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-3xl font-bold text-blue-400 mb-4">
          About FoodNest
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto leading-7 mb-6">
          FoodNest is a smart food ordering platform that helps users
          discover delicious food, explore products and enjoy a simple
          and convenient ordering experience.
        </p>

        <Link
          to="/about"
          className="inline-block bg-blue-600 px-6 py-3 rounded-full
                     hover:bg-blue-700 hover:scale-105
                     transition-all duration-300"
        >
          Learn More
        </Link>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-5 text-center">
        <p className="text-gray-500 text-sm">
          © 2026 FoodNest. All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer