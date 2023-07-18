const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "The User firstName Is Required"],
            maxlength: [100, "The firstName must be less than 100 characters"],
            minlength: [3, "The firstName must be more than 3 characters"],
        },
        lastName: {
            type: String,
            required: [true, "The User lastName Is Required"],
            maxlength: [100, "The lastName must be less than 100 characters"],
            minlength: [3, "The lastName must be more than 3 characters"],
        },
        email: {
            type: String,
            required: [true, "The Email Is Required"],
            trim: true,
            unique: [true, "The Email Must be Unique"],
            validate: {
                validator: (val) => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(val),
                message: `{VALUE} Is Not Valid Email`
            }
        },
        password: {
            type: String,
            required: [true, "The Password Is Required"],
            minlength: [8, "The Pssword must be more than 6 characters"],
            validate: {
                validator: (val) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(val),
                message: `{VALUE} Is Not Valid Password it must be contain at least one lowercase letter,
                    one uppercase letter, one numeric digit, and one special character`
            }
        },
        phone: String,
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    { timestamp: true }
);

userSchema.pre("save", function (next) {
    // if (!this.isModified("password")) return next(new APIError("please enter your password!", 400));
    if (this.isNew || this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
});

userSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;