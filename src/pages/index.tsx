import * as React from 'react';
import { useContext } from 'react';

import { Generator } from '@/components/Generator';
import Layout from '@/components/layout/Layout';
import { Name } from '@/components/Name';
import NextImage from '@/components/NextImage';
import { Preview } from '@/components/Preview';
import Seo from '@/components/Seo';
import { Start } from '@/components/Start';

import { CommonContext, FormStep } from '@/context/Common';

export default function HomePage() {
    const { step } = useContext(CommonContext);
    return (
        <Layout>
            <Seo/>
            <main className="w-full min-h-screen">
                <div className="logo">
                    <NextImage src="/images/savechain-logo.png" alt="logo" width={145} height={35}/>
                </div>
                {step === FormStep.Start && <Start/>}
                {step === FormStep.NftGenerator && <Generator/>}
                {step === FormStep.Preview && <Preview/>}
                {step === FormStep.Name && <Name/>}
            </main>
        </Layout>
    );
}
