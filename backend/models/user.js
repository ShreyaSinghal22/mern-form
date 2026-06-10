import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    //form user data schema 
    fullName: { type: String, default: "" },
    currentStatus: { type: String, default: "" },
    age: { type: Number },
    message: { type: String, default: "" }
    }, {timestamps: true});

    userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//custom method to compare passwords(the this.password is the hashed password in the database and the enteredPassword is the plain text password entered by the user)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;