import { useForm } from "react-hook-form";
import Link from "next/link";

import Input from "./Input";
import Button from "@/styledComponents/Button";
import Form from "@/styledComponents/Form";
import { emailValidation, passwordValidation } from "@/configs/formValidations";

function SignInForm({ heading, onFormSubmit, notSignedInUrl, loading }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { ref: emailRef, ...restOfEmail } = register("email", emailValidation);
  const { ref: passwordRef, ...restOfPassword } = register(
    "password",
    passwordValidation
  );

  const onSubmit = async (data) => {
    await onFormSubmit(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>{heading}</h2>
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
          my: "$4",
        }}
        filled="blue"
        size="sm"
        type="submit"
      >
        {loading ? "Loading..." : "Sign In"}
      </Button>
      {notSignedInUrl && (
        <Link href={notSignedInUrl} passHref>
          <a>Not Registered? Please register</a>
        </Link>
      )}
    </Form>
  );
}

export default SignInForm;
