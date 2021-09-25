import { useState } from "react";
import { useMutation } from "@apollo/client";

import { CHANGE_LEAVE_STATUS } from "@/gqlClient/mutations";
import ErrorMessage from "@/styledComponents/ErrorMessage";
import Select from "@/styledComponents/Select";
import { THead } from "@/styledComponents/TableComponents";
import { TH } from "@/styledComponents/TableComponents";
import { TD } from "@/styledComponents/TableComponents";
import { TR } from "@/styledComponents/TableComponents";
import { Table } from "@/styledComponents/TableComponents";
import { styled } from "@/styles/stitches.config";

const EmployeeDetailsDiv = styled("div", {
  d: "flex",
  flexDirection: "column",
  gap: "$2",
  "& h1": {
    textAlign: "center",
  },
});

function Leave({ leave, employeeId, setErrorMessage }) {
  const { _id, date, status, reason } = leave;
  const [leaveStatus, setLeaveStatus] = useState(status);
  const [changeLeaveStatus] = useMutation(CHANGE_LEAVE_STATUS, {
    onError: (err) => {
      setErrorMessage(err.message);
    },
  });

  const handleStatusChange = async (e) => {
    const { value } = e.target;
    setLeaveStatus(value);
    await changeLeaveStatus({
      variables: {
        id: employeeId,
        date,
        leaveId: _id,
        status: value,
      },
    });
  };

  return (
    <TR scope="row">
      <TD>{date}</TD>
      <TD>
        <Select value={leaveStatus} onChange={handleStatusChange}>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
        </Select>
      </TD>
      <TD>{reason}</TD>
    </TR>
  );
}

function ShowEmployee({ employee }) {
  console.log({ employee });
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <>
      <EmployeeDetailsDiv>
        <h1>{employee.fullname}</h1>
        <span>Email: {employee.email}</span>
        <span>Designation: {employee.designation}</span>
        {employee.phone && <span>Phone: {employee.phone}</span>}
        {employee.address && <span>Address: {employee.address}</span>}
        {employee.salary && <span>Salary: {employee.salary}</span>}
        <span>Total leaves: {employee.totalLeaves}</span>
        <span>Available Leaves: {employee.availableLeaves}</span>
        <span>Last Logged: {employee.lastLoginAt}</span>
      </EmployeeDetailsDiv>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {employee?.leaves.length > 0 ? (
        <>
          <h2>Leaves applied:</h2>
          <Table>
            <THead>
              <TR>
                <TH scope="col">Date</TH>
                <TH scope="col">Status</TH>
                <TH scope="col">Reason</TH>
              </TR>
              {employee?.leaves?.map((leave) => (
                <Leave
                  key={leave._id}
                  setErrorMessage={setErrorMessage}
                  employeeId={employee.id}
                  leave={leave}
                />
              ))}
            </THead>
          </Table>
        </>
      ) : (
        <h2>No leaves applied</h2>
      )}
    </>
  );
}

export default ShowEmployee;
