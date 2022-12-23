import {unpackPrice} from "@renft/sdk";
import {Nft, NftMetadata} from "alchemy-sdk";
import axios from "axios";
import {FC, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useAccount} from "wagmi";

import {Lending} from "@/api/grpah";
import {AlchemyContext} from "@/context/Alchemy";
import {RentContext} from "@/context/Rent";

export const RentNFT: FC<{ nft: Lending }> = ({nft}) => {
    const {fetchNFTMetadata} = useContext(AlchemyContext);
    const [metadata, setMetadata] = useState<NftMetadata>();
    const [nftInfo, setNFTInfo] = useState<Nft>();
    const {openModal, returnNFT} = useContext(RentContext);
    const {address} = useAccount();


    const fetchNFT = useCallback(async () => {
        const metadata = await fetchNFTMetadata(nft.nftAddress, nft.tokenID);
        setNFTInfo(metadata);
        console.log(metadata);
        await fetchMetadata(metadata?.tokenUri?.gateway || '');
    }, [])

    useEffect(() => {
        fetchNFT()
    }, [])

    const fetchMetadata = useCallback(async (tokenUri: string) => {
        const res = await axios.get(tokenUri);
        setMetadata(res.data);
    }, [])

    const image = useMemo(() => {
        // @ts-ignore
        if (nftInfo?.media[0]?.gateway) {
            return nftInfo?.media[0]?.gateway
        }
        return metadata?.image?.replace("ipfs://", "https://ipfs.io/") || metadata?.image_url;
    }, [metadata]);

    return <div className="w-full h-full p-2 rounded-xl grid shadow">
        <img className="rounded-xl mb-2" src={image} alt=""/>
        <p className="font-bold">{nftInfo?.title}</p>
        <p>{unpackPrice(nft.dailyRentPrice)} WETH/day</p>
        {(nft.renting[0]?.renterAddress.toLowerCase() === address?.toLowerCase() &&
            <button
                    className="w-full mt-4 rounded-xl uppercase font-bold text-white p-2 button-gradient"
                    onClick={() => returnNFT(nft.nftAddress, nft.tokenID, nft.id, nft.renting[0].id)}
            >
                Return
            </button>)
        }
        {nftInfo && ((nft.renting[0]?.renterAddress.toLowerCase() || '') !== address?.toLowerCase()) &&
            <button disabled={!!nft.renting.length}
                    className={`w-full mt-4 rounded-xl uppercase font-bold text-white p-2  ${nft.renting.length ? 'bg-gray-300' : 'button-gradient'}`}
                    onClick={() => openModal({...nftInfo, ...nft}, image)}
            >
                {nft.renting.length ? 'Rented' : 'Rent'}
            </button>}
    </div>
}
