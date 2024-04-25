import React, { useEffect, useRef, useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import callApi from '../../../../Services/CallApi';
import Card from '../../../../components/MoviesTvCard/Card';


function SeriesList({ apiPath, sort }) {
    const [seriesList, setSeriesList] = useState([]);
    const elementRef = useRef(null);

    useEffect(() => {
      const fetchSeries = async () => {
        try {
          const resp = await callApi.getMovieTVBaseURL(apiPath, sort);
          setSeriesList(resp.data.results);
        } catch (err) {
            console.error("Erreur lors de la récupération des séries par genre", err);
        }
      }
      fetchSeries();
    }, [apiPath, sort]);

    const slideRight = (element) => {
        element.scrollLeft += 1400;
    };
    const slideLeft = (element) => {
        element.scrollLeft -= 1395;
    };

    return (
      <div className='relative'>
          <IoChevronBackOutline onClick={() => slideLeft(elementRef.current)}
              className={`text-[50px] text-white p-2 z-20 cursor-pointer hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2`}
          />
          <div ref={elementRef} className='flex overflow-x-auto gap-2 md:gap-6 scrollbar-hide scroll-smooth py-4 px-3'>
              {seriesList.map((item, index) => (
                  <Card key={index} movie={item} />
              ))}
          </div>
          <IoChevronForwardOutline onClick={() => slideRight(elementRef.current)}
              className={`text-[50px] text-white p-2 cursor-pointer hidden md:block z-20 absolute right-0 top-1/2 transform -translate-y-1/2`}
          />
      </div>
  );
}

export default SeriesList;