import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { AppProps } from 'next/app';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { CommonContextProvider } from '@/context/Common';
import { Web3Provider } from '@/context/Web3Context';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
const chains = [chain.goerli];

const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "f970d3d777e9f9f47d000653bd380034" }),
]);
const wagmiClient = createClient({
    autoConnect: false,
    connectors: modalConnectors({ appName: "web3Modal", chains }),
    provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

// const config: ConfigOptions = {
//     projectId: 'f970d3d777e9f9f47d000653bd380034',
//     theme: 'light',
//     accentColor: 'default',
//     ethereum: {
//         appName: 'web3Modal'
//     }
// }

function MyApp({ Component, pageProps }: AppProps) {
  return <CommonContextProvider>
      <WagmiConfig client={wagmiClient}>
          <Web3Provider>
              <Component {...pageProps} />
          </Web3Provider>
      </WagmiConfig>
      <Web3Modal
          projectId="f970d3d777e9f9f47d000653bd380034"
          ethereumClient={ethereumClient}
      />
  </CommonContextProvider> ;
}

export default MyApp;
