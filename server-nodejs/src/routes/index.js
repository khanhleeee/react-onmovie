const filmRouter = require('./Film');
const authRouter = require('./Auth');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/film', filmRouter);
}

module.exports = route;