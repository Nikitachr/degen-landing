import {FC, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {NftMetadata, OwnedNft} from "alchemy-sdk";
import axios from "axios";
import {RentContext} from "@/context/Rent";

export const RentNFT: FC<{nft: OwnedNft}> = ({nft}) => {
    const [metadata, setMetadata] = useState<NftMetadata>()
    const { openModal } = useContext(RentContext);

    const fetchMetadata = useCallback(async (tokenUri: string) => {
        const res = await axios.get(tokenUri);
        setMetadata(res.data);
    }, [])

    useEffect(() => {
        if (nft.tokenUri?.gateway) {
            fetchMetadata(nft.tokenUri?.gateway);
        }
    }, [fetchMetadata, nft.tokenUri])

    const image = useMemo(() => {
        // @ts-ignore
        return metadata?.image?.replace("ipfs://", "https://ipfs.io/") || metadata?.image_url;
    }, [metadata]);

    return <div className="w-full h-full p-2 rounded-xl grid shadow" >
        <img className="rounded-xl mb-2" src={image} alt=""/>
        <p className="font-bold">{nft.title}</p>
        <p>0.0001 WETH</p>
        <button className="w-full mt-4 rounded-xl uppercase font-bold text-white p-2 button-gradient"
            onClick={() => openModal(nft, image)}
        >
            Rent
        </button>
    </div>
}
