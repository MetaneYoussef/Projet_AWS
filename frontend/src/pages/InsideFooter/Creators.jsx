import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

function Creators() {
    return(
        <div className="bg-gradient-to-b from-black to-indigo-700">
            <Header />
            <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 bg-slate-800">

                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <div class="mx-auto max-w-2xl lg:mx-0">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">Our team</h2>
                    </div>
                    <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <li>
                        <img class="aspect-[1] w-1/2 md:w-full rounded-2xl object-cover" src="https://media.licdn.com/dms/image/D4E03AQGiyt7p9k-03w/profile-displayphoto-shrink_800_800/0/1707258960677?e=1718841600&v=beta&t=Fe9WGFI9SvCsWpOlg_wmB6OBkGtuBBAxrt5o96lllQs" alt=""/>
                        <h3 class="mt-6 text-base md:text-xl font-bold leading-8 mb-2 tracking-tight text-gray-200">Arun</h3>
                        <p class="text-xs md:text-base leading-7 text-gray-200">Actuellement étudiant en Master 1 Informatique, je me passionne pour le développement de solutions logicielles intelligentes et interactives. J'ai récemment participé à la création d'un jeu de Puissance 4 doté d'une intelligence artificielle, un projet enrichissant qui a aiguisé mes compétences en programmation et en travail d'équipe. Actuellement, je collabore avec trois de mes camarades sur un projet ambitieux : le développement d'un site web dédié aux films et séries. Ce projet vise à fusionner ma passion pour le cinéma avec mes compétences techniques, tout en explorant de nouvelles façons d'engager les utilisateurs avec du contenu multimédia.</p>
                        <ul role="list" class="mt-6 flex gap-x-6">
                        <li>

                        </li>
                        </ul>
                    </li>

                    <li>
                        <img class="aspect-[1] w-1/2 md:w-full rounded-2xl object-cover" src="https://media.licdn.com/dms/image/D4E03AQF58IxRzj3-Uw/profile-displayphoto-shrink_200_200/0/1711677652568?e=2147483647&v=beta&t=urziO8OwyJUt3I_bkXJbA3aL14pqkKtTDJQbooRgYcE" alt=""/>
                        <h3 class="mt-6 text-base md:text-xl font-bold leading-8 mb-2 tracking-tight text-gray-200">Jermissen</h3>
                        <p class="text-xs md:text-base leading-7 text-gray-200">*Description*</p>
                        <ul role="list" class="mt-6 flex gap-x-6">
                        <li>

                        </li>
                        </ul>
                    </li>

                    <li>
                        <img class="aspect-[1] w-1/2 md:w-full rounded-2xl object-cover" src="https://assets-fr.imgfoot.com/media/cache/1200x1200/erling-haaland-2324-xf.jpg" alt=""/>
                        <h3 class="mt-6 text-base md:text-xl font-bold leading-8 mb-2 tracking-tight text-gray-200">Sarra</h3>
                        <p class="text-xs md:text-base leading-7 text-gray-200">*Description*</p>
                        <ul role="list" class="mt-6 flex gap-x-6">
                        <li>

                           
                        </li>
                        </ul>
                    </li>

                    <li>
                        <img class="aspect-[1] w-1/2 md:w-full rounded-2xl object-cover" src="https://fr.hespress.com/wp-content/uploads/2024/04/hakimi-retour.jpg" alt=""/>
                        <h3 class="mt-6 text-base md:text-xl font-bold leading-8 mb-2 tracking-tight text-gray-200">Youssef</h3>
                        <p class="text-xs md:text-base leading-7 text-gray-200">*Description*</p>
                        <ul role="list" class="mt-6 flex gap-x-6">
                        <li>

                           
                        </li>
                        </ul>
                    </li>

                    </ul>
                </div>
            </div>
           
            <div className="bg-white"><Footer /></div>
        </div>


        
    );
};

export default Creators;