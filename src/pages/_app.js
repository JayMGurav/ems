// import '../styles/globals.css'
import Layout from "@/components/Layout";
import globalStyles from "@/styles/globalStyles";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "hooks/useApolloClient";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      {globalStyles()}
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
          <div id="modal-mount-point" />
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
