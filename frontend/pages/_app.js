import '/src/globals.css'
import React from 'react';
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import Router from "next/router";

function MyApp({ Component, pageProps, router }) {
  return  (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`  
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
         `}
      </Script>
      
      <Head>
        <title>Slime Rancher Assistant</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;