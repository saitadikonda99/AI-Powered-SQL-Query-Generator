import mongoose, { Schema, models} from "mongoose";


const userScheme = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
            unique: true
        },
    }, 
    { timestamps: true }   
);

const User = models.User || mongoose.model('User', userScheme);

export default User;