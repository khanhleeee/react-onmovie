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
    movieList: async (req, res) => {
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
                    const result = await executeTwoParams("sp_pagination", [
                        { name: "PAGENUMBER", type: mssql.Int, value: firstPage },
                        { name: "PAGESIZE", type: mssql.Int, value: per_page },
                    ]);
                    for (let i = 0; i < result.recordset.length; i++) {
                        obj.data.push(result.recordset[i]);
                    }
                } else {
                    var obj = {
                        page: page,
                        per_page: per_page,
                        total: total[0][0][""],
                        total_pages: total[0][0][""] / per_page,
                        data: [],
                    };
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
    getDetailMovie: async (req, res) => {
        const movieID = req.params.movieID;
        try {
            const result = await executeOneParam("sp_getFilmDetail", {
                name: "F_ID",
                type: mssql.Char(numberChar),
                value: movieID,
            });
            const findTrailer = await executeOneParam("sp_getFilmTrailers", {
                name: "ID_FILM",
                type: mssql.Char(numberChar),
                value: movieID,
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
}