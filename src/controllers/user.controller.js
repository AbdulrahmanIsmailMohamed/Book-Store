const bcrypt = require("bcrypt")

const asyncHandling = require("../middleware/asyncHandler")
const User = require('../models/User');
const APIError = require('../utils/APIError');
const createToken = require("../utils/createToken");

const signup = asyncHandling(async (req, res, next) => {
    const { firstName, lastName, email, password, confirmPassword, phone } = req.body;

    if (password !== confirmPassword) return next(new APIError("Password and confirm password not valid", 400));

    const user = await User.create({ firstName, lastName, email, password, phone });
    if (!user) return next(new APIError("An error occurred during the registration process", 401));
    const token = createToken({ id: user._id, role: user.role });
    res.status(201).json({ user, token });
});

const login = asyncHandling(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new APIError("An error occurred in the email Or Password", 400));
    }
    const token = createToken({ id: user._id, role: user.role })
    res.status(200).json({ user, token })
});

module.exports = {
    signup,
    login
}