const filmRouter = require('./Film');

function route(app) {
    app.use('/films', filmRouter);
}

module.exports = route;