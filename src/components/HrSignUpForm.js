import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import Link from "next/link";

import { css } from "@/styles/stitches.config";
import { REGISTER_HR } from "@/gqlClient/mutations";
import {
  emailValidation,
  fullValidation,
  passwordValidation,
} from "@/configs/formValidations";
import Button from "@/styledComponents/Button";
import Form from "@/styledComponents/Form";
import Input from "./Input";
import ErrorMessage from "@/styledComponents/ErrorMessage";

function HrSignUpForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerHR, { loading }] = useMutation(REGISTER_HR, {
    onCompleted: (res) => {
      if (res?.registerHR) {
        reset();
        router.push("/hr/dashboard");
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  async function signUpHandler(data) {
    await registerHR({
      variables: {
        input: {
          fullname: data.fullname,
          email: data.email,
          password: data.password,
        },
      },
    });
  }

  const { ref: emailRef, ...restOfEmail } = register("email", emailValidation);
  const { ref: fullnameRef, ...restOfFullname } = register(
    "fullname",
    fullValidation
  );
  const { ref: passwordRef, ...restOfPassword } = register(
    "password",
    passwordValidation
  );

  return (
    <Form onSubmit={handleSubmit(signUpHandler)}>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <h2>Hr Sign up</h2>
      <Input
        label="Fullname"
        type="fullname"
        placeholder="John Doe"
        aria-invalid={errors?.fullname ? "true" : "false"}
        error={errors?.fullname?.message}
        ref={fullnameRef}
        {...restOfFullname}
      />
      <Input
        label="Email"
        type="email"
        placeholder="johnDoe@abc.com"
        aria-invalid={errors?.email ? "true" : "false"}
        error={errors?.email?.message}
        ref={emailRef}
        {...restOfEmail}
      />
      <Input
        label="Password"
        type="password"
        aria-invalid={errors?.password ? "true" : "false"}
        error={errors?.password?.message}
        ref={passwordRef}
        {...restOfPassword}
      />
      <Button
        css={{
          my: "$2",
        }}
        filled="blue"
        size="sm"
        type="submit"
      >
        {loading ? "Loading..." : "Sign up"}
      </Button>
      {/* <br /> */}
      <Link href="/hr/signin" passHref>
        <a>Registered? Please Sign in</a>
      </Link>
    </Form>
  );
}

export default HrSignUpForm;
