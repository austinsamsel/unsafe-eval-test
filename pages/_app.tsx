import "../styles/globals.css";
import "../src/config/fcl";
import type {AppProps} from "next/app";

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
