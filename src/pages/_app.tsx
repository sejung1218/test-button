import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from 'react-query';
import One from "../components/One";


export default function App({Component, pageProps}: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/*<Component {...pageProps} />*/}
      <One/>
    </QueryClientProvider>
  );
}
