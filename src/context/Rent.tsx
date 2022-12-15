import {createContext, FC, PropsWithChildren, useCallback, useState} from "react";
import {OwnedNft} from "alchemy-sdk";

// export interface IRentContext {
//     // rent: (address: string, tokenId: string, lendingId)
// }

export interface IRentContext {
    rentModal?: OwnedNft;
    openModal: (nft: OwnedNft, img: string) => void;
    closeModal: () => void;
}

export const RentContext = createContext<IRentContext>(null as any);

const registryAddress = '0x5ae1DA68Df290E42a3EFD52311F2Cf10f969fd35';

export const RentProvider: FC<PropsWithChildren> = ({children}) => {
    const [rentModal, setRentModal] = useState<OwnedNft & {img: string}>();

    const openModal = useCallback((nft: OwnedNft, img: string) => {
        setRentModal({...nft,  img});
    }, []);

    const closeModal = useCallback(() => {
        setRentModal(undefined);
    }, [])

    return <RentContext.Provider value={{rentModal, openModal, closeModal}}>{children}</RentContext.Provider>
}