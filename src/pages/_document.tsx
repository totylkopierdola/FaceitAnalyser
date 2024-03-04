import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="h-full min-h-screen flex flex-col  ">
        {/* NAVIGATION */}
        <nav className="px-8 flex bg-gray-800 p-4 text-white mb-4">
          <h1 className="text-3xl font-semibold w-1/4">
            <a href="/">Faceit Analyser</a>
          </h1>
          <ul className="flex justify-end w-full items-center space-x-4 flex-column ml-4">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Players</li>
            <li className="cursor-pointer">Teams</li>
          </ul>
        </nav>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
