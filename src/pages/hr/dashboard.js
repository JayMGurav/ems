import Loading from "@/components/Loading";
import { GET_HR_ME } from "@/gqlClient/queries";
import { useQuery } from "@apollo/client";

function HrDashboard() {
  const { loading, error, data } = useQuery(GET_HR_ME);
  console.log({ data });

  if (loading) return <Loading />;

  return <h1>Hr dashboard</h1>;
}

export default HrDashboard;
