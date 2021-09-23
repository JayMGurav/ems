import Head from "next/head";

import Container from "@/styledComponents/Container";
import SignInForm from "@/components/SignInForm";

export default function HrSignIn() {
  async function signInHandler(data) {
    console.log(data);
  }

  return (
    <Container>
      <SignInForm
        heading="HR Sign In"
        onFormSubmit={signInHandler}
        notSignedInUrl="/hr/signup"
      />
    </Container>
  );
}
