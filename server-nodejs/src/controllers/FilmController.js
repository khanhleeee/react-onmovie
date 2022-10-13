const mssql = require('mssql');

const Film = require('../models/Film');
const sqlConfig = require('../database/dbConnection');

module.exports = {
    getFilmList: async (req, res) => {
        try {
            const pool = await mssql.connect(sqlConfig);
            const per_page = 5;
            const page = parseInt(req.query.page);
            if (isNaN(page)) {
                const query = 'SELECT * FROM FILMS';
                var obj = {
                    data: [],
                };
                const result = await pool.request().query(query);
                for (let i = 0; i < result.recordset.length; i++) {
                    obj.data.push(result.recordset[i]);
                }
            } else {
                const query = 'SELECT COUNT (*) FROM FILMS';
                const count = await pool.request().query(query);
                const total = count.recordsets
                const offset = (page - 1) * per_page;
                if (offset == 0) {
                    const query = 'SELECT TOP ' + per_page + '* FROM FILMS';
                    var obj = {
                        page: 1,
                        per_page: per_page,
                        total: total[0][0][''],
                        total_pages: total[0][0][''] / per_page,
                        data: [],
                    };
                    const result = await pool.request().query(query);
                    for (let i = 0; i < result.recordset.length; i++) {
                        obj.data.push(result.recordset[i]);
                    }
                } else {
                    const query = 'SELECT * FROM FILMS ORDER BY F_ID OFFSET ' + offset + ' ROWS FETCH NEXT ' + offset + ' ROWS ONLY ';
                    var obj = {
                        page: page,
                        per_page: per_page,
                        total: total[0][0][''],
                        total_pages: total[0][0][''] / per_page,
                        data: [],
                    };
                    const result = await pool.request().query(query);
                    for (let i = 0; i < result.recordset.length; i++) {
                        obj.data.push(result.recordset[i]);
                    }
                }
            }
            res.status(200).json(obj);
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
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchFilm: async (req, res) => {
        const q = req.query.q;
        try {
            const pool = await mssql.connect(sqlConfig);
            const query = 'SELECT F.F_ID, F.F_OFFICIAL_NAME, F.F_PREFERENCED_NAME, F.F_DESC, F.F_RELEASEYEAR, F.F_AVGRATING, F.F_LIMITEDAGE, F.F_BACKCDROP, F.F_POSTER, F.C_ID, F.S_ID FROM FILM_KEYWORDS AS FKW, KEYWORDS AS KW, FILMS AS F WHERE FKW.KW_ID = KW.KW_ID AND FKW.F_ID = F.F_ID AND KW_TITLE = ' + `'${q}'`;
            const result = await pool.request().query(query);
            if (result.recordset.length == 0) {
                const page = 1;
                const per_page = 5;
                const offset = (page - 1) * per_page;
                const query = 'SELECT * FROM FILMS WHERE F_OFFICIAL_NAME LIKE ' + `'${q}%'` + ' ORDER BY F_ID OFFSET ' + offset + ' ROWS FETCH NEXT 5 ROWS ONLY';
                const result = await pool.request().query(query);
                var obj = {
                    page: page,
                    per_page: per_page,
                    total: result.recordset.length,
                    // total_pages: result.recordset.length / per_page,
                    data: [],
                };
                for (let i = 0; i < result.recordset.length; i++) {
                    obj.data.push(result.recordset[i]);
                }
                res.status(200).json(obj);
            } else {
                var obj = {
                    data: [],
                };
                for (let i = 0; i < result.recordset.length; i++) {
                    obj.data.push(result.recordset[i]);
                }
                res.status(200).json(obj);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

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

