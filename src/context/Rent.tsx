import {useWeb3Modal} from "@web3modal/react";
import {OwnedNft} from "alchemy-sdk";
import {BigNumber, ethers} from "ethers";
import {parseEther} from "ethers/lib/utils";
import {createContext, FC, PropsWithChildren, useCallback, useState} from "react";
import { useSigner} from "wagmi";

import TokenABI from "@/constant/ERC20ABI.json";
import RegistryABI from "@/constant/RegistryABI.json";

export interface IRentContext {
    rentModal?: OwnedNft & {img: string};
    openModal: (nft: OwnedNft, img: string) => void;
    rent: (duration: number) => void;
    closeModal: () => void;
}

export const RentContext = createContext<IRentContext>(null as any);

const registryAddress = '0xE35Ad9c7255e413774BC45B416e3F6B4cABEA272';
const wethAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';

export const RentProvider: FC<PropsWithChildren> = ({children}) => {
    const signer = useSigner();
    const {open, isOpen, close} = useWeb3Modal();
    const [rentModal, setRentModal] = useState<OwnedNft & {img: string}>();

    console.log(isOpen);

    const openModal = useCallback((nft: OwnedNft, img: string) => {
        setRentModal({...nft,  img});
    }, []);

    const closeModal = useCallback(() => {
        setRentModal(undefined);
    }, []);

    const rent = useCallback(async (duration: number) => {
        if (!rentModal) return;
        if (!signer.data) {
            open();
            return
        };
        const contract = new ethers.Contract(registryAddress, RegistryABI, signer.data)
        const token = new ethers.Contract(wethAddress, TokenABI, signer.data)
        const tx = await token.approve(registryAddress,  parseEther((0.0001 * duration).toFixed(4).toString()));
        await tx.wait();
        await contract.rent([0], [rentModal.contract.address], [BigNumber.from(rentModal.tokenId)], [1], [1], [1]);
    }, [signer, rentModal])

    return <RentContext.Provider value={{rentModal, openModal, closeModal, rent}}>{children}</RentContext.Provider>
}