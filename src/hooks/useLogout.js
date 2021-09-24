const { useEffect } = require("react");
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

  useEffect(() => {
    const handleRouteChange = () => {
      // doing hard client reload after using clear-site-date header so subsequent
      //  request can reset cache, cookies ...
      // router.reload();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    logout,
  };
}

export default useLogout;
