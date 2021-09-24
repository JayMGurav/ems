import Head from "next/head";
import Link from "next/link";
import Container from "@/styledComponents/Container";

export default function HrSignIn() {
  async function signInHandler(data) {
    console.log(data);
  }

  return (
    <Container>
      <h1>Hr Board</h1>
      <Link href="/hr/signin" passHref>
        <a>Sign in</a>
      </Link>
      <Link href="/hr/signup" passHref>
        <a>Sign up</a>
      </Link>
    </Container>
  );
}
