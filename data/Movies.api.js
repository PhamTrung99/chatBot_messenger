const axios = require("axios").default;
require('dotenv').config();

const getAllMovie = async () => {
    var result = [];
    await axios({
        method: 'get',
        url: process.env.URL+`movie/popular?api_key=${process.env.MOVIE_API_KEY}`,
      })
        .then((res) => {
            result = res.data.results;
        });
    return result;
}

const searchMovie = async(strSearch) =>{
    var result = [];
    await axios({
        method: 'get',
        url: process.env.URL+`search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${strSearch}`,
      })
        .then((res) => {
            result = res.data.results;
        });
    return result;
}


module.exports = {getAllMovie,searchMovie};