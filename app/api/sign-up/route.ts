import dbConnect from "../../../lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";
import { sendVerification } from "@/helpers/sendVerificationEmail";
import { success } from "zod";

export async function POST(request: Request) {
    await dbConnect()

    try {
        const { username, email, password } = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,

        })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, { status: 400 })
        }
        const existingUserByEmail = await UserModel.findOne({ email })
        const verifycode = Math.floor(100000 + Math.random() * 900000).toString();
        if (existingUserByEmail) {

            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exist with this email"
                }, { status: 400 })
            }
            else {
                const hasedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.username = username;
                existingUserByEmail.password = hasedPassword;
                existingUserByEmail.verifycode = verifycode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                const savedUserResult = await existingUserByEmail.save()
                console.log("This is saved user result" , savedUserResult);
                

                const emailResponse = await sendVerification(email, username, verifycode);
                console.log("Email sent to unverified existing user");
            }

        } else {
            const hasedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hasedPassword,
                verifycode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                message: []
            })

            await newUser.save();
            const emailResponse = await sendVerification(
                email,
                username,
                verifycode
            )
            console.log("Email sent successfully");

            if (!emailResponse.success) {
                return Response.json({
                    success: false,
                    message: "emailResponse.message"
                }, { status: 500 })
            }
        }
        return Response.json({
            success: true,
            message: "User Registered Successfully . Please Verify your email"
        }, { status: 200 })
    }
    catch (error) {
        console.error('ERROR registering user', error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}
