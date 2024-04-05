import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const About1 = () => {
  return (
    <div>
      <Header />
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 bg-slate-600">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl text-center font-bold leading-9 shadow-md shadow-gray-400 text-white pb-4 mb-2">A Propos de Nous</h1>
            <p className="font-normal text-center text-base leading-6 text-white ">Dans le cadre d'un projet de groupe ambitieux, nous, quatre passionnés, avons pris l'initiative de contribuer au monde des plateformes de streaming d'une manière unique. Notre objectif était de créer un site web qui se démarque, en offrant une expérience utilisateur fluide et inégalée. 
            Pour enrichir encore cette expérience, nous avons intégré un système de quiz à choix multiples, conçu pour ne jamais être à court d'envie de regarder un nouveau film ou série chez soi.
            Ce projet représente un accès sans précédent à une culture cinématographique et télévisuelle variée.</p>
          </div>
          <div className="w-full lg:w-8/12 ">
            <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="A group of People" />
          </div>
        </div>

        <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 shadow-md shadow-gray-400 text-white pb-4 mb-2">Our Story</h1>
            <p className="font-normal text-base leading-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from</p>
          </div>
          <div className="w-full lg:w-8/12 lg:pt-8">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img className="md:block hidden" src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png" alt="Alexa featured Img" />
                <img className="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa featured Img" />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Youcef</p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img className="md:block hidden" src="https://i.ibb.co/fGmxhVy/Rectangle-119.png" alt="Olivia featured Img" />
                <img className="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia featured Img" />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Sarah</p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img className="md:block hidden" src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png" alt="Liam featued Img" />
                <img className="md:hidden block" src="https://i.ibb.co/C5MMBcs/Rectangle-120.png" alt="Liam featued Img" />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Arun</p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img className="md:block hidden" src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png" alt="Elijah featured img" />
                <img className="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah featured img" />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Jermissen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white"><Footer /></div>
    </div>
  );
};

export default About1;
