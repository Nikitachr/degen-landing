import React, { createContext, FC, PropsWithChildren, useCallback, useState } from 'react';
import {
    CardMetadata,
    confirmImage,
    generateCard,
    GenerateCardResponse,
    getCardMetadata,
    updateName
} from '@/api/common';
import { GeneratorForm } from '@/components/Generator';
import { useRouter } from 'next/router';

export enum FormStep {
    Email,
    NftGenerator,
    Preview,
    Name
}

export interface ICommonContext {
    email: string;
    step: FormStep;
    updateEmail: (email: string) => void;
    updateStep: (step: FormStep) => void;
    createCard: (value: GeneratorForm) => void;
    cardMetadata?: CardMetadata;
    approveImage: () => void;
    userData?: GenerateCardResponse;
    setName: (name: string) => void;
}

export const CommonContext = createContext<ICommonContext>(null as any)

export const CommonContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(FormStep.Email);
    const [metadataId, setMetadataId] = useState<string>('');
    const [cardMetadata, setCardMetadata] = useState<CardMetadata>();
    const [userData, setUserData] = useState<GenerateCardResponse>()
    const router = useRouter();

    const updateEmail = useCallback((email: string) => {
        setEmail(email);
    }, []);

    const updateStep = useCallback((step: FormStep) => {
        setStep(step);
    }, []);

    const createCard = useCallback(async (value: GeneratorForm) => {
        try {
            const { data } = await generateCard(value.background, value.provider, email, value.imageId);
            setUserData(data);
            setMetadataId(data.owned_metadata);
            const resp = await getCardMetadata(data.owned_metadata);
            setCardMetadata(resp.data);
            setStep(FormStep.Preview);
        } catch (e) {
            console.log(e);
        }
    }, [email]);

    const approveImage = useCallback(async () => {
        await confirmImage(metadataId);
        await setStep(FormStep.Name);
    }, [metadataId]);

    const setName = useCallback(async (name: string) => {
        try {
            if (!userData) return;
            await updateName(userData.user_id, name);
            setTimeout(() => {
                router.push(`/${userData.user_id}`);
            }, 1000)

        } catch (e) {
            console.log(e);
        }
    }, [userData])

    return <CommonContext.Provider value={{email, step, updateEmail, updateStep, createCard, cardMetadata, approveImage, setName, userData}}>{children}</CommonContext.Provider>
}
