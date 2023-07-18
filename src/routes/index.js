// routes
const userRoute = require('./user');

const mounter = (app) => {
    app.use(`/users`, userRoute);
}

module.exports = mounter;