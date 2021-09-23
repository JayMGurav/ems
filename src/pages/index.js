import Head from "next/head";

import Container from "@/styledComponents/Container";
import SignInForm from "@/components/SignInForm";

export default function Home() {
  async function signInHandler(data) {
    console.log(data);
  }

  return (
    <Container>
      <SignInForm heading="Employee Sign In" onFormSubmit={signInHandler} />
    </Container>
  );
}
