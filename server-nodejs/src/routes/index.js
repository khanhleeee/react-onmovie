const movieRouter = require('./Movie');

function route(app) {
    app.use('/movie', movieRouter);
}

module.exports = route;