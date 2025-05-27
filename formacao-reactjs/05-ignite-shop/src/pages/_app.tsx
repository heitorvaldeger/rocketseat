import { CheckoutProvider } from "@/contexts/checkout-context";
import DefaultLayout from "@/layouts/default";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.className}`}>
      <CheckoutProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </CheckoutProvider>
    </main>
  );
}
