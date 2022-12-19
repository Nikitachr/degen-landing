import {useWeb3Modal} from "@web3modal/react";
import React from "react";
import {useAccount} from "wagmi";

import Layout from "@/components/layout/Layout";
import {RentList} from "@/components/rent/RentList";
import {RentModal} from "@/components/rent/RentModal";
import Seo from "@/components/Seo";


export default function Rent() {
    const {open} = useWeb3Modal();
    const {isConnected} = useAccount();

    return (
        <Layout>
            <Seo/>
            <RentModal/>
            <main className="w-full min-h-screen px-4 py-16 flex items-center flex-col">
                <RentList/>
            </main>
        </Layout>
    );
}
