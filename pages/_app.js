import "../styles/globals.css";
import "@module-federation/nextjs-mf/src/include-defaults";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <div id="root">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
