import React, {useCallback, useContext} from "react";
import {AlchemyContext} from "@/context/Alchemy";
import {RentNFT} from "@/components/rent/RentNFT";
import {OwnedNft} from "alchemy-sdk";
import {RentModal} from "@/components/rent/RentModal";

export const RentList = () => {
    const {rentNFTs} = useContext(AlchemyContext);

    return <div className="bg-white w-full max-w-5xl rounded-3xl p-8">
        <h2 className="text-center mb-10">Rentable NFTs</h2>
        <div className="grid grid-cols-4 gap-4">{rentNFTs.map(el => (
            <div key={el.tokenId + el.contract.address}>
                <RentNFT nft={el}/>
            </div>
        ))}</div>
    </div>
}