import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Img,
} from "@react-email/components";

type OTPEmailProps = {
  type: "recovery" | "signup";

  otp: string;
};

export default function OTPEmail({ type, otp }: OTPEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your OTP Code for StartAgri</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif" }}>
        <Container
          style={{
            display: "flex",
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
          }}
        >
          <Img alt="logo" src="/img/logo.png" />
          <Text
            style={{
              color: "white",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            StartAgri
          </Text>
        </Container>
        <Container
          style={{
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Text style={{ fontSize: "16px", color: "#111827" }}>Hi there,</Text>
          <Text style={{ fontSize: "16px", color: "#111827" }}>
            Your one-time verification code is:
          </Text>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              border: "2px solid green",
              borderRadius: "1rem",
              maxWidth: "60%",
              backgroundColor: "lightcyan",
            }}
          >
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
          </Container>
          <Text style={{ fontSize: "14px", color: "#6b7280" }}>
            This code will expire in 6 minutes.{" "}
            {type === "recovery"
              ? "If you didn’t request this, please ignore this email."
              : "Enter the one time verification code to complete your signup"}
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
