import { useRef, useState } from "react";
import { useQuery } from "@apollo/client";

import { styled } from "@/styles/stitches.config";
import { GET_ALL_EMPLOYEES } from "@/gqlClient/queries";
import Loading from "./Loading";
import ErrorMessage from "@/styledComponents/ErrorMessage";
import Button from "@/styledComponents/Button";
import Modal from "@/components/Modal";
import ShowEmployee from "./ShowEmployee";
import EmployeeSignUpForm from "./EmployeeSignUpForm";

const EmployeeListDiv = styled("div", {
  d: "flex",
  flexWrap: "wrap",
  gap: "$4",
  [`& ${Button}`]: {
    borderRadius: "$xl",
    w: "200px",
    h: "100px",
    "& strong": {
      d: "block",
      fontSize: "$lg",
      mb: "$2",
    },
  },
});

function EmployeeList() {
  const modalRef = useRef();
  const [empIndex, setEmpIndex] = useState(null);
  const [modalPurpose, setModalPurpose] = useState(null);
  const { loading, data, error } = useQuery(GET_ALL_EMPLOYEES);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;
  const purposes = ["NEW_EMPLOYEE", "SHOW_EMPLOYEE"];

  const openModal = (purpose, index) => {
    if (purpose == purposes[0]) {
      setModalPurpose(purpose);
      modalRef.current.open();
    } else if (purpose === purposes[1]) {
      setModalPurpose(purpose);
      setEmpIndex(index);
      modalRef.current.open();
    } else {
    }
  };

  const employees = data?.getAllEmployees;
  return (
    <>
      <h2>All Employees</h2>
      <EmployeeListDiv>
        <Button
          aria-label="Add new employee"
          filled="blue"
          outlined
          onClick={() => openModal(purposes[0])}
        >
          Add New Employee
        </Button>
        {employees?.map((e, i) => (
          <Button
            filled="gray"
            key={e.id}
            aria-label={`Open ${e.fullname}`}
            onClick={() => openModal(purposes[1], i)}
          >
            <strong>{e.fullname}</strong>
            <span>{e.email}</span>
          </Button>
        ))}
      </EmployeeListDiv>
      <Modal ref={modalRef}>
        {modalPurpose === purposes[0] && (
          <EmployeeSignUpForm closeModal={() => modalRef.current.close()} />
        )}
        {modalPurpose === purposes[1] && (
          <ShowEmployee employee={employees[empIndex]} />
        )}
      </Modal>
    </>
  );
}

export default EmployeeList;
