import { useAccount, Web3Button } from '@web3modal/react';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';

import { Button } from '@/components/Button';
import { BackgroundSelect } from '@/components/form/Backgroundselect';
import { NftOwnedSelect } from '@/components/form/NFTOwndedSelect';
import { ProviderSelect } from '@/components/form/ProviderSelect';

import { Web3Context } from '@/context/Web3Context';


export interface GeneratorFormNFT {
    image: { id: string; url: string; };
    background: string;
    provider: string;
}


export const Web3Generate = () => {
    const {account} = useAccount();
    const {createCard} = useContext(Web3Context);

    return <div className="w-full h-full px-6 py-24 md:px-12 md:py-24 lg:p-24 xl:px-36">
        <h2 className="text-white uppercase font-bold text-4xl text-center">choose the skin for the nft card</h2>
        <div className="w-full rounded-3xl bg-white mt-8 p-6 md:p-10 lg:p-16 xl:p-20">
            {account.isConnected ?
                <Formik<GeneratorFormNFT>
                    initialValues={{
                        image: { id: '', url: '' },
                        background: '',
                        provider: ''
                    }}
                    // validationSchema={GeneratorSchema}
                    onSubmit={createCard}
                >
                    <Form>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            <div>
                                <p className="text-gray-500 mb-3"><strong>Step 1.</strong> Choose monkey</p>
                                <NftOwnedSelect name="image" />
                            </div>
                            <div>
                                <p className="text-gray-500 mb-3"><strong>Step 2.</strong> Choose background</p>
                                <BackgroundSelect name="background" />
                            </div>
                            <div>
                                <p className="text-gray-500 mb-3"><strong>Step 3.</strong> Choose provider</p>
                                <ProviderSelect name="provider" />
                            </div>
                        </div>

                        <div className="mx-auto mt-8 max-w-2xl"><Button type="submit">Submit</Button></div>
                    </Form>
                </Formik>
                :
                <div className="w-full flex items-center justify-center py-12"><Web3Button/></div>
            }
        </div>
    </div>
}
