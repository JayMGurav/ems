const { useRouter } = require("next/router");
const { useLazyQuery } = require("@apollo/client");

const { LOGOUT } = require("@/gqlClient/queries");

function useLogout(to) {
  const router = useRouter();
  const [logout] = useLazyQuery(LOGOUT, {
    onCompleted: (data) => {
      if (data?.logout) {
        router.push(to);
      }
    },
  });

  return {
    logout,
  };
}

export default useLogout;
