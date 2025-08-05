import mongoose, {Schema , Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt : Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now

    }

})

export interface User extends Document{
   username:string;
   email:string;
   password:string;
   verifycode:string;
   verifyCodeExpiry:Date;
   isVerified:boolean;
   isAcceptingMessages:boolean;
   message:Message[]

}

const UserSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:[true , "Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true , "email is required"],
        unique:true,
        match: [ /.+\@.+\..+/, "please use a valid email"]

    },
    password:{
        type:String,
         required:[true , "Password is required"],
        
    },
    verifycode:{
        type:String,
         required:[true , "verifycode is required"],
        
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true , " verifyCodeExpiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true,
    },
    message:[MessageSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;