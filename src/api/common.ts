import axios from 'axios';
import * as https from 'https';

export interface Attribute {
    trait_type: string,
    value: string
}

export interface GenerateCardResponse {
    user_id: string,
    owned_metadata: string,
    email: string,
    name: string,
    metadata_confirmed: boolean,
    email_delivered: boolean,
    mint_submited: boolean,
    ready_to_transfer: boolean,
    transfer_address: string,
    transferred: boolean,
    created_date: string,
    updated_date: string
}

export interface CardMetadata {
    tokenId: number;
    image: string;
    name: string;
    attributes: Attribute[];
}

export interface ConirmImageResponse {
    attributes: Attribute[];
    image: string;
    name: string;
    tokenId: string;
}

axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false
})

const baseUrl = "https://degen.cards:8080/api/v1/"

export const generateCard = (backgound_color: string, card_provider: string, image_id: string) => {
    return axios.post<GenerateCardResponse>(`${baseUrl}cards`, {backgound_color, card_provider, image_id}, {
        headers: {
            "X-API-KEY": "dd5ddff9-5612-466f-a869-588c4f428c6e"
        }
    })
}

export const addEmail = (email: string, user_id: string) => {
    return axios.patch<GenerateCardResponse>(`${baseUrl}users/${user_id}`, {email}, {
        headers: {
            "X-API-KEY": "dd5ddff9-5612-466f-a869-588c4f428c6e"
        }
    })
}

export const getCardMetadata = (metadataId: string) => {
    return axios.get<CardMetadata>(`${baseUrl}cards/${metadataId}`, {headers: {
            "X-API-KEY": "dd5ddff9-5612-466f-a869-588c4f428c6e"
        }})
}

export const confirmImage = (metadataId: string) => {
    return axios.put<ConirmImageResponse>(`${baseUrl}cards/${metadataId}`, {}, {
        headers: {
            "X-API-KEY": "dd5ddff9-5612-466f-a869-588c4f428c6e"
        }
    })
}

export const updateName = (userId: string, name: string) => {
    return axios.put<GenerateCardResponse>(`${baseUrl}contract/${userId}`, {name}, {
        headers: {
            "X-API-KEY": "dd5ddff9-5612-466f-a869-588c4f428c6e"
        }
    })
}

export const getUserById = (id: string) => {
    return axios.get<GenerateCardResponse>(`${baseUrl}users/${id}`, {
        headers: {
            "X-API-KEY": "dd5ddff9-5612-466f-a869-588c4f428c6e"
        }
    })
}

export const addWalletAddress = (address: string, user_id: string) => {
    return axios.post<void>(`${baseUrl}transfer/${user_id}`, {}, {
        params: {address},
        headers: {
            "X-API-KEY": "dd5ddff9-5612-466f-a869-588c4f428c6e"
        }
    })
}
