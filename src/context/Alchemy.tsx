import { useAccount } from '@web3modal/react';
import { Alchemy, Network, OwnedNft } from 'alchemy-sdk';
import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';

const settings = {
    apiKey: 'BRg0XYVEFrprv1Yz3l7GG_F601YfaRvR',
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

export interface IAlchemyContext {
    ownedNFTs: OwnedNft[]
}

export const AlchemyContext = createContext<IAlchemyContext>(null as any)

export const AlchemyProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [ownedNFTs, setOwnedNFTs] = useState<OwnedNft[]>([]);
    const { account } = useAccount()


    const fetchNFTs = useCallback(async (account: string) => {
        const nfts = await alchemy.nft.getNftsForOwner(account);
        setOwnedNFTs(nfts.ownedNfts);
    }, [])

    useEffect(() => {
        if (account.address) {
            fetchNFTs(account.address);
        }
    }, [account.address, fetchNFTs])

    return <AlchemyContext.Provider value={{
        ownedNFTs
    }}>{children}</AlchemyContext.Provider>
}
