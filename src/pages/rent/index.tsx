import {useWeb3Modal} from "@web3modal/react";
import React, {useContext, useEffect} from "react";
import {useAccount} from "wagmi";

import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";

import {RentProvider} from "@/context/Rent";
import {RentList} from "@/components/rent/RentList";
import {RentModal} from "@/components/rent/RentModal";

export default function Rent() {
    const { open } = useWeb3Modal();
    const { isConnected } = useAccount();

    useEffect(() => {
        if (!isConnected) {
            open();
        }
    }, [isConnected])

    return (
        <RentProvider>
            <Layout>
                <Seo/>
                <RentModal/>
                <main className="w-full min-h-screen px-4 py-16 flex items-center flex-col">
                    <RentList/>
                </main>
            </Layout>
        </RentProvider>

    );
}
