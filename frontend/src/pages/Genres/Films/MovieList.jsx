import { useEffect, useRef, useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import callApi from '../../../Services/CallApi';
import Card from './MovieCard';

function MovieList({genreId,indexId}) {
    const [movieList,setMovieList]=useState([])
    const elementRef=useRef(null);
    useEffect(()=>{
        getMovieByGenreId();
    },[])

    const getMovieByGenreId=()=>{
        callApi.getMoviesSlider.then(resp=>{
          setMovieList(resp.data.results)
        })
    }

  return (
    <div className='relative'>   
    <div ref={elementRef} className='grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 p-4'>
        {movieList.map((item,index)=>(
          <Card key={index} movie={item}/>
        ))}
    </div>
    </div>
  )
}

export default MovieList