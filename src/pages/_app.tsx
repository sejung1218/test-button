import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from 'react-query';
import One from "../components/One";
import NameNumber from "@/components/NameNumber";
import styled from "@emotion/styled";


export default function App({Component, pageProps}: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/*<Component {...pageProps} />*/}

      <TestButtonWrapper>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <TitleEmon>EMON 임시 데이터 재전송</TitleEmon>
        </div>
        <NameNumber/>
        <One/>
      </TestButtonWrapper>
    </QueryClientProvider>
  );
}
const TestButtonWrapper = styled.div`
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #3b3b3b;
  color: white;
`;
const TitleEmon = styled.div`
  display: flex;
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 12px;
  align-items: center;
  justify-content: center;
  width: fit-content;
`