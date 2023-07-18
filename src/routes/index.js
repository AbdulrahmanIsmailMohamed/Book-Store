// routes
const userRoute = require('./user');
const booksRoute = require('./books');

const mounter = (app) => {
    app.use(`/users`, userRoute);
    app.use(`/books`, booksRoute);
}

module.exports = mounter;