import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { LOGIN_HR } from "@/gqlClient/mutations";
import Container from "@/styledComponents/Container";
import SignInForm from "@/components/SignInForm";
import ErrorMessage from "@/styledComponents/ErrorMessage";

export default function HrSignIn() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loginHr, { loading }] = useMutation(LOGIN_HR, {
    onCompleted: (res) => {
      if (res?.loginHR) {
        router.push("/hr/dashboard");
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  async function signInHandler(data) {
    await loginHr({
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
          heading="HR Login"
          onFormSubmit={signInHandler}
          notSignedInUrl="/hr/signup"
          loading={loading}
        />
      </div>
    </Container>
  );
}
