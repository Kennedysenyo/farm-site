import { Body, Head, Html, Preview, Text } from "@react-email/components";

export default function Welcome({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Preview>Glad To Have You On Board.</Preview>
      <Body>
        <Text>Hi, {name}</Text>
        <Text>Welcome to StartAgri. We're excited to have you on board! </Text>
        <Text>
          Explore our products, book a consultation, or check out the lastest
          farm updates.
        </Text>
        <Text>If you have any questions, we're just an email away.</Text>
        <Text>Let's grow together!</Text>
        <Text>-- The StartAgri Team</Text>
      </Body>
    </Html>
  );
}
