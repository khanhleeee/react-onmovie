const mssql = require('mssql');

const Genre = require('../models/Genre');
const sqlConfig = require('../database/dbConnection');

module.exports = {
    getGenre: async (req, res) => {
        try {
            await mssql.connect(sqlConfig);
            const request = new mssql.Request();
            const result = await request.query('SELECT FILMS.F_ID, FILMS.F_NAME, FILMS.F_DESC, FILMS.F_RELEASEYEAR, FILMS.F_AVGRATING, FILMS.F_LIMITEDAGE, FILMS.C_ID, FILMS.S_ID, FILM_GENRES.G_ID FROM FILMS, FILM_GENRES WHERE FILMS.F_ID = FILM_GENRES.F_ID');
            // const result = await request.execute('getFilm'); 
            // console.log(result);
            res.status(200).json(result.recordset);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }, 
    
};

// createMovie: async (req, res) => {
    //     try {
    //         await mssql.connect(sqlConfig);
    //         const request = new mssql.Request();
    //         const { idphong, tenphong, giaphong } = req.body;
    //         const movie = new Movie(idphong, tenphong, giaphong);
    //         const result = await request.query(`INSERT INTO phong VALUES ('${movie.idphong}', '${movie.tenphong}', '${movie.giaphong}')`);
    //         console.log(result);
    //         res.status(200).json(result);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // }
// const updateMovie = async(req, res) => {
//     if (req.user.isAdmin) {
//         try {
//             await Movie.findByIdAndUpdate(req.params.id, req.body);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     } else {
//         res.status(403).json("You are not allowed!");
//     }
// }

// const deleteMovie = async(req, res) => {
//     if (req.user.isAdmin) {
//         try {
//             await Movie.findByIdAndUpdate(req.params.id, { isDestroy: true });
//             res.status(200).json("Delete movie successfully!");
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     } else {
//         res.status(403).json("You are not allowed!");
//     }
// }

// const findMovie = async(req, res) => {
//     try {
//         const movie = await Movie.findById(req.params.id);
//         res.status(200).json(movie);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

// const searchMovie = async(req, res) => {
//     const q = req.query.q;
//     let movie = await Movie.find();
//     if (q) {
//         result = movie.filter((m) => {
//             return m.title.toLowerCase().indexOf(q.toLowerCase()) !== -1 || m.year.toLowerCase().indexOf(q.toLowerCase()) !== -1 || m.limit.toLowerCase().indexOf(q.toLowerCase()) !== -1 || m.genre.toLowerCase().indexOf(q.toLowerCase()) !== -1
//         })
//         res.status(200).json(result);
//     } else {
//         res.status(203).json([]);
//     }
// }

// const findAllMovie = async(req, res) => {
//     if (req.user.isAdmin) {
//         try {
//             const movies = await Movie.find();
//             res.status(200).json(movies.reverse());
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     } else {
//         res.status(403).json("You are not allowed!");
//     }
// }

// const findRandomMovie = async(req, res) => {
//     const type = req.query.type;
//     let movie;
//     try {
//         if (type === "series") {
//             movie = await Movie.aggregate([
//                 { $match: { isSeries: true } },
//                 { $sample: { size: 1 } },
//             ]);
//         } else {
//             movie = await Movie.aggregate([
//                 { $match: { isSeries: false } },
//                 { $sample: { size: 1 } },
//             ]);
//         }
//         res.status(200).json(movie);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

