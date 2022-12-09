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
    isLoading: boolean;
}

const DEGEN_CARD_ADDRESS = '0xaC65D0033B7b484DcD782693B06f8636e5948e4C';

export const AlchemyContext = createContext<IAlchemyContext>(null as any)

export const AlchemyProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [ownedNFTs, setOwnedNFTs] = useState<OwnedNft[]>([]);
    const [degenCards, setDegenCards] = useState<OwnedNft[]>([]);
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

    useEffect(() => {
        if (address) {
            fetchNFTs(address);
            fetchDegenCards(address);
        }
    }, [address, fetchNFTs, fetchDegenCards])

    return <AlchemyContext.Provider value={{
        ownedNFTs,
        degenCards,
        isLoading
    }}>{children}</AlchemyContext.Provider>
}
