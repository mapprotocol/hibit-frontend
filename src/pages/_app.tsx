import { AppProps } from 'next/app';

import Layout from '@/pages/layout'; 

import "./globals.css";



const MyApp = ({ Component, pageProps }: AppProps) => {

  return (

    <Layout>

      <Component {...pageProps} />

    </Layout>

  );

};
export default MyApp;
