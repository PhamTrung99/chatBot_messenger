const { getAllMovie } = require("../data/Movies.api");

const listGenericFilmCard = async() => {
    const arrdata = await getAllMovie();
    var arrCard = [];
    let i = 0;
    arrdata.forEach((obj)=>{
        let genericCard = { 
            "title": `"${title}"`,
            "image_url": `"${process.env.IMAGE_URL}${obj.poster_path}"`,
            "subtitle": `"${release_date}"`,
        }
        i++;
        if(i<9) arrCard.push(obj);
    })
    return arrCard;
}

module.exports = listGenericFilmCard;