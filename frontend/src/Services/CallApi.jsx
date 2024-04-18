import axios from "axios";


const movieBaseUrl = 'https://api.themoviedb.org/3'
const api_key = "433cffe8b54a391f4a13ca5bc5baa0d0"

const getVideos = axios.get(`${movieBaseUrl}/trending/all/day?api_key=${api_key}`)

const movieByGenreBaseURL='https://api.themoviedb.org/3/discover/movie?api_key=';

const getMovieById=(id)=>
    axios.get(`${movieByGenreBaseURL}&with_genres=${id}`)

export default {getVideos, getMovieById};