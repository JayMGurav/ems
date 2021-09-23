import Head from "next/head";

import Container from "@/styledComponents/Container";
import SignInForm from "@/components/SignInForm";
import HrSignUpForm from "@/components/HrSignUpForm";

export default function HrSignUp() {
  return (
    <Container>
      <HrSignUpForm />
    </Container>
  );
}
