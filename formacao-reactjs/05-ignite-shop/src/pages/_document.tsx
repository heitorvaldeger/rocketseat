import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />{" "}
      </Head>
      <body className="bg-gray-900 text-gray-100 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
