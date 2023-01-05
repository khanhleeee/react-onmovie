const filmRouter = require('./Film');
const authRouter = require('./Auth');
const userRouter = require('./User');
const dashboardRouter = require('./Dashboard');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/film', filmRouter);
    app.use('/user', userRouter);
    app.use('/dashboard', dashboardRouter);
}

module.exports = route;