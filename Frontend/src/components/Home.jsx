import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
const navigate = useNavigate();

const handleHomeSearch = () => {
  if (!searchTerm.trim()) {
    navigate("/search");
    return;
  }

  navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
};
  return <>

    {/* HERO SECTION */}
    <section className="relative min-h-[680px] overflow-hidden bg-slate-950 text-white">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>

      {/* Decorative circles */}
      <div className="absolute top-24 right-20 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-32 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="animate-[fadeIn_1s_ease-out]">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-7">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">
                Smart Food • AI Powered
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Smart Food.
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Better Choices.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg md:text-xl text-gray-400 leading-8">
              Discover delicious food, explore amazing flavours and enjoy
              a smarter and simpler food ordering experience with FoodNest.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-9">

              <a
                href="/products"
                className="group px-7 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                Explore Menu
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>

              <a
                href="/search"
                className="px-7 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md font-semibold text-gray-200 hover:bg-white/10 hover:border-orange-400/40 hover:-translate-y-1 transition-all duration-300"
              >
                🔍 Find Food
              </a>

            </div>

            {/* Small Stats */}
            <div className="flex flex-wrap gap-8 mt-12">

              <div>
                <p className="text-2xl font-bold">100+</p>
                <p className="text-sm text-gray-500">Food Choices</p>
              </div>

              <div className="w-px bg-white/10"></div>

              <div>
                <p className="text-2xl font-bold">4.8 ⭐</p>
                <p className="text-sm text-gray-500">User Rating</p>
              </div>

              <div className="w-px bg-white/10"></div>

              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-gray-500">Food Discovery</p>
              </div>

            </div>

          </div>


          {/* RIGHT FOOD DISPLAY */}
          <div className="relative flex justify-center items-center">

            {/* Main Circle */}
            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-br from-orange-500/20 via-white/5 to-blue-500/20 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl">

              {/* Inner Circle */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/30 hover:scale-105 transition-transform duration-500">

                <div className="text-[120px] md:text-[150px] hover:scale-110 hover:rotate-6 transition-all duration-500">
                  🍔
                </div>

              </div>

              {/* Floating Pizza */}
              <div className="absolute -top-5 right-5 md:right-0 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-4xl shadow-xl animate-bounce">
                🍕
              </div>

              {/* Floating Biryani */}
              <div className="absolute bottom-0 -left-5 md:-left-10 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-4xl shadow-xl animate-pulse">
                🍛
              </div>

              {/* Floating Fries */}
              <div className="absolute top-1/2 -right-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-3xl shadow-xl">
                🍟
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>


    {/* SEARCH SECTION */}
    <section className="relative bg-white py-16">

      <div className="max-w-5xl mx-auto px-6">

        <div className="relative bg-slate-950 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">

          <div className="absolute -right-20 -top-20 w-60 h-60 bg-orange-500/20 rounded-full blur-3xl"></div>

          <div className="relative text-center">

            <p className="text-orange-400 font-semibold uppercase tracking-widest text-sm">
              Find Your Favourite
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
              What are you craving today?
            </h2>

            <p className="text-gray-400 mt-3">
              Search for your favourite food and discover something delicious.
            </p>

            <div className="max-w-2xl mx-auto mt-7 flex flex-col sm:flex-row gap-3">

              <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-5 py-4">

  <span className="text-xl">🔍</span>

  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleHomeSearch();
      }
    }}
    placeholder="Search burgers, pizza, biryani..."
    className="w-full bg-transparent outline-none text-white placeholder-gray-500"
  />

</div>

<button
  type="button"
  onClick={handleHomeSearch}
  className="px-7 py-4 rounded-xl bg-orange-500 font-bold hover:bg-orange-600 hover:scale-105 transition-all duration-300"
>
  Search
</button>

          

            </div>

          </div>

        </div>

      </div>

    </section>


    {/* WHY FOODNEST */}
    <section className="bg-gray-50 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
            Why FoodNest
          </p>

          <h2 className="text-4xl font-extrabold text-gray-900 mt-3">
            More Than Just Food
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Everything you need for a smooth, smart and enjoyable food
            ordering experience.
          </p>

        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* CARD 1 */}
          <div className="group bg-white p-7 rounded-3xl border border-gray-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              🤖
            </div>

            <h3 className="text-xl font-bold mt-6">
              AI Recommendations
            </h3>

            <p className="text-gray-500 mt-3 leading-7">
              Discover food suggestions based on your preferences.
            </p>

          </div>


          {/* CARD 2 */}
          <div className="group bg-white p-7 rounded-3xl border border-gray-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              ⚡
            </div>

            <h3 className="text-xl font-bold mt-6">
              Fast Ordering
            </h3>

            <p className="text-gray-500 mt-3 leading-7">
              Find your favourite meals and order them easily.
            </p>

          </div>


          {/* CARD 3 */}
          <div className="group bg-white p-7 rounded-3xl border border-gray-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              🔒
            </div>

            <h3 className="text-xl font-bold mt-6">
              Secure Experience
            </h3>

            <p className="text-gray-500 mt-3 leading-7">
              Enjoy a simple and secure experience while using FoodNest.
            </p>

          </div>


          {/* CARD 4 */}
          <div className="group bg-white p-7 rounded-3xl border border-gray-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              🚚
            </div>

            <h3 className="text-xl font-bold mt-6">
              Easy Tracking
            </h3>

            <p className="text-gray-500 mt-3 leading-7">
              Keep track of your orders from one convenient place.
            </p>

          </div>

        </div>

      </div>

    </section>


    {/* HOW IT WORKS */}
    <section className="bg-white py-20">

      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
            Simple Process
          </p>

          <h2 className="text-4xl font-extrabold text-gray-900 mt-3">
            How FoodNest Works
          </h2>

        </div>


        <div className="grid md:grid-cols-4 gap-8">

          <div className="text-center group">
            <div className="mx-auto w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-4xl group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
              🔍
            </div>
            <h3 className="font-bold text-xl mt-5">Discover</h3>
            <p className="text-gray-500 mt-2">
              Explore delicious food.
            </p>
          </div>


          <div className="text-center group">
            <div className="mx-auto w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
              🍔
            </div>
            <h3 className="font-bold text-xl mt-5">Choose</h3>
            <p className="text-gray-500 mt-2">
              Select your favourite.
            </p>
          </div>


          <div className="text-center group">
            <div className="mx-auto w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-4xl group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300">
              🛒
            </div>
            <h3 className="font-bold text-xl mt-5">Order</h3>
            <p className="text-gray-500 mt-2">
              Add to cart and order.
            </p>
          </div>


          <div className="text-center group">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
              😋
            </div>
            <h3 className="font-bold text-xl mt-5">Enjoy</h3>
            <p className="text-gray-500 mt-2">
              Enjoy your delicious meal.
            </p>
          </div>

        </div>

      </div>

    </section>


    {/* AI SECTION */}
    <section className="relative bg-slate-950 text-white py-20 overflow-hidden">

      <div className="absolute -left-32 top-10 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-32 bottom-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>

            <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold">
              🤖 FoodNest AI
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold mt-6 leading-tight">
              Not sure what
              <span className="text-orange-400"> to eat?</span>
            </h2>

            <p className="text-gray-400 text-lg leading-8 mt-5">
              Let FoodNest help you discover something delicious.
              Find food recommendations and explore new flavours.
            </p>

            <a
              href="/ai"
              className="inline-block mt-8 px-7 py-4 rounded-xl bg-orange-500 font-bold hover:bg-orange-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            >
              Ask FoodNest AI  →
            </a>

          </div>


          <div className="flex justify-center">

            <div className="relative w-72 h-72 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-500">

              <div className="text-8xl animate-pulse">
                🤖
              </div>

              <div className="absolute -top-5 -right-5 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-sm">
                Smart Choice ✨
              </div>

              <div className="absolute -bottom-5 -left-5 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-sm">
                Delicious 🍕
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>


    {/* FINAL CTA */}
    <section className="bg-gray-50 py-20">

      <div className="max-w-5xl mx-auto px-6">

        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white text-center px-6 py-16 shadow-2xl">

          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative">

            <p className="text-orange-100 uppercase tracking-widest text-sm font-semibold">
              Your next meal is waiting
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
              Ready to satisfy your cravings?
            </h2>

            <p className="max-w-2xl mx-auto text-orange-100 mt-5 text-lg">
              Explore delicious food and start your FoodNest journey today.
            </p>

            <a
              href="/products"
              className="inline-block mt-8 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Explore Food →
            </a>

          </div>

        </div>

      </div>

    </section>


    {/* ORIGINAL HOME MESSAGE - DESIGN VERSION */}
    <p className="hidden">
      this is home page
    </p>

  </>
}

export default Home