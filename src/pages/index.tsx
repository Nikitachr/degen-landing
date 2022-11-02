import * as React from 'react';
import { useContext } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { Name } from '@/components/Name';
import NextImage from '@/components/NextImage';
import { CommonContext, FormStep } from '@/context/Common';
import { Generator } from '@/components/Generator';
import { Preview } from '@/components/Preview';
import { Start } from '@/components/Start';

export default function HomePage() {
    const {step} = useContext(CommonContext);
  return (
    <Layout>
      <Seo  />
      <main className="w-full min-h-screen">
          <div className="logo">
              <NextImage src="/images/savechain-logo.png" alt="logo" width={145} height={35}/>
          </div>
          {step === FormStep.Start && <Start />}
          {step === FormStep.NftGenerator && <Generator />}
          {step === FormStep.Preview && <Preview />}
          {step === FormStep.Name && <Name />}
      </main>
    </Layout>
  );
}
