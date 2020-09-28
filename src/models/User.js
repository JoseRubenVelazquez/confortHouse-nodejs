const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");
/*const { Schema } = mongoose;*/

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
    /*return hash;*/
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
