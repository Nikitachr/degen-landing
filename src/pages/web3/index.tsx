import React, {useContext, useEffect} from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import {DegenCard} from "@/components/web3/DegenCard";
import {NoNFT} from "@/components/web3/NoNFT";
import {Web3Generate} from '@/components/web3/Web3Generate';
import {Web3Name} from '@/components/web3/Web3Name';
import {Web3Preview} from '@/components/web3/Web3Preview';

import {AlchemyProvider} from '@/context/Alchemy';
import {EWeb3Flow, Web3Context} from '@/context/Web3Context';
import {useWeb3Modal} from "@web3modal/react";
import {useAccount} from "wagmi";

export default function Web3() {
    const {step} = useContext(Web3Context);
    const {open} = useWeb3Modal();
    const {isConnected} = useAccount();
    useEffect(() => {
        if (!isConnected) {
            open();
        }
    }, [isConnected])

    return (
        <Layout>
            <Seo/>
            <main className="w-full min-h-screen">
                {step === EWeb3Flow.DEGEN && <DegenCard/>}
                {step === EWeb3Flow.NONFT && <NoNFT/>}
                {step === EWeb3Flow.GENERATE && <Web3Generate/>}
                {step === EWeb3Flow.PREVIEW && <Web3Preview/>}
                {step === EWeb3Flow.NAME && <Web3Name/>}
            </main>
        </Layout>
    );
}
