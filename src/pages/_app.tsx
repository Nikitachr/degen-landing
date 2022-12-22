import {EthereumClient, modalConnectors, walletConnectProvider} from '@web3modal/ethereum';
import {Web3Modal} from '@web3modal/react';
import {AppProps} from 'next/app';
import React from "react";
import {chain, configureChains, createClient, WagmiConfig} from 'wagmi';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import {AlchemyProvider} from "@/context/Alchemy";
import {CommonContextProvider} from '@/context/Common';
import {RentProvider} from "@/context/Rent";
import {Web3Provider} from '@/context/Web3Context';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
const chains = [chain.goerli];

const {provider} = configureChains(chains, [
    walletConnectProvider({projectId: "f970d3d777e9f9f47d000653bd380034"}),
]);
const wagmiClient = createClient({
    autoConnect: false,
    connectors: modalConnectors({appName: "web3Modal", chains}),
    provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

function MyApp({Component, pageProps}: AppProps) {
    return <CommonContextProvider>
        <WagmiConfig client={wagmiClient}>
            <RentProvider>
                <Web3Provider>
                    <AlchemyProvider>
                        <Component {...pageProps} />
                    </AlchemyProvider>
                </Web3Provider>
            </RentProvider>
        </WagmiConfig>
        <Web3Modal
            projectId="f970d3d777e9f9f47d000653bd380034"
            ethereumClient={ethereumClient}
        />
    </CommonContextProvider>;
}

export default MyApp;
