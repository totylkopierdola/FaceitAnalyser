import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PlayerDataProvider } from "./hooks/PlayerDataContext";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlayerDataProvider>
      <Navbar />
      <Component {...pageProps} />
    </PlayerDataProvider>
  );
}
