// import '../styles/globals.css'
import globalStyles from "@/styles/globalStyles";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {globalStyles()}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
