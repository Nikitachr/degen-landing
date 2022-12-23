import React, {useCallback, useContext, useEffect} from "react";
import {AlchemyContext} from "@/context/Alchemy";
import {RentNFT} from "@/components/rent/RentNFT";
import {OwnedNft} from "alchemy-sdk";
import {RentModal} from "@/components/rent/RentModal";
import {RentContext} from "@/context/Rent";
import {useWeb3Modal} from "@web3modal/react";
import {useAccount} from "wagmi";

export const RentList = () => {
    const {lendings} = useContext(RentContext);
    const {open} = useWeb3Modal();
    const {isConnected} = useAccount();

    useEffect(() => {
        if (!isConnected && open) {
            setTimeout(() => {open()}, 100)
        }
    }, [isConnected, open])

    return <div className="bg-white w-full max-w-5xl rounded-3xl p-8">
        <h2 className="text-center mb-10">Rentable NFTs</h2>
        <div className="grid grid-cols-4 gap-4">{lendings.map(el => (
            <div key={el.id}>
                <RentNFT nft={el}/>
            </div>
        ))}</div>
    </div>
}