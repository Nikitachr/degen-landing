import {useWeb3Modal} from "@web3modal/react";
import {Nft} from "alchemy-sdk";
import {BigNumber, ethers} from "ethers";
import {parseEther} from "ethers/lib/utils";
import {createContext, FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {useSigner} from "wagmi";

import {getLandings, Lending} from "@/api/grpah";
import TokenABI from "@/constant/ERC20ABI.json";
import RegistryABI from "@/constant/RegistryABI.json";

export interface IRentContext {
    rentModal?: Nft & Lending & { img: string };
    openModal: (nft: Nft & Lending, img: string) => void;
    rent: (duration: number) => void;
    closeModal: () => void;
    lendings: Lending[];
    returnNFT: (nftAddress: string, tokenId: string, lendingId: string, rentingId: string) => Promise<void>;
}

export const RentContext = createContext<IRentContext>(null as any);

const registryAddress = '0xE35Ad9c7255e413774BC45B416e3F6B4cABEA272';
const wethAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';

export const RentProvider: FC<PropsWithChildren> = ({children}) => {
    const signer = useSigner();
    const {open} = useWeb3Modal();
    const [rentModal, setRentModal] = useState<Nft & Lending & { img: string }>();
    const [lendings, setLendings] = useState<Lending[]>([]);

    const fetchLendings = useCallback(async () => {
        const res = await getLandings();
        setLendings(res);
    }, [])

    useEffect(() => {
        fetchLendings();
    }, []);

    const openModal = useCallback((nft: Nft & Lending, img: string) => {
        setRentModal({...nft, img});
    }, []);

    const closeModal = useCallback(() => {
        setRentModal(undefined);
    }, []);

    const rent = useCallback(async (duration: number) => {
        if (!rentModal) return;
        if (!signer.data) {
            open();
            return
        }
        ;
        const contract = new ethers.Contract(registryAddress, RegistryABI, signer.data)
        const token = new ethers.Contract(wethAddress, TokenABI, signer.data)
        const tx = await token.approve(registryAddress, parseEther((0.0001 * duration).toFixed(4).toString()));
        await tx.wait();
        const tx2 = await contract.rent([0], [rentModal.contract.address], [BigNumber.from(rentModal.tokenId)], [rentModal.id], [1], [1]);
        await tx2.wait();
        fetchLendings();
    }, [signer, rentModal]);

    const returnNFT = useCallback(async (nftAddress: string, tokenId: string, lendingId: string, rentingId: string) => {
        if (!signer.data) {
            open();
            return
        }
        ;
        const contract = new ethers.Contract(registryAddress, RegistryABI, signer.data);
        const tx = await contract.stopRent([0], [nftAddress], [tokenId], [lendingId], [rentingId]);
        await tx.wait();
        fetchLendings();
    }, [signer])

    return <RentContext.Provider
        value={{rentModal, openModal, closeModal, rent, lendings, returnNFT}}>{children}</RentContext.Provider>
}