import Head from "next/head";
import { useMutation } from "@apollo/client";

import Container from "@/styledComponents/Container";
import SignInForm from "@/components/SignInForm";
import { LOGIN_EMPLOYEE } from "@/gqlClient/mutations";
import { useRouter } from "next/router";

import ErrorMessage from "@/styledComponents/ErrorMessage";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loginEmployee, { loading }] = useMutation(LOGIN_EMPLOYEE, {
    onCompleted: (res) => {
      if (res?.loginEmployee) {
        router.push("/employee/dashboard");
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  async function signInHandler(data) {
    await loginEmployee({
      variables: {
        input: {
          email: data.email,
          password: data.password,
        },
      },
    });
  }

  return (
    <Container>
      <div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <SignInForm
          heading="Employee Sign In"
          onFormSubmit={signInHandler}
          loading={loading}
        />
      </div>
    </Container>
  );
}
