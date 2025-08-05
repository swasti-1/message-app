import * as React from 'react';
import { Html, Head, Preview, Body, Container, Text, Section, Button } from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your verification code for signup</Preview>
      <Body style={{ backgroundColor: "#f9f9f9", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "8px", maxWidth: "480px", margin: "auto", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <Section style={{ marginBottom: "24px" }}>
            <Text style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
              Hello {username},
            </Text>
            <Text style={{ fontSize: "16px", color: "#333" }}>
              Thank you for signing up. Please use the following OTP to verify your account:
            </Text>
            <Text style={{ fontSize: "32px", fontWeight: "bold", letterSpacing: "4px", margin: "20px 0", color: "#007BFF", textAlign: "center" }}>
              {otp}
            </Text>
            <Text style={{ fontSize: "14px", color: "#555" }}>
              This code is valid for 10 minutes. If you did not request this, you can ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default VerificationEmail;
