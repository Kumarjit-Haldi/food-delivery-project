import React from "react";

export const About = (props) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-hidden">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">

        {/* Background Animation */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">

          <p className="text-blue-100 uppercase tracking-widest text-sm font-semibold mb-3 animate-[fadeIn_1s_ease-out]">
            Welcome to FoodNest
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight hover:scale-[1.02] transition-transform duration-500">
            Smarter Food Choices.
            <br />
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Better Experiences.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-blue-100 leading-8">
            FoodNest is a smart food ordering platform designed to make
            discovering, ordering and enjoying your favourite food easier.
          </p>

        </div>
      </section>


      {/* Who We Are */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="hover:-translate-y-2 transition-all duration-500">

            <span className="text-blue-600 font-semibold uppercase tracking-wide">
              Who We Are
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
              More Than Just Food Delivery
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              FoodNest is a modern food ordering platform that combines
              technology, convenience and intelligent recommendations to
              create a better food ordering experience.
            </p>

            <p className="text-gray-600 leading-8">
              From discovering delicious meals to tracking your order,
              FoodNest brings everything together in one simple platform.
            </p>

          </div>


          {/* Feature Card */}
          <div className="group bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

            <div className="text-5xl mb-5 inline-block group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
              🍔
            </div>

            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">
              Your Food. Your Choice.
            </h3>

            <p className="text-gray-600 leading-7">
              Discover restaurants, explore menus, get smart recommendations
              and place your order with ease.
            </p>

          </div>

        </div>

      </section>


      {/* Why FoodNest */}
      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <span className="text-blue-600 font-semibold uppercase tracking-wide">
              Why FoodNest
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Everything You Need
            </h2>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1 */}
            <div className="group p-7 rounded-2xl bg-gray-50 border border-gray-100 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-200 transition-all duration-500">

              <div className="text-4xl mb-5 inline-block group-hover:scale-125 group-hover:-rotate-6 transition-all duration-500">
                🤖
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">
                AI Recommendations
              </h3>

              <p className="text-gray-600 leading-6">
                Get intelligent food suggestions based on your preferences
                and interests.
              </p>

            </div>


            {/* Card 2 */}
            <div className="group p-7 rounded-2xl bg-gray-50 border border-gray-100 hover:-translate-y-3 hover:shadow-2xl hover:border-purple-200 transition-all duration-500">

              <div className="text-4xl mb-5 inline-block group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                💬
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors duration-300">
                AI Food Assistant
              </h3>

              <p className="text-gray-600 leading-6">
                Ask questions and discover food using an intelligent
                conversational assistant.
              </p>

            </div>


            {/* Card 3 */}
            <div className="group p-7 rounded-2xl bg-gray-50 border border-gray-100 hover:-translate-y-3 hover:shadow-2xl hover:border-green-200 transition-all duration-500">

              <div className="text-4xl mb-5 inline-block group-hover:scale-125 group-hover:-rotate-6 transition-all duration-500">
                📍
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors duration-300">
                Smart Tracking
              </h3>

              <p className="text-gray-600 leading-6">
                Stay updated with your order status from confirmation
                to delivery.
              </p>

            </div>


            {/* Card 4 */}
            <div className="group p-7 rounded-2xl bg-gray-50 border border-gray-100 hover:-translate-y-3 hover:shadow-2xl hover:border-orange-200 transition-all duration-500">

              <div className="text-4xl mb-5 inline-block group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                ⭐
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors duration-300">
                Reviews & Ratings
              </h3>

              <p className="text-gray-600 leading-6">
                Share your experience and discover highly-rated food
                and restaurants.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-12">

          <span className="text-blue-600 font-semibold uppercase tracking-wide">
            Simple Process
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            How FoodNest Works
          </h2>

        </div>


        <div className="grid md:grid-cols-4 gap-6">

          <div className="group text-center hover:-translate-y-2 transition-all duration-500">

            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
              1
            </div>

            <h3 className="font-bold text-xl mt-5">
              Discover
            </h3>

            <p className="text-gray-600 mt-2">
              Explore restaurants and delicious meals.
            </p>

          </div>


          <div className="group text-center hover:-translate-y-2 transition-all duration-500">

            <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl font-bold group-hover:bg-purple-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
              2
            </div>

            <h3 className="font-bold text-xl mt-5">
              Choose
            </h3>

            <p className="text-gray-600 mt-2">
              Select your favourite food and add it to cart.
            </p>

          </div>


          <div className="group text-center hover:-translate-y-2 transition-all duration-500">

            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl font-bold group-hover:bg-green-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
              3
            </div>

            <h3 className="font-bold text-xl mt-5">
              Order
            </h3>

            <p className="text-gray-600 mt-2">
              Place your order securely and easily.
            </p>

          </div>


          <div className="group text-center hover:-translate-y-2 transition-all duration-500">

            <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-bold group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
              4
            </div>

            <h3 className="font-bold text-xl mt-5">
              Enjoy
            </h3>

            <p className="text-gray-600 mt-2">
              Track your order and enjoy your meal.
            </p>

          </div>

        </div>

      </section>


      


      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">

        <div className="text-5xl mb-5 inline-block hover:scale-125 hover:rotate-12 transition-all duration-500 cursor-default">
          ❤️
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-5">
          Our Mission
        </h2>

        <p className="text-gray-600 text-lg leading-8">
          Our mission is to make food ordering smarter, faster and more
          enjoyable by bringing modern technology and great food together
          in one platform.
        </p>

      </section>


      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">

        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:scale-105 transition-transform duration-500">
            Ready to Explore FoodNest?
          </h2>

          <p className="text-blue-100 mb-7">
            Discover your next favourite meal today.
          </p>

          <a
            href="/products"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-full hover:scale-110 hover:shadow-2xl transition-all duration-300"
          >
            Explore Food
          </a>

        </div>

      </section>

    </div>
  );
};

export default About;