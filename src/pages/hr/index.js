import Head from "next/head";
import Container from "@/styledComponents/Container";

export default function HrSignIn() {
  async function signInHandler(data) {
    console.log(data);
  }

  return (
    <Container>
      <h1>Hr Board</h1>
    </Container>
  );
}
