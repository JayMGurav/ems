import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Image from "next/image";

import { GET_EMPLOYEE_ME } from "@/gqlClient/queries";
import Loading from "@/components/Loading";
import { styled, css } from "@/styles/stitches.config";
import Button from "@/styledComponents/Button";
import StyledInput from "@/styledComponents/StyledInput";
import formatDate from "@/utils/formatDate";
import { APPLY_LEAVE } from "@/gqlClient/mutations";
import IntroDiv from "@/styledComponents/IntroDiv";
import ErrorMessage from "@/styledComponents/ErrorMessage";
import useLogout from "@/hooks/useLogout";

const ApplyLeave = styled("form", {
  my: "$4",
  d: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "$4",
});

const Leaves = styled("div", {
  d: "flex",
  my: "$6",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  gap: "$4",
});

const Leave = styled("div", {
  maxWidth: "$md",
  borderRadius: "$lg",
  p: "$4",
  bg: "$fg1",
  color: "$gray400",
  "& p": {
    p: "$2",
    bg: "$fg",
    borderRadius: "$lg",
    my: "$2",
    fontSize: "$md",
    color: "$gray50",
  },
  "& small": {
    my: "$4",
    px: "$2",
    bg: "$blue100",
    borderRadius: "$full",
    color: "$fg",
    fontWeight: "$medium",
    fontSize: "12px",
  },
});

/**
 *
 * Apply Leave functionality can surely be abstracted into a custom hook but since it is not * used anywhere else its of not much difference of doing so.
 */

function EmployeeDashboard() {
  const [errorMessage, setErrorMessage] = useState("");
  const [leave, setLeave] = useState({
    date: "",
    reason: "",
  });
  const { logout } = useLogout("/employee");
  const { loading, data, error: getMeError } = useQuery(GET_EMPLOYEE_ME);

  const [applyLeave, { loading: leaveLoading }] = useMutation(APPLY_LEAVE, {
    onCompleted: () => {
      setLeave({
        date: "",
        reason: "",
      });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
    update(cache, { data: { applyLeave } }) {
      const id = cache.identify(applyLeave);
      cache.modify({
        id, //cache id
        fields: {
          leaves() {
            cache.writeFragment({
              data: applyLeave,
              fragment: gql`
                fragment NewLeave on Employee {
                  id
                  availableLeaves
                  leaves {
                    _id
                    date
                    status
                    reason
                  }
                }
              `,
            });
            return [...applyLeave?.leaves];
          },
        },
      });
    },
  });

  const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeave({
      ...leave,
      [name]: value,
    });
  };

  async function applyLeaveHandler(e) {
    e.preventDefault();
    await applyLeave({
      variables: {
        id: data?.me?.id,
        date: leave.date,
        reason: leave.reason,
      },
    });
  }

  // return for pending states

  if (loading) return <Loading />;
  if (getMeError) return <ErrorMessage>{getMeError.message}</ErrorMessage>;
  const me = data?.me;

  return (
    <>
      <IntroDiv>
        {me?.avatar && (
          <Image src={me?.avatar} alt={me?.fullname} width={50} height={50} />
        )}
        <h1>👋 Hey {me?.fullname}</h1>
        <span>Email: {me?.email}</span>
        <span>Designation: {me?.designation}</span>
        {me?.phone && <span>phone: {me?.phone}</span>}
        {me?.address && <span>address: {me?.address}</span>}
        {me?.salary && <span>salary: {me?.salary}LPA</span>}
        <span>Last Logged in: {me?.lastLoginAt}</span>
        <span>Available Leaves: {me?.availableLeaves}</span>
        <span>Total Leaves: {me?.totalLeaves}</span>
        <Button
          css={{
            my: "$4",
          }}
          filled="gray"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </IntroDiv>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <h2>Apply Leaves</h2>
      <ApplyLeave onSubmit={applyLeaveHandler}>
        <StyledInput
          type="date"
          min={formatDate(new Date())}
          name="date"
          value={leave.date}
          onChange={handleLeaveChange}
          css={{
            flex: "1 1 10ch",
          }}
          required={true}
        />
        <StyledInput
          type="text"
          name="reason"
          value={leave.reason}
          placeholder="Leave Reason...??"
          onChange={handleLeaveChange}
          css={{
            flex: "3 3 30ch",
          }}
          required={true}
        />
        <Button
          type="submit"
          filled="blue"
          outlined
          css={{
            flex: "1 1 15ch",
          }}
        >
          {leaveLoading ? "Loading..." : "Apply Leave"}
        </Button>
      </ApplyLeave>
      <Leaves>
        {me?.leaves?.map(({ _id, date, reason, status }) => (
          <Leave key={_id}>
            <div>Date: {date}</div>
            <p>Reason: {reason}</p>
            <small>{status}</small>
          </Leave>
        ))}
      </Leaves>
    </>
  );
}

export default EmployeeDashboard;
