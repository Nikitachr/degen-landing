import React from "react";



export const NoNFT = () => {
    return <div className="flex flex-col w-full h-full min-h-screen bg-white md:flex-row">
        <div className="w-full md:w-1/2 h-96 md:h-auto md:min-h-screes relative">
            <img src="/images/logo-2.png" className="w-24 md:w-36 mx-auto mt-6 md:ml-24 md:mt-8" alt=""/>
            <div className="grid gap-4 md:gap-12 w-full overflow-hidden absolute left-0 top-1/2 transform -translate-y-1/2">
                <div className="md:hidden mt-8 flex gap-3 md:gap-20 -ml-14">
                    <img className="w-20" src="/images/nfts/1.png" alt=""/>
                    <img className="w-20" src="/images/nfts/2.png" alt=""/>
                    <img className="w-20" src="/images/nfts/3.png" alt=""/>
                    <img className="w-20" src="/images/nfts/4.png" alt=""/>
                    <img className="w-20" src="/images/nfts/5.png" alt=""/>
                    <img className="w-20" src="/images/nfts/6.png" alt=""/>
                    <img className="w-20" src="/images/nfts/7.png" alt=""/>
                    <img className="w-20" src="/images/nfts/8.png" alt=""/>
                </div>
                <div className="md:hidden flex gap-3 md:gap-20 -ml-6">
                    <img className="w-20" src="/images/nfts/8.png" alt=""/>
                    <img className="w-20" src="/images/nfts/7.png" alt=""/>
                    <img className="w-20" src="/images/nfts/6.png" alt=""/>
                    <img className="w-20" src="/images/nfts/1.png" alt=""/>
                    <img className="w-20" src="/images/nfts/4.png" alt=""/>
                    <img className="w-20" src="/images/nfts/3.png" alt=""/>
                    <img className="w-20" src="/images/nfts/2.png" alt=""/>
                    <img className="w-20" src="/images/nfts/1.png" alt=""/>
                </div>

                <div className="hidden md:flex flex gap-4 md:gap-20 ml-14">
                    <img className="w-36" src="/images/nfts/1.png" alt=""/>
                    <img className="w-36" src="/images/nfts/2.png" alt=""/>
                    <img className="w-36" src="/images/nfts/3.png" alt=""/>
                    <img className="w-36" src="/images/nfts/4.png" alt=""/>
                    <img className="w-36" src="/images/nfts/5.png" alt=""/>
                </div>
                <div className="hidden md:flex flex gap-20 -ml-4">
                    <img className="w-36" src="/images/nfts/2.png" alt=""/>
                    <img className="w-36" src="/images/nfts/7.png" alt=""/>
                    <img className="w-36" src="/images/nfts/5.png" alt=""/>
                    <img className="w-36" src="/images/nfts/3.png" alt=""/>
                    <img className="w-36" src="/images/nfts/8.png" alt=""/>
                </div>
                <div className="hidden md:flex flex gap-20 -ml-24">
                    <img className="w-36" src="/images/nfts/6.png" alt=""/>
                    <img className="w-36" src="/images/nfts/1.png" alt=""/>
                    <img className="w-36" src="/images/nfts/8.png" alt=""/>
                    <img className="w-36" src="/images/nfts/4.png" alt=""/>
                    <img className="w-36" src="/images/nfts/2.png" alt=""/>
                </div>
                <div className="hidden md:flex flex gap-20 -ml-8">
                    <img className="w-36" src="/images/nfts/7.png" alt=""/>
                    <img className="w-36" src="/images/nfts/6.png" alt=""/>
                    <img className="w-36" src="/images/nfts/2.png" alt=""/>
                    <img className="w-36" src="/images/nfts/5.png" alt=""/>
                    <img className="w-36" src="/images/nfts/3.png" alt=""/>
                </div>
            </div>
        </div>
        <div className="w-full md:w-1/2 h- min-h-screen gradient-pink rounded-t-3xl md:rounded-l-3xl md:rounded-r-none p-8 md:p-20 flex flex-col items-center z-10">
            <img src="/images/degen-monkeys.png" className="-mt-24 md:mt-0" alt=""/>
            <h2 className="text-white font-bold text-2xl text-center mt-12">Looks like you dont have nft</h2>
            <a target="_blank" href="https://testnets.opensea.io/" rel="noreferrer">
                <button className="w-64 button-gradient p-3 rounded-xl text-white font-bold text-lg mt-10">Buy it on Opensea</button>
            </a>
        </div>
    </div>
}