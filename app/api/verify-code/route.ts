import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, code } = await request.json()
        const decodedUsername = decodeURIComponent(username).trim();
        console.log("Decoded username:", `"${decodedUsername}"`);
        const user = await UserModel.findOne({ username: decodedUsername })
        console.log("Found user:", user);

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: " user not found"
                }, { status: 500 }
            )

        }
        const isCodeValid = user.verifycode === code
        const isCodeNotExpired = new Date (user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save();

             return Response.json(
                {
                    success: true,
                    message: "Account Verified"
                }, { status: 200 }
            )
        }
        else if(!isCodeNotExpired){
             return Response.json(
                {
                    success: false,
                    message: "Verification code has  expired"
                }, { status: 400 }
            )

        }
        else{
             return Response.json(
                {
                    success: false,
                    message: "Incorrect Verification code"
                }, { status: 400 }
            )
        }

    } catch (error) {
        console.error("Error Verifying user", error)
        return Response.json(
            {
                success: false,
                message: "Error Verifying user"
            }, { status: 500 }
        )
    }

}