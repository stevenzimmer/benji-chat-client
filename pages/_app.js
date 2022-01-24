import "@material-tailwind/react/tailwind.css";
import "@/styles/globals.css";
import { StateContextProvider } from "@/context/StateContextProvider";

function MyApp({ Component, pageProps }) {
    return (
        <StateContextProvider>
            <Component {...pageProps} />
        </StateContextProvider>
    );
}

export default MyApp;
