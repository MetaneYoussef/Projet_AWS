import React from "react";

function Error403Page() {
  return(
    <div>
      <body class="flex flex-col h-screen justify-center items-center bg-gray-100">
        <div class="flex flex-col items-center">
          <h1 class="text-[240px] font-extrabold text-gray-500">403</h1>
          <p class="text-2xl font-medium text-gray-600 mb-6">ACCES NON AUTORISÉ !</p>
          <a href="/"
            class="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out">
            Retourner sur la page d'accueil
          </a>
        </div>
      </body>
    </div>
  );
};

export default Error403Page;