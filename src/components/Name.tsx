import React, { useCallback, useContext } from 'react';
import { Form, Formik } from 'formik';
import { TextField } from '@/components/form/TextField';
import { Button } from '@/components/Button';
import { CommonContext } from '@/context/Common';
import { useRouter } from 'next/router';
import { DownloadButton } from '@/components/DownloadButton';
import { NameSchema } from '@/schemas/common';

export const Name = () => {
    const { cardMetadata, userData, setName } = useContext(CommonContext);
    const router = useRouter()

    const onSubmit = useCallback(({ name }: { name: string }) => {
        console.log(name);
        setName(name);
    }, [])

    const onSkip = useCallback(() => {
        if (!userData) return;
        router.push(`/${userData.user_id}`);
    }, [userData])

    return <div className="px-6 py-32 md:px-12 md:py-40 lg:px-24 xl:px-36">
        <h2 className="text-white uppercase font-bold text-3xl">Personalise nft card</h2>
        <div className="flex items-center flex-row gap-8 mt-5 flex-col md:flex-row">
            <img className="w-full md:w-3/5" src={cardMetadata?.image} alt=""/>
            <div className="w-full md:w-2/5">
                <Formik<{ name: string }>
                    initialValues={{
                        name:  ''
                    }}
                    validationSchema={NameSchema}
                    onSubmit={onSubmit}
                >
                    <Form className="w-full">
                        <TextField label="Name" name="name" type="text" />
                        <div className="flex justify-center md:justify-start mt-5"><DownloadButton url={cardMetadata?.image}/></div>
                        <div className="flex items-center gap-5 mt-5 flex-col md:flex-row">
                            <Button onClick={onSkip} type="button" outline>Skip</Button>
                            <Button type="submit">Approve</Button>
                        </div>

                    </Form>
                </Formik>
            </div>
        </div>

    </div>
}
