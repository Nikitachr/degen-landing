import axios from "axios";

export interface Renting {
    cursor: number;
    expired: boolean;
    id: string;
    rentDuration: string;
    rentAmount: string;
    rentedAt: string;
    renterAddress: string;
    lending: Lending
}

export interface Lending {
    id: string;
    cursor: number;
    dailyRentPrice: string;
    is721: boolean;
    lendAmount: string;
    lenderAddress: string;
    maxRentDuration: string;
    lentAt: string;
    nftAddress: string;
    paymentToken: string;
    rentClaimed: boolean;
    tokenID: string;
    renting: Renting[]
}

const baseURL = 'https://api.studio.thegraph.com/query/39929/renft/0.0.1'

export const getLandings = async (): Promise<Lending[]> => {
return axios.post<{ data: { lendings: Lending[] } }>(`${baseURL}`, {query: `{
  lendings {
    id
    cursor
    dailyRentPrice
    is721
    lendAmount
    lenderAddress
    maxRentDuration
    lentAt
    nftAddress
    paymentToken
    rentClaimed
    tokenID
    renting {
      cursor
      expired
      id
      rentDuration
      rentAmount
      rentedAt
      renterAddress
    }
  }
}`}).then(res => res.data.data.lendings)
}

export const getUserRentings = async (address: string): Promise<Renting[]> => {
    return axios.post(baseURL, {query: `{
  rentings(where: {renterAddress: "${address}"}) {
    rentAmount
    rentDuration
    rentedAt
    renterAddress
    id
    expired
    cursor
    lending {
      cursor
      id
      dailyRentPrice
      availableAmount
      is721
      lendAmount
      lenderAddress
      lentAt
      maxRentDuration
      tokenID
      rentClaimed
      paymentToken
      nftAddress
    }
  }
}`}).then(res => res.data.data.rentings)
}