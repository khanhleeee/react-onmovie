const filmRouter = require('./Film');
const authRouter = require('./Auth');
const dashboardRouter = require('./Dashboard');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/film', filmRouter);
    app.use('/dashboard', dashboardRouter);
}

module.exports = route;