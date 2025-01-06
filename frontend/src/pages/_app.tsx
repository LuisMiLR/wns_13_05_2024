import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import Header from "@/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// désactive le SSR
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
