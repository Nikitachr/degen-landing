import { ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useRouter } from 'next/router';
import { createContext, FC, PropsWithChildren, useCallback, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';

import { GeneratorFormNFT } from '@/components/web3/Web3Generate';

import {
    addEmail,
    CardMetadata,
    confirmImage, createId,
    GenerateCardResponse,
    generateNFTCard,
    getCardMetadata,
    updateName
} from '@/api/common';
import degenAbi from '@/constant/NFTABI.json';

export enum EWeb3Flow {
    GENERATE,
    PREVIEW,
    NAME
}

export interface IWeb3Context {
    step: EWeb3Flow;
    updateStep: (step: EWeb3Flow) => void;
    createCard: (value: GeneratorFormNFT) => void;
    cardMetadata?: CardMetadata;
    approveImage: () => void;
    userData?: GenerateCardResponse;
    setName: (name: string) => void;
    submitEmail: (email: string, userId: string) => void;
    mint: (metadataId: string) => void;
    isPendingTransaction: boolean;
}

const degenAddress = '0x1C99F29bc22F8CaeA74dBE2f6F5D79fcf33EaBe5';

export const Web3Context = createContext<IWeb3Context>(null as any);

export const Web3Provider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [step, setStep] = useState(EWeb3Flow.GENERATE);
    const [metadataId, setMetadataId] = useState<string>('');
    const [cardMetadata, setCardMetadata] = useState<CardMetadata>();
    const [userData, setUserData] = useState<GenerateCardResponse>();
    const [isPendingTransaction, setIsPendingTransaction] = useState(false);
    const router = useRouter();
    const {data } = useSigner();

    const { address } = useAccount();

    const updateStep = useCallback((step: EWeb3Flow) => {
        setStep(step);
    }, []);

    const getBase64FromUrl = async (url: string) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }

    const approveImage = useCallback(async () => {
        await confirmImage(metadataId);
        await setStep(EWeb3Flow.NAME);
    }, [metadataId]);

    const createCard = useCallback(async (value: GeneratorFormNFT) => {
        try {
            const { data } = await generateNFTCard(value.background, value.provider, value.image.url);
            setUserData(data);
            setMetadataId(data.owned_metadata);
            const resp = await getCardMetadata(data.owned_metadata);
            setCardMetadata(resp.data);
            setStep(EWeb3Flow.PREVIEW);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const setName = useCallback(async (name: string) => {
        try {
            if (!userData) return;
            await updateName(userData.user_id, name);
            setTimeout(() => {
                router.push(`/web3/${userData.user_id}`).then(_ => {
                    location.reload();
                });
            }, 3000)

        } catch (e) {
            console.log(e);
        }
    }, [router, userData]);

    const mint = useCallback(async (metadataId: string) => {
        setIsPendingTransaction(true);
        try {
            // @ts-ignore
            const contract = new ethers.Contract(degenAddress, degenAbi, data);
            const currentTokenId = await contract.totalSupply();
            const tx = await contract.safeMint(address);
            await tx.wait();
            await createId(metadataId, +formatUnits(currentTokenId, 'wei'));
            setIsPendingTransaction(false);
        }
        catch (e) {
            console.log(e);
            setIsPendingTransaction(false)
        }
    }, [address, data])

    const submitEmail = useCallback(async (email: string, userId: string) => {
        await addEmail(email, userId);
    }, []);

    return <Web3Context.Provider value={{ step, updateStep, createCard, cardMetadata, approveImage, setName, userData, submitEmail, mint, isPendingTransaction }}>{children}</Web3Context.Provider>
}
