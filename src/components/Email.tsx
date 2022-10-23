import React, { useCallback, useContext } from 'react'
import Personal from 'public/svg/Personal.svg';
import Nft from 'public/svg/Nft.svg'
import { Form, Formik } from 'formik';
import { TextField } from '@/components/form/TextField';
import { Button } from '@/components/Button';
import { CommonContext, FormStep } from '@/context/Common';
import { EmailSchema } from '@/schemas/common';

export const Email = () => {
    const { updateEmail, updateStep } = useContext(CommonContext);
    const onSubmit = useCallback(({ email }: { email: string }) => {
        updateEmail(email);
        updateStep(FormStep.NftGenerator);
    }, [])

    return <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="px-6 xl:px-24 2xl:px-36 py-12 md:py-48 bg-white">
            <h1 className="text-dark uppercase text-3xl md:text-6xl text-center md:text-left">get your bank nft card</h1>
            <div className="flex flex-col md:flex-row mt-8 md:mt-16 md:items-center gap-4 text-xl">
                <div className="flex items-center gap-3 mr-8">
                    <Personal/>
                    <span>NFT skin for the card</span>
                </div>
                <div className="flex items-center gap-3">
                    <Nft/>
                    <span>Your virtual bank card will look the same</span>
                </div>
            </div>
            <Formik<{ email: string }>
                initialValues={{
                    email:  ''
                }}
                validationSchema={EmailSchema}
                onSubmit={onSubmit}
            >
                <Form className="grid mt-8 md:mt-16 gap-4 w-full">
                    <TextField label="Email" name="email" type="text" />
                    <Button type="submit">Submit</Button>
                </Form>
            </Formik>
        </div>
        <div className="email-bg flex items-center justify-center grid-row-1">
            <img src="/images/degen-main.png" alt="degen" className="w-full"/>
        </div>
    </div>
}
