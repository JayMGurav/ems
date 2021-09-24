import Head from "next/head";
import { useMutation } from "@apollo/client";

import Container from "@/styledComponents/Container";
import SignInForm from "@/components/SignInForm";
import { LOGIN_HR } from "@/gqlClient/mutations";

export default function HrSignIn() {
  const router = useRouter();
  const [loginHR, { data: hrData, loading, error }] = useMutation(LOGIN_HR, {
    onCompleted: (res) => {
      if (res?.loginHR) {
        router.push("/hr/dashboard");
      }
    },
  });

  async function signInHandler(data) {
    await loginHR({
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
      <SignInForm
        heading="HR Sign In"
        onFormSubmit={signInHandler}
        notSignedInUrl="/hr/signup"
      />
    </Container>
  );
}
