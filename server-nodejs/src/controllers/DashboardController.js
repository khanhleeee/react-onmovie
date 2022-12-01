const { executeMultipleParams, queryStatement } = require("../database/handleQuery");
const { FILM } = require("../constants/FilmConstants");
const { GENRE } = require("../constants/GenreConstants");
const { COUNTRY } = require("../constants/CountryConstants");
const { TYPE } = require("../constants/TypeConstants");
const { CAST } = require("../constants/CastConstants");
const { KEYWORD } = require("../constants/KeywordConstants");
const mssql = require("mssql");

module.exports = {
    getMoviesList: async (req, res) => {
        try {
            const page = parseInt(req.query.page);
            const perPage = parseInt(req.query.perPage);
            if (isNaN(page) || page === 0) {
                const result = await executeMultipleParams("sp_getFilmsByDate", []);
                var obj = {
                    total: result.recordset.length,
                    data: [],
                };
                for (let i = 0; i < result.recordset.length; i++) {
                    obj.data.push(result.recordset[i]);
                }
            } else {
                const result = await executeMultipleParams("sp_pagination", [
                    { name: "PAGENUMBER", type: TYPE.int, value: page },
                    { name: "PAGESIZE", type: TYPE.int, value: perPage },
                ]);
                var obj = {
                    page: page,
                    per_page: perPage,
                    // total: result.recordset.length,
                    // total_pages: Math.ceil(result.recordset.length / perPage),
                    data: [],
                };
                for (let i = 0; i < result.recordset.length; i++) {
                    obj.data.push(result.recordset[i]);
                }
            }
            res.status(200).json(obj);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getDetailMovie: async (req, res) => {
        const filmID = req.params.filmID;
        try {
            const result = await executeMultipleParams("sp_getFilmDetail", [
                {
                    name: "F_ID",
                    type: TYPE.int,
                    value: filmID,
                },
            ]);
            const findGenre = await executeMultipleParams("sp_getGenresOfFilm", [
                {
                    name: "F_ID",
                    type: TYPE.charFive,
                    value: filmID,
                },
            ]);
            const findTrailer = await executeMultipleParams("sp_getFilmTrailers", [
                {
                    name: "ID_FILM",
                    type: TYPE.charFive,
                    value: filmID,
                },
            ]);
            var obj = {
                F_ID: result.recordset[0][FILM.id],
                F_OFFICIAL_NAME: result.recordset[0][FILM.name],
                F_DESC: result.recordset[0][FILM.desc],
                F_RELEASE_DATE: result.recordset[0][FILM.release_date],
                F_AVG: result.recordset[0][FILM.avg],
                F_AGE: result.recordset[0][FILM.age],
                F_BACKDROP: result.recordset[0][FILM.backdrop],
                F_POSTER: result.recordset[0][FILM.poster],
                S_NAME: result.recordset[0][FILM.status],
                C_NAME: result.recordset[0][COUNTRY.name],
                F_TRAILER: findTrailer.recordset[0],
                G_NAME: []
            };
            for (let i = 0; i < findGenre.recordset.length; i++) {
                obj.G_NAME.push(findGenre.recordset[i][GENRE.name]);
            }
            res.status(200).json({ data: obj });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addMovie: async (req, res) => {
        const data = req.body.film;

        try {
            const converToString = (array) => {
                let result = "";
                array.forEach((item) => {
                    if (Object.keys(item)[0] === "G_ID") {
                        result += " 0, " + item.G_ID + ";";
                    } else if (Object.keys(item)[0] === "ANC_ID") {
                        result += " 0, " + item.ANC_ID + ";";
                    } else if (Object.keys(item)[0] === "KW_ID") {
                        result += " 0, " + item.KW_ID + ";";
                    }
                });
                return "(" + result + " )";
            };
    
            const details = {
                F_OFFICIAL_NAME: data.detailValues[FILM.name],
                F_DESC: data.detailValues[FILM.desc],
                F_RELEASE_DATE: data.detailValues[FILM.release_date],
                F_BACKDROP: data.detailValues[FILM.backdrop],
                F_POSTER: data.detailValues[FILM.poster],
                F_AGE: 18,
                C_ID: 'USA',
                strGenres: converToString(data.movieGenres),
                strCasts: converToString(data.movieCasts),
                strKeywords: converToString(data.movieKeywords),
            }
            await executeMultipleParams("sp_ADDFILM", [
                {
                    name: "F_OFFCIAL_NAME",
                    type: TYPE.nvarcharHundred,
                    value: details.F_OFFICIAL_NAME,
                },
                {
                    name: "F_DESC",
                    type: TYPE.nvarcharThousand,
                    value: details.F_DESC,
                },
                {
                    name: "F_RELEASE_DATE",
                    type: TYPE.smallDateTime,
                    value: details.F_RELEASE_DATE,
                },
                {
                    name: "F_AGE",
                    type: TYPE.int,
                    value: details.F_AGE,
                },
                {
                    name: "F_BACKDROP",
                    type: TYPE.varcharHundred,
                    value: details.F_BACKDROP,
                },
                {
                    name: "F_POSTER",
                    type: TYPE.varcharHundred,
                    value: details.F_POSTER,
                },
                {
                    name: "C_ID",
                    type: TYPE.charThree,
                    value: details.C_ID,
                },
                {
                    name: "GENRES",
                    type: TYPE.max,
                    value: details.strGenres,
                },
                {
                    name: "KEYWORDS",
                    type: TYPE.max,
                    value: details.strKeywords,
                },
                {
                    name: "CASTS",
                    type: TYPE.max,
                    value: details.strCasts,
                },
            ]);
            res.status(200).json('Add movie successfully');
        } catch (error) {
            res.status(500).json(error);
        }
    },
    editDetailMovie: async (req, res) => {
        const filmID = req.params.filmID;
        const status = 2;
        const cID = 'USA';
        const avg = 8.0;
        const age = 18;
        const {
            [FILM.name]: name,
            [FILM.release_date]: release_date,
            [FILM.backdrop]: backdrop,
            [FILM.poster]: poster,
            [FILM.desc]: desc,
            // [FILM.age]: age,
            // [FILM.avg]: avg,
            // [FILM.status]: status,
            // [COUNTRY.id]: cID,            
        } = req.body;
        try {
            const result = await executeMultipleParams("sp_editDetailsFilm", [
                { name: "F_ID", type: mssql.Int, value: filmID },
                {
                    name: "F_OFFICIAL_NAME",
                    type: mssql.NVarChar(100),
                    value: name,
                },
                { name: "F_DESC", type: mssql.NVarChar(1000), value: desc },
                {
                    name: "F_RELEASE_DATE",
                    type: mssql.SmallDateTime,
                    value: release_date,
                },
                {
                    name: "F_AVG",
                    type: mssql.Real,
                    value: avg,
                },
                { name: "F_AGE", type: mssql.TinyInt, value: age },
                {
                    name: "F_BACKDROP",
                    type: mssql.VarChar(100),
                    value: backdrop,
                },
                {
                    name: "F_POSTER",
                    type: mssql.VarChar(100),
                    value: poster,
                },
                { name: "S_ID", type: mssql.Int, value: status },
                { name: "C_ID", type: mssql.Char(3), value: cID },
            ]);
            res.status(200).json({
                data: result.recordset,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllGenres: async (req, res) => {
        try {
            const result = await executeMultipleParams("sp_getGenres", []);
            res.status(200).json({
                total: result.recordset.length,
                data: result.recordset,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllCasts: async (req, res) => {
        try {
            const result = await executeMultipleParams("sp_getCasts", []);
            const obj = result.recordset.map((item) => {
                return {
                    [CAST.id]: item[CAST.id],
                    [CAST.name]: item[CAST.name],
                    [CAST.avatar]: item[CAST.avatar],
                };
            });
            res.status(200).json({
                total: result.recordset.length,
                data: obj,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllKeywords: async (req, res) => {
        try {
            const result = await executeMultipleParams("sp_getKeywords", []);
            const obj = result.recordset.map((item) => {
                return {
                    [KEYWORD.id]: item[KEYWORD.id],
                    [KEYWORD.name]: item[KEYWORD.name],
                };
            });
            res.status(200).json({
                total: result.recordset.length,
                data: obj,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}