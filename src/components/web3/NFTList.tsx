import React, { useContext } from 'react';

import { NFTItem } from '@/components/web3/NFTItem';

import { AlchemyContext } from '@/context/Alchemy';

export const NFTList = () => {
    const { ownedNFTs } = useContext(AlchemyContext);

    return <div className="grid grid-cols-4 gap-2">
        {ownedNFTs.map(el => <NFTItem key={el.tokenId} nft={el}/>)}
    </div>
}
