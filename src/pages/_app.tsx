import { ConfigOptions } from '@web3modal/core';
import { Web3Modal } from '@web3modal/react';
import { AppProps } from 'next/app';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { CommonContextProvider } from '@/context/Common';
import { Web3Provider } from '@/context/Web3Context';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

const config: ConfigOptions = {
    projectId: 'f970d3d777e9f9f47d000653bd380034',
    theme: 'light',
    accentColor: 'default',
    ethereum: {
        appName: 'web3Modal'
    }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <CommonContextProvider>
      <Web3Provider>
          <Component {...pageProps} />
          <Web3Modal config={config} />
      </Web3Provider>
  </CommonContextProvider> ;
}

export default MyApp;
