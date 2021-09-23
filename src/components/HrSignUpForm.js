import Link from "next/link";
import { useForm } from "react-hook-form";

import { css } from "@/styles/stitches.config";
import {
  emailValidation,
  fullValidation,
  passwordValidation,
} from "@/configs/formValidations";
import Button from "@/styledComponents/Button";
import Form from "@/styledComponents/Form";
import Input from "./Input";

function HrSignUpForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { ref: emailRef, ...restOfEmail } = register("email", emailValidation);
  const { ref: fullnameRef, ...restOfFullname } = register(
    "fullname",
    fullValidation
  );
  const { ref: passwordRef, ...restOfPassword } = register(
    "password",
    passwordValidation
  );

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        Sign up
      </Button>
      <br />
      <Link href="/hr/signin" passHref>
        <a>Registered? Please Sign in</a>
      </Link>
    </Form>
  );
}

export default HrSignUpForm;
