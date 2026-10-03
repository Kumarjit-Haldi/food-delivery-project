import React from 'react'

const SearchBar = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO SEARCH SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white">

        {/* Background Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>

        {/* Floating Elements */}
        <div className="absolute top-24 left-[12%] text-3xl animate-bounce opacity-70">
          🍕
        </div>

        <div className="absolute top-32 right-[15%] text-3xl animate-pulse opacity-70">
          🍔
        </div>

        <div className="absolute bottom-16 left-[20%] text-2xl animate-bounce opacity-60">
          🍟
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">

          <div className="text-center max-w-4xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-7">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
              <span className="text-sm text-gray-300 font-medium">
                Discover Your Next Favourite
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              What are you
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                craving today?
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-gray-400 leading-8">
              Search for delicious food, discover new flavours and find
              something perfect for your next meal.
            </p>

            {/* SEARCH BOX */}
            <div className="max-w-3xl mx-auto mt-10">

              <div className="group relative flex flex-col sm:flex-row gap-3 p-2 bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl hover:border-orange-500/40 transition-all duration-500">

                {/* Input */}
                <div className="flex-1 flex items-center gap-3 px-5 py-3">

                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    🔍
                  </span>

                  <input
                    type="text"
                    placeholder="Search burgers, pizza, biryani..."
                    className="w-full bg-transparent outline-none text-white placeholder-gray-500 text-lg"
                  />

                </div>

                {/* Search Button */}
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 font-bold text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all duration-300">
                  Search →
                </button>

              </div>

            </div>

            {/* Quick Searches */}
            <div className="flex flex-wrap justify-center gap-3 mt-7">

              <span className="text-gray-500 text-sm py-2">
                Popular:
              </span>

              <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300">
                🍔 Burger
              </button>

              <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300">
                🍕 Pizza
              </button>

              <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300">
                🍗 Biryani
              </button>

              <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300">
                🍝 Pasta
              </button>

            </div>

          </div>

        </div>
      </section>


      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">

          <div>
            <p className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
              Explore
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Browse Categories
            </h2>

            <p className="text-gray-500 mt-3">
              Find exactly what you are in the mood for.
            </p>
          </div>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {/* Category 1 */}
          <div className="group cursor-pointer bg-white rounded-3xl p-7 border border-gray-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center text-5xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              🍔
            </div>

            <h3 className="text-center text-lg font-bold mt-5">
              Burgers
            </h3>

            <p className="text-center text-gray-400 text-sm mt-1">
              Juicy & delicious
            </p>

          </div>


          {/* Category 2 */}
          <div className="group cursor-pointer bg-white rounded-3xl p-7 border border-gray-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-red-50 flex items-center justify-center text-5xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              🍕
            </div>

            <h3 className="text-center text-lg font-bold mt-5">
              Pizza
            </h3>

            <p className="text-center text-gray-400 text-sm mt-1">
              Hot & cheesy
            </p>

          </div>


          {/* Category 3 */}
          <div className="group cursor-pointer bg-white rounded-3xl p-7 border border-gray-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-yellow-50 flex items-center justify-center text-5xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              🍗
            </div>

            <h3 className="text-center text-lg font-bold mt-5">
              Biryani
            </h3>

            <p className="text-center text-gray-400 text-sm mt-1">
              Rich & flavourful
            </p>

          </div>


          {/* Category 4 */}
          <div className="group cursor-pointer bg-white rounded-3xl p-7 border border-gray-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-50 flex items-center justify-center text-5xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              🍝
            </div>

            <h3 className="text-center text-lg font-bold mt-5">
              Pasta
            </h3>

            <p className="text-center text-gray-400 text-sm mt-1">
              Creamy & tasty
            </p>

          </div>

        </div>

      </section>


      {/* TRENDING SEARCHES */}
      <section className="bg-gray-100 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
              Trending Now
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              Popular Searches 🔥
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-6">

            <div className="group bg-white rounded-3xl p-7 shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

              <div className="flex items-center justify-between">

                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  🍔
                </div>

                <span className="text-xs font-bold text-orange-500 bg-orange-50 px-3 py-2 rounded-full">
                  TRENDING
                </span>

              </div>

              <h3 className="text-xl font-bold mt-6">
                Classic Burger
              </h3>

              <p className="text-gray-500 mt-2">
                A timeless favourite for burger lovers.
              </p>

            </div>


            <div className="group bg-white rounded-3xl p-7 shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

              <div className="flex items-center justify-between">

                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  🍕
                </div>

                <span className="text-xs font-bold text-orange-500 bg-orange-50 px-3 py-2 rounded-full">
                  POPULAR
                </span>

              </div>

              <h3 className="text-xl font-bold mt-6">
                Cheese Pizza
              </h3>

              <p className="text-gray-500 mt-2">
                Loaded with delicious melted cheese.
              </p>

            </div>


            <div className="group bg-white rounded-3xl p-7 shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

              <div className="flex items-center justify-between">

                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  🍗
                </div>

                <span className="text-xs font-bold text-orange-500 bg-orange-50 px-3 py-2 rounded-full">
                  HOT
                </span>

              </div>

              <h3 className="text-xl font-bold mt-6">
                Chicken Biryani
              </h3>

              <p className="text-gray-500 mt-2">
                Rich spices and unforgettable flavour.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* AI FOOD SEARCH */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-24">

        <div className="absolute -left-32 top-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -right-32 bottom-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-14 items-center">

            <div>

              <span className="inline-flex px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold">
                🤖 FoodNest AI
              </span>

              <h2 className="text-4xl md:text-5xl font-extrabold mt-6 leading-tight">
                Search less.
                <span className="block text-orange-400">
                  Discover more.
                </span>
              </h2>

              <p className="text-gray-400 text-lg leading-8 mt-5">
                Not sure what to eat? FoodNest is designed to help you
                discover delicious choices based on what you are looking for.
              </p>

              <button className="mt-8 px-7 py-4 rounded-xl bg-orange-500 font-bold hover:bg-orange-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300">
                Discover Something New →
              </button>

            </div>


            <div className="flex justify-center">

              <div className="relative w-72 h-72 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-500">

                <div className="text-8xl animate-pulse">
                  🤖
                </div>

                <div className="absolute -top-5 -right-5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-sm animate-bounce">
                  Smart Search ✨
                </div>

                <div className="absolute -bottom-5 -left-5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-sm">
                  Find Food 🍕
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

            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative">

              <h2 className="text-4xl md:text-5xl font-extrabold">
                Your next favourite meal
                <span className="block text-orange-100">
                  is waiting for you.
                </span>
              </h2>

              <p className="max-w-xl mx-auto mt-5 text-orange-100 text-lg">
                Explore FoodNest and discover something delicious today.
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

    </div>
  )
}

export default SearchBar