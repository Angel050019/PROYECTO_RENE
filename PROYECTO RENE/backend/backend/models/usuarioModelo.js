import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    tipoUsuario:{
        type:String,
        default:"usuario"
    },
    salt:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);

export default mongoose.model('User', userSchema);