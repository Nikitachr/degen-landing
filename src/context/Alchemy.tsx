import {Alchemy, Network, Nft, OwnedNft} from 'alchemy-sdk';
import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import {getUserRentings} from "@/api/grpah";

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
    fetchNFTMetadata: (address: string, tokenId: string) => Promise<Nft>;
}

const DEGEN_CARD_ADDRESS = '0xEa46f9f309AB081d2E45B0061c80bdcCdC9D2624';
const registryAddress = '0xE35Ad9c7255e413774BC45B416e3F6B4cABEA272';

export const AlchemyContext = createContext<IAlchemyContext>(null as any)

export const AlchemyProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [ownedNFTs, setOwnedNFTs] = useState<OwnedNft[]>([]);
    const [degenCards, setDegenCards] = useState<OwnedNft[]>([]);
    const [rentNFTs, setRentNFTs] = useState<OwnedNft[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const { address } = useAccount();

    const fetchNFTMetadata = useCallback(async (address: string, tokenId: string) => {
        return alchemy.nft.getNftMetadata(address, tokenId);
    }, []);

    const fetchDegenCards = useCallback(async (account: string) => {
        setIsLoading(true);
        const nfts = await alchemy.nft.getNftsForOwner(account, {contractAddresses: [DEGEN_CARD_ADDRESS]});
        setDegenCards(nfts.ownedNfts);
        setIsLoading(false);
    }, [])

    const fetchNFTs = useCallback(async (account: string) => {
        const nfts = await alchemy.nft.getNftsForOwner(account);
        const rentedNFT = await getUserRentings(account);
        const rentedNFTs = await Promise.all(rentedNFT.map(el => alchemy.nft.getNftMetadata(el.lending.nftAddress, el.lending.tokenID)))
        setOwnedNFTs([...nfts.ownedNfts.filter(el => el.contract.address.toUpperCase() !== DEGEN_CARD_ADDRESS.toUpperCase()), ...rentedNFTs as OwnedNft[]]);
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
        rentNFTs,
        isLoading,
        fetchNFTMetadata
    }}>{children}</AlchemyContext.Provider>
}
