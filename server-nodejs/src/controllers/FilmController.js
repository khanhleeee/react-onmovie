const mssql = require('mssql');

const Film = require('../models/Film');
const sqlConfig = require('../database/dbConnection');

module.exports = {
    getFilmList: async (req, res) => {
        try {
            await mssql.connect(sqlConfig);
            const request = new mssql.Request();
            query = `SELECT * FROM Films`;
            const result = await request.query(query);
            // let data;
            // for (i = 0; i < result.recordset.length; i++) {
            //     console.log(result.recordset[i].G_NAME);
            //     obj = {
            //         F_ID: result.recordset[i].F_ID, 
            //         F_NAME: result.recordset[i].F_NAME,
            //         C_ID: result.recordset[i].C_ID,
            //         S_ID: result.recordset[i].S_ID,
            //         G_NAME: []
            //     };
            //     console.log(obj.F_ID != result.recordset[i].F_ID)
            //     if (obj.F_ID != result.recordset[i].F_ID) {
            //         obj.G_NAME.push(result.recordset[i].G_NAME);
            //     }

                // console.log(result.recordset[i].G_NAME != result.recordset[i+1].G_NAME)
                // if (result.recordset[i].G_NAME != result.recordset[i+1].G_NAME) {
                //     obj.G_NAME.push(result.recordset[i].G_NAME);
                // }
                // console.log(obj);
            // }
            // const result = await request.execute('getFilm'); 
            // console.log(obj)
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

