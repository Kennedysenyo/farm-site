import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";

export default function WelcomeEmail({
  name = "James Bond",
}: {
  name: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Glad To Have You On Board.</Preview>
      <Body>
        <Container>
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
          <Container style={{ padding: "0 10px" }}>
            <Text style={{ fontSize: "16px", color: "#111827" }}>
              Hi, {name}
            </Text>
            <Text style={{ fontSize: "16px", color: "#111827" }}>
              Welcome to StartAgri. We're excited to have you on board!{" "}
            </Text>
            <Text style={{ fontSize: "16px", color: "#111827" }}>
              Explore our products, book a consultation, or check out the
              lastest farm updates.
            </Text>
            <Text style={{ fontSize: "16px", color: "#111827" }}>
              If you have any questions, we're just an email away.
            </Text>
            <Text style={{ fontSize: "16px", color: "#111827" }}>
              Let's grow together!
            </Text>
            <Text style={{ fontSize: "16px", color: "#111827" }}>
              -- The StartAgri Team
            </Text>
          </Container>
        </Container>
      </Body>
    </Html>
  );
}
