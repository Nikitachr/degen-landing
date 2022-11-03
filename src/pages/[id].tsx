import React, { useCallback, useContext, useState } from 'react'
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import NextImage from '@/components/NextImage';

import WalletIcon from 'public/svg/Wallet.svg';
import { Form, Formik } from 'formik';
import { TextField } from '@/components/form/TextField';
import InfoIcon from 'public/svg/Info.svg';
import { CardMetadata, GenerateCardResponse, getCardMetadata, getUserById } from '@/api/common';
import { DownloadButton } from '@/components/DownloadButton';
import { Button } from '@/components/Button';
import { CommonContext } from '@/context/Common';

export default function User({
                                 userData,
                                 meta,
                                 isEmail
                             }: { userData: GenerateCardResponse, meta: CardMetadata, isEmail: boolean }) {
    const { addWallet, submitEmail } = useContext(CommonContext);

    const [transferAddress, setTransferAddress] = useState<string | undefined>(userData.transfer_address || undefined)
    const [hasEmail, setHasEmail] = useState(isEmail);

    const onSubmit = useCallback(async ({ address }: { address: string }) => {
        try {
            await addWallet(address, userData.user_id);
            setTransferAddress(address);
        } catch (e) {
            console.log(e);
        }
    }, [])

    const onSubmitEmail = useCallback(async ({ email }: { email: string }) => {
        try {
            await submitEmail(email, userData.user_id);
            setHasEmail(true);
        } catch (e) {
            console.log(e);
        }
    }, [])

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
                        <div className="flex items-center gap-5 icon">
                            {hasEmail ? <>
                                    <WalletIcon/>
                                    <span className="font-bold text-2xl">Wallet address (erc20)</span>
                                </> :
                                <span className="font-bold text-2xl">Email</span>
                            }
                        </div>
                        {hasEmail ? transferAddress ?
                                <span className="font-bold text-sm mt-3 mb-12 block truncate">{transferAddress}</span>
                                : <Formik<{ address: string }>
                                    initialValues={{
                                        address: ''
                                    }}
                                    onSubmit={onSubmit}
                                >
                                    <Form className="w-full mt-5 mb-6 grid gap-4 md:mb-12">
                                        <TextField label="Address" name="address" type="text"/>
                                        <Button type="submit">Submit</Button>
                                        <p>If you don’t have wallet now,it’s ok. You can close this page and add wallet
                                            later.
                                            Just click on the link in the email that was sent to you.</p>
                                    </Form>

                                </Formik>
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

                        }
                        <div className="flex items-center gap-4">
                            <div
                                className={`w-5 min-w-5 h-5 rounded-full gap-5 ${userData.transferred ? 'bg-green' : 'bg-gray-400'}`}/>
                            <span className={`${!userData.transferred && 'text-gray-400'} font-bold text-2xl`}>
                                {userData.transferred ? 'Your nft card is successfully minted' : 'Your NFT card is waiting to be minted'}
                            </span>
                        </div>
                        {!userData.transferred && <p className="text-lg mt-2">
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
    console.log(meta.data);
    return { props: { userData: data, meta: meta.data, isEmail: !!data.email } }
}
