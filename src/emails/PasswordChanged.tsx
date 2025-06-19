import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";

export default function PasswordChangeEmail() {
  return (
    <Html>
      <Head />
      <Preview>Password Changed</Preview>

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
        <Container>
          <Text style={{ fontSize: "14px" }}>Hi there,</Text>
          <Text style={{ fontSize: "14px" }}>
            Your password has been changed. <br /> If it wasn't you, try
            contacting us for support.
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
