import { useRouter } from "next/router";
import "@/styles/globals.moduel.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/Store";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router.pathname);

  useEffect(() => {
    // Redirect logic
    if (
      router.pathname !== "/" &&
      router.pathname !== "/reg" &&
      router.pathname !== "/verfication" &&
      router.pathname !== "/Forget"
    ) {
      router.push("/Redirect");
    }
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
