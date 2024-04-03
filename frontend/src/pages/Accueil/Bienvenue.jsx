import React, { useState } from 'react';
import "./Bienvenue.css";

export default function Bienvenue() {
  return(
    <section class= "relative" style={{ backgroundImage: 'url("/images/SignUp_Background.png")' }}>
      <div class="py-8 px-4 lg:py-12 lg:px-4 mx-auto max-w-screen-xl text-center md:text-start">
      <div className="absolute inset-0 bg-black opacity-60"></div>
        <h1 className='relative text-5xl text-white font-bold'>Bienvenue,</h1>
        <h2 className='relative text-2xl md:text-3xl text-white font-semibold'>Découvrez des millions de films, séries et acteurs...</h2>
        <div class="py-6 w-full">
          <div class="overflow-hidden z-0 rounded-full relative p-2">
            <form role="form" class="relative flex z-50 bg-white rounded-full">
              <input type="text" placeholder="Rechercher un film, une série, un acteur..." class="rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none" />
              <button class="bg-gray-500 text-white rounded-full font-semibold px-8 py-4 hover:bg-indigo-400 focus:bg-gray-600 focus:outline-none">Rechercher</button>
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