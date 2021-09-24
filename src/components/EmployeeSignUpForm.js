import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import {
  designationValidation,
  emailValidation,
  fullValidation,
  passwordValidation,
  salaryValidation,
} from "@/configs/formValidations";
import { css } from "@/styles/stitches.config";
import { REGISTER_EMPLOYEE } from "@/gqlClient/mutations";
import { GET_ALL_EMPLOYEES } from "@/gqlClient/queries";
import Button from "@/styledComponents/Button";
import Form from "@/styledComponents/Form";
import Input from "./Input";
import ErrorMessage from "@/styledComponents/ErrorMessage";

function EmployeeSignUpForm({ closeModal }) {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerEmployee, { loading }] = useMutation(REGISTER_EMPLOYEE, {
    refetchQueries: [GET_ALL_EMPLOYEES, "GetAllEmployees"],
    onCompleted: (res) => {
      if (res?.registerEmployee) {
        reset();
        setErrorMessage("");
        closeModal();
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  async function registerNewEmployee(data) {
    const salary = Number(data.salary);

    await registerEmployee({
      variables: {
        input: {
          ...data,
          salary,
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
  const { ref: designationRef, ...restOfDesignation } = register(
    "designation",
    designationValidation
  );
  const { ref: salaryRef, ...restOfSalary } = register(
    "salary",
    salaryValidation
  );
  const { ref: phoneRef, ...restOfPhone } = register("phone");
  const { ref: addressRef, ...restOfAddress } = register("address");

  return (
    <Form onSubmit={handleSubmit(registerNewEmployee)}>
      <h2>Add New Employee</h2>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Input
        label="Fullname"
        type="fullname"
        placeholder="Sherlock Homes"
        aria-invalid={errors?.fullname ? "true" : "false"}
        error={errors?.fullname?.message}
        ref={fullnameRef}
        {...restOfFullname}
      />
      <Input
        label="Email"
        type="email"
        placeholder="sherlocked@abc.com"
        aria-invalid={errors?.email ? "true" : "false"}
        error={errors?.email?.message}
        ref={emailRef}
        {...restOfEmail}
      />

      <Input
        label="Password"
        type="password"
        placeholder="lock221"
        aria-invalid={errors?.password ? "true" : "false"}
        error={errors?.password?.message}
        ref={passwordRef}
        {...restOfPassword}
      />
      <Input
        label="Designation"
        type="text"
        placeholder="Consultant detective"
        aria-invalid={errors?.designation ? "true" : "false"}
        error={errors?.designation?.message}
        ref={designationRef}
        {...restOfDesignation}
      />
      <Input
        label="Phone"
        type="text"
        placeholder="123457892"
        aria-invalid={errors?.phone ? "true" : "false"}
        error={errors?.phone?.message}
        ref={phoneRef}
        {...restOfPhone}
      />
      <Input
        label="Salary in LPA"
        type="number"
        placeholder="10"
        aria-invalid={errors?.salary ? "true" : "false"}
        error={errors?.salary?.message}
        ref={salaryRef}
        {...restOfSalary}
      />
      <Input
        label="Address"
        type="text"
        placeholder="221B Baker Street, London"
        aria-invalid={errors?.address ? "true" : "false"}
        error={errors?.address?.message}
        ref={addressRef}
        {...restOfAddress}
      />
      <Button
        css={{
          my: "$4",
        }}
        filled="blue"
        size="sm"
        type="submit"
      >
        {loading ? "Loading..." : errorMessage ? "Error!" : "Add Employee"}
      </Button>
    </Form>
  );
}

export default EmployeeSignUpForm;
