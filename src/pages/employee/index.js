import Head from "next/head";
import { useMutation } from "@apollo/client";

import Container from "@/styledComponents/Container";
import SignInForm from "@/components/SignInForm";
import { LOGIN_EMPLOYEE } from "@/gqlClient/mutations";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [loginEmployee, { data: employeeData, loading, error }] = useMutation(
    LOGIN_EMPLOYEE,
    {
      onCompleted: (res) => {
        if (res?.loginEmployee) {
          router.push("/employee/dashboard");
        }
      },
    }
  );

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
      <SignInForm heading="Employee Sign In" onFormSubmit={signInHandler} />
    </Container>
  );
}
