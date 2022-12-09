import React, {useCallback, useContext, useState} from "react";

import {Button} from "@/components/Button";

import {AlchemyContext} from "@/context/Alchemy";
import {EWeb3Flow, Web3Context} from "@/context/Web3Context";

export const DegenCard = () => {
    const {selectTokenId, setStep} = useContext(Web3Context);
    const {degenCards, ownedNFTs} = useContext(AlchemyContext)
    const [selectedCard, setSelectedCard] = useState('')

    console.log(selectedCard);

    const onSelect = useCallback(() => {
        selectTokenId(selectedCard);
        if (ownedNFTs.length) {
            setStep(EWeb3Flow.GENERATE);
        } else {
            setStep(EWeb3Flow.NONFT);
        }
    }, [selectedCard])

    console.log(ownedNFTs);

    // console.log(degenCards);

    return <div className="w-full h-full px-6 py-24 md:px-12 md:py-24 lg:p-24 xl:px-48">
        <h2 className="text-white uppercase font-bold text-4xl text-center">Choose your degen card</h2>
        <div className="w-full rounded-3xl bg-white mt-8 p-6 md:p-10 lg:p-16 xl:p-20">
            {!degenCards.length
                ? <>
                    <h3 className="text-center">Looks like you don't have Degen card</h3>
                    <p className="text-center mt-4">You can buy it on Opensea</p>
                    <div className="mx-auto w-40 mt-8">
                        <a target="_blank" href="https://testnets.opensea.io/collection/degen-card-v3" rel="noreferrer">
                            <Button>Buy</Button>
                        </a>
                    </div>
                </>
                : <>
                    <div className="grid grid-cols-4 gap-2">
                        {degenCards.map(el => (
                            <div key={el.tokenId} className={`bg-white cursor-pointer h-48 w-full border rounded-2xl ${el.tokenId === selectedCard ? 'border border-black' : 'border-gray-300'}`} onClick={() => setSelectedCard(el.tokenId)}/>
                        ))}


                    </div>
                    <div className="mx-auto mt-8 max-w-2xl"><Button type="submit"
                                                                    disabled={!selectedCard} onClick={onSelect}>Submit</Button></div>
                </>
            }
        </div>
    </div>
}