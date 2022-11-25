import { Form, Formik } from 'formik';
import React, { useCallback, useContext } from 'react';

import { Button } from '@/components/Button';
import { BackgroundSelect } from '@/components/form/Backgroundselect';
import { NftSelect } from '@/components/form/ImageSelect';
import { ProviderSelect } from '@/components/form/ProviderSelect';

import { CommonContext } from '@/context/Common';
import { GeneratorSchema } from '@/schemas/common';

export interface GeneratorForm {
    imageId: string;
    background: string;
    provider: string;
}

export const Generator = () => {
    const { createCard } = useContext(CommonContext)

    const onSubmit = useCallback((val: GeneratorForm) => {
        createCard(val);
    }, [createCard]);

    return <div className="w-full h-full px-6 py-24 md:px-12 md:py-24 lg:p-24 xl:px-36">
        <h2 className="text-white uppercase font-bold text-4xl text-center">choose the skin for the nft card</h2>
        <div className="w-full rounded-3xl bg-white mt-8 p-6 md:p-10 lg:p-16 xl:p-20">
            <Formik<GeneratorForm>
                initialValues={{
                    imageId:  '',
                    background: '',
                    provider: ''
                }}
                validationSchema={GeneratorSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        <div>
                            <p className="text-gray-500 mb-3"><strong>Step 1.</strong> Choose monkey</p>
                            <NftSelect name="imageId" />
                        </div>
                        <div>
                            <p className="text-gray-500 mb-3"><strong>Step 2.</strong> Choose background</p>
                            <BackgroundSelect name="background" />
                        </div>
                        <div>
                            <p className="text-gray-500 mb-3"><strong>Step 3.</strong> Choose provider</p>
                            <ProviderSelect name="provider" />
                        </div>
                    </div>

                    <div className="mx-auto mt-8 max-w-2xl"><Button type="submit">Submit</Button></div>
                </Form>
            </Formik>
        </div>
    </div>
}
