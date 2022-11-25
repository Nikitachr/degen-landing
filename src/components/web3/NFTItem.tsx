import { NftMetadata, OwnedNft } from 'alchemy-sdk';
import axios from 'axios';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

export const NFTItem: FC<{nft: OwnedNft, onClick: (s: string) => void}> = ({nft, onClick}) => {
    const [metadata, setMetadata] = useState<NftMetadata>()

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
        return metadata?.image?.replace("ipfs://", "https://ipfs.io/");
    }, [metadata]);

    console.log(image);

    return <div className="w-full h-full rounded grid gap-2" onClick={() => onClick(image || '')}>
        <img src={image} alt=""/>
    </div>
}
