import { resend } from "../lib/resend";

import VerificationEmail from "@/emails/verficationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerification(email: string, username: string, verifycode: string): Promise<ApiResponse> {
    try {
        const result =await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification code',
            react: VerificationEmail({username,otp:verifycode}),
        });
        console.log("Resend result:", result);
        return { success: true, message: "verification email sent successfully" }
    } catch (emailError) {
        console.log("Error sending verification email")
        return { success: false, message: 'Failed to send verification email' }
    }
}