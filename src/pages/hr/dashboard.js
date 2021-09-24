import { useQuery } from "@apollo/client";

import useLogout from "@/hooks/useLogout";
import { GET_EMPLOYEE_ME } from "@/gqlClient/queries";
import Loading from "@/components/Loading";
import ErrorMessage from "@/styledComponents/ErrorMessage";
import IntroDiv from "@/styledComponents/IntroDiv";
import Button from "@/styledComponents/Button";
import EmployeeList from "@/components/EmployeeList";

function HrDashboard() {
  const { logout } = useLogout("/hr/signin");
  const { loading, data, error: getMeError } = useQuery(GET_EMPLOYEE_ME);

  if (loading) return <Loading />;
  if (getMeError) return <ErrorMessage>{getMeError.message}</ErrorMessage>;

  const me = data?.me;
  return (
    <>
      <IntroDiv>
        <h1>👋 Hey {me?.fullname}</h1>
        <span>Email: {me?.email}</span>
        <span>Last Logged in: {me?.lastLoginAt}</span>
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
      <EmployeeList />
    </>
  );
}

export default HrDashboard;
