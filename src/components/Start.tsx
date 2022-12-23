import {useWeb3Modal} from "@web3modal/react";
import { useRouter } from 'next/router';
import Nft from 'public/svg/Nft.svg'
import Personal from 'public/svg/Personal.svg';
import React, { useCallback, useContext } from 'react'
import {useAccount} from "wagmi";

import { Button } from '@/components/Button';

import { CommonContext, FormStep } from '@/context/Common';

export const Start = () => {
    const { updateStep } = useContext(CommonContext);
    const { open } = useWeb3Modal()
    const account = useAccount();
    const router = useRouter();

    const connect = useCallback(() => {
        if (!account.isConnected) {
            open();
        }
        router.push('/web3')
    }, [router, open, account])

    return <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="px-6 xl:px-24 2xl:px-36 py-12 md:py-48 bg-white">
            <h1 className="text-dark uppercase text-3xl md:text-6xl text-center md:text-left">get your bank nft card</h1>
            <div className="flex flex-col md:flex-row mt-8 md:mt-16 md:items-center gap-4 text-xl">
                <div className="flex items-center gap-3 mr-8">
                    <Personal/>
                    <span>NFT skin for the card</span>
                </div>
                <div className="flex items-center gap-3">
                    <Nft/>
                    <span>Your virtual bank card will look the same</span>
                </div>
            </div>
            <div className="grid gap-4 mt-12">
                <Button type="submit" onClick={() => updateStep(FormStep.NftGenerator)}>Start</Button>
                <span className="text-center">or</span>
                <Button type="submit" onClick={connect}>I Have one</Button>
            </div>

        </div>
        <div className="email-bg flex items-center justify-center grid-row-1">
            <img src="/images/degen-main.png" alt="degen" className="w-full"/>
        </div>
    </div>
}

// <Formik<{ email: string }>
//     initialValues={{
//         email:  ''
//     }}
//     validationSchema={EmailSchema}
//     onSubmit={onSubmit}
// >
//     <Form className="grid mt-8 md:mt-16 gap-4 w-full">
//         <TextField label="Email" name="email" type="text" />
//         <Button type="submit">Submit</Button>
//     </Form>
// </Formik>
