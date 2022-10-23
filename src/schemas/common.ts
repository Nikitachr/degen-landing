import * as Yup from 'yup'
import { SchemaOf } from 'yup'

export const EmailSchema: SchemaOf<{ email: string }> = Yup.object({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required')
        .defined(),
}).defined();

export const GeneratorSchema: SchemaOf<{ imageId: string, background: string, provider: string }> = Yup.object({
    imageId: Yup.string()
        .required('image is required')
        .defined(),
    background: Yup.string()
        .required('background is required')
        .defined(),
    provider: Yup.string()
        .required('provider is required')
        .defined(),
}).defined();

export const NameSchema: SchemaOf<{ name: string }> = Yup.object({
    name: Yup.string()
        .required('name is required')
        .defined(),
}).defined();
