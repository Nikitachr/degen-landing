import React from "react";

import Layout from "@/components/layout/Layout";
import {RentList} from "@/components/rent/RentList";
import {RentModal} from "@/components/rent/RentModal";
import Seo from "@/components/Seo";


export default function Rent() {


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
