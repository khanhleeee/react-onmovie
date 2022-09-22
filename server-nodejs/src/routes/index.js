const GenreRouter = require('./Genre');

function route(app) {
    app.use('/genre', GenreRouter);
}

module.exports = route;