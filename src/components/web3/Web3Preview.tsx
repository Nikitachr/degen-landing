import React, { useContext } from 'react';

import { Button } from '@/components/Button';
import { DownloadButton } from '@/components/DownloadButton';

import { EWeb3Flow, Web3Context } from '@/context/Web3Context';

export const Web3Preview = () => {
    const { updateStep, cardMetadata, approveImage } = useContext(Web3Context);

    return <div className="flex items-center flex-col w-full h-full px-6 py-24 md:px-12 md:py-24 lg:p-24 xl:px-36">
        <h2 className="uppercase text-3xl font-bold text-center text-white mb-5">Preview nft card image</h2>
        <img src={cardMetadata?.image} className="w-full max-w-xl mb-4" alt=""/>
        <DownloadButton url={cardMetadata?.image}/>
        <div className="flex items-center flex-col w-full md:w-fit md:flex-row items-center gap-6 mt-6">
            <div className="w-full md:w-52">
                <Button outline onClick={() => updateStep(EWeb3Flow.GENERATE)}>back</Button>
            </div>
            <div className="w-full md:w-52">
                <Button onClick={approveImage}>Approve</Button>
            </div>
        </div>
    </div>
}
