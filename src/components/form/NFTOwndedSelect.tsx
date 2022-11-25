import { useField } from 'formik';
import React, { FC, useContext } from 'react';

import { NFTItem } from '@/components/web3/NFTItem';

import { AlchemyContext } from '@/context/Alchemy';

interface INftSelect {
    name: string
}


export const NftOwnedSelect: FC<INftSelect> = ({ ...props }) => {
    const [field, , helpers] = useField(props)
    const { ownedNFTs } = useContext(AlchemyContext);

    return (
        <div className="grid grid-cols-4 md:grid-cols-2 gap-2 md:gap-3">
            {ownedNFTs.map((el) => (
                <div
                    key={el.tokenId}
                    className={`transition  overflow-hidden rounded-2xl cursor-pointer border-2 ${el.tokenId === field.value.id ? 'border-black' : 'border-gray-300'}`}
                >
                    <NFTItem nft={el} onClick={(s) => helpers.setValue({ id: el.tokenId, url: s })}/>
                </div>
            ))}
        </div>
    )
}
