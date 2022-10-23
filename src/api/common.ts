import axios from 'axios';

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

const baseUrl = "http://52.203.242.218/api/v1/"

export const generateCard = (backgound_color: string, card_provider: string, email: string, image_id: string) => {
    return axios.post<GenerateCardResponse>(`${baseUrl}cards`, {backgound_color, card_provider, email, image_id}, {
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
