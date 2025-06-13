import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
} from "@react-email/components";

type OTPEmailProps = {
  name?: string;
  otp: string;
};

export default function OTPEmail({ name, otp }: OTPEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your OTP Code for StartAgri</Preview>
      <Body
        style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9fafb" }}
      >
        <Container
          style={{
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Text style={{ fontSize: "16px", color: "#111827" }}>
            {name ? `Hi ${name},` : "Hello,"}
          </Text>
          <Text style={{ fontSize: "16px", color: "#111827" }}>
            Your one-time verification code is:
          </Text>
          <Text
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#10b981",
              margin: "16px 0",
            }}
          >
            {otp}
          </Text>
          <Text style={{ fontSize: "14px", color: "#6b7280" }}>
            This code will expire in 5 minutes. If you didn’t request this,
            please ignore this email.
          </Text>
          <Text
            style={{ fontSize: "14px", color: "#6b7280", marginTop: "24px" }}
          >
            Thanks,
            <br />
            The StartAgri Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
