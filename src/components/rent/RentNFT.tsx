import {FC, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Nft, NftMetadata, OwnedNft} from "alchemy-sdk";
import axios from "axios";
import {RentContext} from "@/context/Rent";
import {Lending} from "@/api/grpah";
import {AlchemyContext} from "@/context/Alchemy";
import {unpackPrice} from "@renft/sdk";

export const RentNFT: FC<{nft: Lending}> = ({nft}) => {
    const { fetchNFTMetadata } = useContext(AlchemyContext);
    const [metadata, setMetadata] = useState<NftMetadata>();
    const [nftInfo, setNFTInfo] = useState<Nft>();
    const { openModal } = useContext(RentContext);

    const fetchNFT = useCallback(async () => {
        const metadata = await fetchNFTMetadata(nft.nftAddress, nft.tokenID);
        setNFTInfo(metadata);
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
        return metadata?.image?.replace("ipfs://", "https://ipfs.io/") || metadata?.image_url;
    }, [metadata]);

    return <div className="w-full h-full p-2 rounded-xl grid shadow" >
        <img className="rounded-xl mb-2" src={image} alt=""/>
        <p className="font-bold">{nftInfo?.title}</p>
        <p>{unpackPrice(nft.dailyRentPrice)} WETH/day</p>
        {nftInfo && <button className="w-full mt-4 rounded-xl uppercase font-bold text-white p-2 button-gradient"
                 onClick={() => openModal({...nftInfo, ...nft}, image)}
        >
            Rent
        </button>}
    </div>
}
