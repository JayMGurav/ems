import Head from "next/head";
import { useForm } from "react-hook-form";

import { styled } from "@/styles/stitches.config";
import Input from "@/components/Input";
import Button from "@/styledComponents/Button";

const Form = styled("form", {
  maxWidth: "$lg",
  w: "$sm",
  mx: "auto",
  p: "$4",
  backgroundColor: "$fg",
  borderRadius: "$lg",
  "& h2": {
    my: "$4",
  },
});

const Container = styled("div", {
  w: "$full",
  minHeight: "100vh",
  d: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log({ errors });
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Employee Sign in</h2>
        <Input
          label="Email"
          type="email"
          placeholder="johnDoe@abc.com"
          aria-invalid={errors?.email ? "true" : "false"}
          {...register("email", {
            required: { value: true, message: "Email is required" },
          })}
        />

        <Input
          aria-invalid={errors?.password ? "true" : "false"}
          label="Password"
          type="password"
          {...register("password", {
            required: { value: true, message: "Password is required" },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
              message:
                "password should contain upper-case, lower-case and Numbers",
            },
            minLength: {
              value: 4,
              message: "Should be minimum of length 4",
            },
            maxLength: {
              value: 8,
              message: "Should be maximum of length 8",
            },
          })}
        />
        <Button filled="blue" size="sm" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
