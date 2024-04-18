import axios from "axios";

{/*CONSTANTES NECESSAIRES AUX APPELS D'API*/}
const movieBaseUrl = 'https://api.themoviedb.org/3'
const api_key = "433cffe8b54a391f4a13ca5bc5baa0d0"

{/*APPEL D'API POUR LA GRANDE BANNIERE DE CHAQUE PAGE*/}
const getVideos = axios.get(`${movieBaseUrl}/trending/all/day?api_key=${api_key}`)
const getMoviesSlider = axios.get(`${movieBaseUrl}/trending/movie/week?api_key=${api_key}`)
const getSeriesSlider = axios.get(`${movieBaseUrl}/trending/tv/week?api_key=${api_key}`)

{/*APPEL D'API POUR LES FILMS CLASSÉS PAR GENRE*/}
const movieByGenreBaseURL='https://api.themoviedb.org/3/discover/movie?api_key=';
const getMovieById=(id)=> axios.get(`${movieByGenreBaseURL}&with_genres=${id}`)

{/*APPEL D'API POUR LES SERIES CLASSÉES PAR GENRE*/}
const seriesByGenreBaseURL='https://api.themoviedb.org/3/discover/movie?api_key=';
const getSeriesById=(id)=> axios.get(`${seriesByGenreBaseURL}&with_genres=${id}`)

export default {getVideos, getMoviesSlider, getSeriesSlider,
                getMovieById, getSeriesById};