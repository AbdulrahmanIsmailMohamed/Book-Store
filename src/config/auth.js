const jwt = require("jsonwebtoken");

const asyncHandling = require("../middleware/asyncHandler");
const User = require("../models/User")
const APIError = require("../utils/APIError");

const protectRoute = asyncHandling(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new APIError("You're Not Registerd, Please Login!!", 401));
    }

    const decode = jwt.verify(token, process.env.JWT_SEC);

    const { userId } = decode;
    const user = await User.findById(userId);
    if (!user) return next(new APIError("The User That Belongs To This Token, Does No Longer Exist", 401));

    req.user = user;
    next();
});

const allowTo = (...roles) =>
    asyncHandling(async (req, res, next) => {
        console.log(req.user.role);
        if (!roles.includes(req.user.role)) {
            return next(
                new APIError('You are not allowed to access this route', 403)
            );
        }
        next();
    })

module.exports = {
    protectRoute,
    allowTo
}