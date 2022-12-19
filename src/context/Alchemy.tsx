import { Alchemy, Network, OwnedNft } from 'alchemy-sdk';
import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const settings = {
    apiKey: 'BRg0XYVEFrprv1Yz3l7GG_F601YfaRvR',
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

export interface IAlchemyContext {
    ownedNFTs: OwnedNft[];
    degenCards: OwnedNft[];
    rentNFTs: OwnedNft[];
    isLoading: boolean;
}

const DEGEN_CARD_ADDRESS = '0xEa46f9f309AB081d2E45B0061c80bdcCdC9D2624';
const registryAddress = '0xE35Ad9c7255e413774BC45B416e3F6B4cABEA272';

export const AlchemyContext = createContext<IAlchemyContext>(null as any)

export const AlchemyProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [ownedNFTs, setOwnedNFTs] = useState<OwnedNft[]>([]);
    const [degenCards, setDegenCards] = useState<OwnedNft[]>([]);
    const [rentNFTs, setRentNFTs] = useState<OwnedNft[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const { address } = useAccount()

    const fetchDegenCards = useCallback(async (account: string) => {
        setIsLoading(true);
        const nfts = await alchemy.nft.getNftsForOwner(account, {contractAddresses: [DEGEN_CARD_ADDRESS]});
        setDegenCards(nfts.ownedNfts);
        setIsLoading(false);
    }, [])

    const fetchNFTs = useCallback(async (account: string) => {
        const nfts = await alchemy.nft.getNftsForOwner(account);
        setOwnedNFTs(nfts.ownedNfts.filter(el => el.contract.address.toUpperCase() !== DEGEN_CARD_ADDRESS.toUpperCase()));
    }, [])

    const fetchRentNFTs = useCallback(async () => {
        const nfts = await alchemy.nft.getNftsForOwner(registryAddress);
        setRentNFTs(nfts.ownedNfts);
    }, [])

    useEffect(() => {
        if (address) {
            fetchNFTs(address);
            fetchDegenCards(address);
        }
        fetchRentNFTs();
    }, [address, fetchNFTs, fetchDegenCards])

    return <AlchemyContext.Provider value={{
        ownedNFTs,
        degenCards,
        rentNFTs,
        isLoading
    }}>{children}</AlchemyContext.Provider>
}
