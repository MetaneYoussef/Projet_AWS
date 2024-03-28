import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/Header/QcmHeader";
import Footer from "../../components/Footer/Footer"

function Watchlist() {
    const [activeList, setActiveList] = useState('films'); // 'films' or 'series'

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className='bg-black text-center py-2 font-semibold text-2xl text-white'>
              <h1> MA WATCHLIST</h1>
            </div>
            <div className="flex justify-center border-2 border-black font-bold bg-black mb-4">
                <button
                    className={` w-1/4 px-4 py-2 rounded-l-lg ${activeList === 'films' ? 'bg-black text-white border-4 border-red-600' : 'bg-red-700 text-white brightness-125'}`}
                    onClick={() => setActiveList('films')}
                >
                    FILMS
                </button>
                <button
                    className={`w-1/4 px-4 py-2 rounded-r-lg ${activeList === 'series' ? 'bg-black text-white border-4 border-yellow-500 ' : 'bg-yellow-500 text-white border-4 border-yellow-500'}`}
                    onClick={() => setActiveList('series')}
                >
                    SERIES
                </button>
            </div>
            <main className="flex-grow">
                {activeList === 'films' ? (
                    <section id="films" className="p-4">
                        {/* Ici, tu pourrais mapper sur tes films et les afficher */}
                        <div>Films list...</div>
                    </section>
                ) : (
                    <section id="series" className="p-4">
                        {/* Ici, tu pourrais mapper sur tes séries et les afficher */}
                        <div>Series list...</div>
                    </section>
                )}
            </main>
            <div>
              <Footer />
            </div>
        </div>
    );
}

export default Watchlist;