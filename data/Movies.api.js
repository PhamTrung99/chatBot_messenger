const axios = require("axios").default;

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



module.exports = {getAllMovie};