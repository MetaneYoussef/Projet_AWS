import React, { useState } from 'react';
import "./Bienvenue.css";

export default function Bienvenue() {
  return(
    <section class= "relative" style={{ backgroundImage: 'url("/images/SignUp_Background.png")' }}>
      <div class="py-8 px-4 lg:py-12 lg:px-4 mx-auto max-w-screen-xl text-center md:text-start">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <h1 className='relative text-4xl sm:text-5xl text-white font-bold mb-1'>Bienvenue,</h1>
        <h2 className='relative text-lg sm:text-2xl md:text-3xl text-white font-semibold'>Découvrez des millions de films, séries et acteurs...</h2>
        <div class="py-6 w-full">
          <div class="overflow-hidden z-0 rounded-full relative p-2">
            <form role="form" class="relative flex z-50 bg-white rounded-full">
              <input type="text" placeholder="Rechercher un film, une série, un acteur..." class="rounded-full flex-1 px-4 md:px-6 py-4 text-gray-700 focus:outline-none" />
              <button class="hidden sm:flex bg-gray-500 text-white rounded-full font-semibold px-8 py-4 hover:bg-indigo-400 focus:bg-gray-600 focus:outline-none">Rechercher</button>
              <button class="flex sm:hidden bg-gray-500 text-white rounded-full font-semibold px-7 py-4 hover:bg-indigo-400 focus:bg-gray-600 focus:outline-none">
                <svg class= "w-[20px] h-[25px] fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                </svg>
              </button>
            </form>
            <div class="glow glow-1 z-10 bg-indigo-700 absolute"></div>
            <div class="glow glow-2 z-20 bg-blue-600 absolute"></div>
            <div class="glow glow-3 z-30 bg-gray-400 absolute"></div>
            <div class="glow glow-4 z-40 bg-black absolute"></div>
          </div>
        </div>
      </div>
    </section>
  );
};