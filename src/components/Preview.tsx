import React, { useContext } from 'react';
import { Button } from '@/components/Button';
import { CommonContext, FormStep } from '@/context/Common';
import { DownloadButton } from '@/components/DownloadButton';

export const Preview = () => {
    const { updateStep, cardMetadata, approveImage } = useContext(CommonContext);

    return <div className="flex items-center flex-col w-full h-full px-6 py-24 md:px-12 md:py-24 lg:p-24 xl:px-36">
        <h2 className="uppercase text-3xl font-bold text-center text-white mb-5">Preview nft card image</h2>
        <img src={cardMetadata?.image} className="w-full max-w-xl mb-4" alt=""/>
        <DownloadButton url={cardMetadata?.image}/>
        <div className="flex items-center flex-col w-full md:w-fit md:flex-row items-center gap-6 mt-6">
            <div className="w-full md:w-52">
                <Button outline onClick={() => updateStep(FormStep.NftGenerator)}>back</Button>
            </div>
            <div className="w-full md:w-52">
                <Button onClick={approveImage}>Approve</Button>
            </div>
        </div>
    </div>
}
