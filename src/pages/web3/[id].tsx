import { useWeb3Modal } from '@web3modal/react';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useCallback, useContext, useState } from 'react';
import { useAccount } from 'wagmi';

import { Button } from '@/components/Button';
import { DownloadButton } from '@/components/DownloadButton';
import { TextField } from '@/components/form/TextField';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { CardMetadata, GenerateCardResponse, getCardMetadata, getUserById } from '@/api/common';
import { Web3Context } from '@/context/Web3Context';

import InfoIcon from '~/svg/Info.svg';

export default function User({
                                 userData,
                                 meta,
                                 isEmail,
                             }: { userData: GenerateCardResponse, meta: CardMetadata, isEmail: boolean, }) {
    const { submitEmail, mint, isPendingTransaction } = useContext(Web3Context);
    const [isMinted, setIsMinted] = useState(meta.tokenId !== null);
    const [hasEmail, setHasEmail] = useState(isEmail);
    const account = useAccount();
    const { open } = useWeb3Modal();

    const mintClick = useCallback(async () => {
        if (!account.isConnected) {
            open();
            return
        }
        try {
            await mint(userData.owned_metadata);
            setIsMinted(true);
        } catch (e) {
            console.log(e);
        }
    }, [mint, userData.owned_metadata])

    const onSubmitEmail = useCallback(async ({ email }: { email: string }, helpers: FormikHelpers<{email: string}>) => {
        try {
            await submitEmail(email, userData.user_id);
            // @ts-ignore
            helpers.setValues({address: ""})
            setHasEmail(true);
        } catch (e) {
            console.log(e);
        }
    }, [submitEmail, userData.user_id])

    return (
        <Layout>
            <Seo/>
            <main className="w-full min-h-screen">
                <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
                    <div className="px-6 md:pl-16 xl:pl-36 py-12 md:py-40 md:pr-12">
                        <div className="flex justify-center md:justify-between">
                            <NextImage src="/images/savechain-logo.png" alt="logo" width={145} height={35}/>
                        </div>
                        <h2 className="text-white text-3xl md:text-4xl mt-3 md:mt-5 font-bold uppercase text-center md:text-left">
                            {userData.transferred ? 'Your nft is successfully minted' : 'Your nft card is waiting for mint'}
                        </h2>
                        <img src={meta.image} className="w-full mt-5 md:mt-10" alt=""/>
                        <div className="flex justify-center md:justify-start mt-5"><DownloadButton url={meta.image}/>
                        </div>
                        <h3 className="font-bold text-white mb-0 mt-6 md:mt-20 uppercase text-center md:text-left">degen.cards</h3>
                    </div>
                    <div className="bg-white px-6 py-12 md:pl-12 md:py-40 md:pr-16 xl:pr-36">
                        {!isMinted && <div className="flex items-center gap-5 icon">
                            {hasEmail ? <>
                                    <span className="font-bold text-2xl">Mint</span>
                                </> :
                                <span className="font-bold text-2xl">Email</span>
                            }
                        </div>}
                        {!isMinted && (hasEmail ?
                            <div className="mb-8 mt-2">
                                {isPendingTransaction ? <span>Transaction is pending...</span> : <Button type="button" onClick={mintClick}>mint</Button>}
                            </div>
                            :
                            <Formik<{ email: string }>
                                initialValues={{
                                    email: ''
                                }}
                                onSubmit={onSubmitEmail}
                            >
                                <Form className="w-full mt-5 mb-6 grid gap-4 md:mb-12">
                                    <TextField label="Email" name="email" type="text"/>
                                    <Button type="submit">Submit</Button>
                                </Form>

                            </Formik>

                        )}
                        <div className="flex items-center gap-4">
                            <div
                                className={`w-5 min-w-5 h-5 rounded-full gap-5 ${isMinted ? 'bg-green' : 'bg-gray-400'}`}/>
                            <span className={`${!isMinted && 'text-gray-400'} font-bold text-2xl`}>
                                {isMinted ? 'Your nft card is successfully minted' : 'Your NFT card is waiting to be minted'}
                            </span>
                        </div>
                        {!isMinted && <p className="text-lg mt-2">
                            you will get email when the card is minted
                            <br/>
                            you can close this page
                        </p>
                        }

                        <div className="bg-grayBg info-icon w-full mt-10 md:mt-20 p-3 rounded-2xl flex gap-3">
                            <InfoIcon/>
                            <p>You can activate minted NFT card as virtual debit card with the same skin at SaveChain
                                app that will be available at <a
                                    className="underline" href="https://www.savechain.com/">savechain.com</a></p>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export async function getServerSideProps(ctx: any) {
    const id = ctx.params.id;
    const { data } = await getUserById(id);
    const meta = await getCardMetadata(data.owned_metadata);
    return { props: { userData: data, meta: meta.data, isEmail: !!data.email } }
}
