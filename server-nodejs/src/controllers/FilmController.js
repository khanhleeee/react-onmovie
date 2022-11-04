const mssql = require("mssql");
const {
    execute,
    queryStatement,
    executeOneParam,
    executeTwoParams,
} = require("../database/handleQuery");
const {
    per_page,
    firstPage,
    numberChar,
    numberGenre,
} = require("../constants/FilmConstants");

module.exports = {
    getFilmList: async (req, res) => {
        try {
            const page = parseInt(req.query.page);
            if (isNaN(page)) {
                var obj = {
                    data: [],
                };
                const result = await execute("sp_getFilmsByDate");
                for (let i = 0; i < result.recordset.length; i++) {
                    obj.data.push(result.recordset[i]);
                }
            } else {
                const statement = "SELECT COUNT (*) FROM FILMS";
                const count = await queryStatement(statement);
                const total = count.recordsets;
                const offset = (page - 1) * per_page;
                if (offset == 0) {
                    var obj = {
                        page: firstPage,
                        per_page: per_page,
                        total: total[0][0][""],
                        total_pages: total[0][0][""] / per_page,
                        data: [],
                    };
                    // const result = await pool.request()
                    //     .input("PAGENUMBER", mssql.Int, firstPage)
                    //     .input("PAGESIZE", mssql.Int, per_page)
                    //     .execute("sp_pagination");
                    const result = await executeTwoParams("sp_pagination", [
                        { name: "PAGENUMBER", type: mssql.Int, value: firstPage },
                        { name: "PAGESIZE", type: mssql.Int, value: per_page },
                    ]);
                    for (let i = 0; i < result.recordset.length; i++) {
                        obj.data.push(result.recordset[i]);
                    }
                } else {
                    // const query =
                    //     "SELECT * FROM FILMS ORDER BY F_ID OFFSET " +
                    //     offset +
                    //     " ROWS FETCH NEXT " +
                    //     offset +
                    //     " ROWS ONLY ";
                    // const result = await queryStatement(query);
                    var obj = {
                        page: page,
                        per_page: per_page,
                        total: total[0][0][""],
                        total_pages: total[0][0][""] / per_page,
                        data: [],
                    };
                    // const result = await pool.request()
                    //     .input("PAGENUMBER", mssql.Int, page)
                    //     .input("PAGESIZE", mssql.Int, per_page)
                    //     .execute("sp_pagination");
                    const result = await executeTwoParams("sp_pagination", [
                        { name: "PAGENUMBER", type: mssql.Int, value: page },
                        { name: "PAGESIZE", type: mssql.Int, value: per_page },
                    ]);
                    for (let i = 0; i < result.recordset.length; i++) {
                        obj.data.push(result.recordset[i]);
                    }
                }
            }
            res.status(200).json(obj);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchFilm: async (req, res) => {
        const q = req.query.q;
        try {
            const result = await executeOneParam("sp_searchFilms", {
                name: "KW_TITLE",
                type: mssql.NVarChar,
                value: q,
            });
            if (result.recordset.length == 0) {
                const offset = (firstPage - 1) * per_page;
                const query =
                    "SELECT * FROM FILMS WHERE F_OFFICIAL_NAME LIKE " +
                    "${q}%" +
                    " ORDER BY F_ID OFFSET " +
                    offset +
                    " ROWS FETCH NEXT 5 ROWS ONLY";
                const result = await queryStatement(query);
                var obj = {
                    page: firstPage,
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
    },
    getDetailFilm: async (req, res) => {
        const filmID = req.params.filmID;
        try {
            const result = await executeOneParam("sp_getFilmDetail", {
                name: "F_ID",
                type: mssql.Char(numberChar),
                value: filmID,
            });
            const findTrailer = await executeOneParam("sp_getFilmTrailers", {
                name: "ID_FILM",
                type: mssql.Char(numberChar),
                value: filmID,
            });
            var obj = {
                F_ID: result.recordset[0].F_ID,
                F_OFFICIAL_NAME: result.recordset[0].F_OFFICIAL_NAME,
                F_PREFERENCED_NAME: result.recordset[0].F_PREFERENCED_NAME,
                F_DESC: result.recordset[0].F_DESC,
                F_RELEASEYEAR: result.recordset[0].F_RELEASEYEAR,
                F_AVGRATING: result.recordset[0].F_AVGRATING,
                F_LIMITEDAGE: result.recordset[0].F_LIMITEDAGE,
                F_BACKCDROP: result.recordset[0].F_BACKCDROP,
                F_POSTER: result.recordset[0].F_POSTER,
                C_ID: result.recordset[0].C_ID,
                S_ID: result.recordset[0].S_ID,
                F_TRAILER: findTrailer.recordset[0],
                G_NAME: [],
            };
            for (let i = 0; i < result.recordset.length; i++) {
                obj.G_NAME.push(result.recordset[i].G_NAME);
            }
            res.status(200).json(obj);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getSimilarFilm: async (req, res) => {
        const filmID = req.params.filmID;
        try {
            const result = await executeOneParam("sp_getSimilarFilms", {
                name: "F_ID",
                type: mssql.Char(numberChar),
                value: filmID,
            });
            var obj = {
                data: [],
            };
            for (let i = 0; i < result.recordset.length; i++) {
                obj.data.push(result.recordset[i]);
            }
            res.status(200).json(obj);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getActorFilm: async (req, res) => {
        const filmID = req.params.filmID;
        try {
            const result = await executeOneParam("sp_getFilmCredit", {
                name: "F_ID",
                type: mssql.Char(numberChar),
                value: filmID,
            });
            res.status(200).json(result.recordset);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getGenres: async (req, res) => {
        try {
            const result = await execute("sp_getGenres");
            res.status(200).json(result.recordset);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getContries: async (req, res) => {
        try {
            const result = await execute("sp_getCountries");
            res.status(200).json(result.recordset);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getFilmsByGenre: async (req, res) => {
        const genreID = req.params.genreID;
        try {
            const result = await executeOneParam("sp_getFilmsByGenre", {
                name: "G_ID",
                type: mssql.VarChar(numberGenre),
                value: genreID,
            });
            if (result.recordset.length >= 5) {
                var obj = {
                    page: firstPage,
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
                    page: null,
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
