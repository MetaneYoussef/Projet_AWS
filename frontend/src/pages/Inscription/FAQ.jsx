import React from 'react';

function FAQ() {

  return(
    <div className='bg-black'>
      <div
      class="relative my-10 bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10">
      <div class="mx-auto px-5">
        <div class="flex flex-col items-center">
          <h2 class="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">FAQ</h2>
          <p class="mt-3 text-lg text-neutral-500 md:text-xl">Foire aux Questions</p>
        </div>
        <div class="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
          <div class="py-5">
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span>What You Watched (WYW), qu'est-ce que c'est ?</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="group-open:animate-fadeIn mt-3 text-neutral-600"> What You Watched (WYW) est un
                  site d'historique de visionnage, permettant de créer votre propre watchlist, noter vos films et séries
                  préfèrées et ne plus jamais oublier ce que vous vouliez regarder.
                </p>
              </details>
          </div>
          <div class="py-5">
            <details class="group">
              <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                <span> Combien coûte What You Watched ?</span>
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                  </span>
              </summary>
              <p class="group-open:animate-fadeIn mt-3 text-neutral-600">What You Watched est un service
              en ligne gratuit.
              </p>
            </details>
          </div>
          <div class="py-5">
            <details class="group">
              <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span> Quand a été créé What You Watched ?</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
              </summary>
              <p class="group-open:animate-fadeIn mt-3 text-neutral-600">Le site a été lancé en mai 2024.
              </p>
            </details>
          </div>
          <div class="py-5">
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span> Is there a free trial?</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="group-open:animate-fadeIn mt-3 text-neutral-600">We offer a free trial of our software
                  for a limited time. During the trial period, you will have access to a limited set of
                  features and functionality, but you will not be charged.
                </p>
              </details>
          </div>
          <div class="py-5">
            <details class="group">
              <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span> Comment je contacte le support ?</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
              </summary>
              <p class="group-open:animate-fadeIn mt-3 text-neutral-600">Si vous avez besoin d'aide avec notre plateforme ou
                si vous avez d'autres questions, vous pouvez contacter l'équipe d'assistance en soumettant un rapport via la
                section "Contact" au pied de la page du site Web ou par e-mail à cestjusteunprojet@wyw.com.
              </p>
            </details>
          </div>
          <div class="py-5">
            <details class="group">
              <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                <span> Do you offer any discounts or promotions?</span>
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p class="group-open:animate-fadeIn mt-3 text-neutral-600">We may offer discounts or promotions
                from time to time. To stay up-to-date on the latest deals and special offers, you can sign
                up for the company's newsletter or follow it on social media.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default FAQ;