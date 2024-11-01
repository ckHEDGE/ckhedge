import { Metadata } from "@psychedelic/dab-js"
import { Listing, TokenIndex } from "@psychedelic/dab-js/dist/interfaces/ext"

export interface NFTDetails<idT = bigint> {
    index: idT;
    canister: string;
    id?: string;
    name?: string;
    url: string;
    metadata: any;
    standard: string;
    collection?: string;
    owner?: string;
    operator?: string;
  }

export interface CanisterMetadata {
    url: string
    name: string
    description: string
    version: number
    logo_url: string
  }
  
  export type TokenListingObject = {
    id: string
    index: number
    canister: string
    name: string
    type: string
    url: string
    seller: string
    price: number
    standard: string
  }
  
  export type TokenObject = {
    id: string
    index: number
    canister: string
    name: string
    type: string
    url: string
    standard: string
  }

  export type TokenDetails =  {
    index: bigint;
    canister: string;
    id?: string;
    name?: string;
    url: string;
    metadata: any;
    standard: string;
    collection?: string;
    owner?: string;
    operator?: string;
}
  
  export type TokensEXT = Array<
    [TokenIndex, [] | [Listing], [] | [Uint8Array | number[]]]
  >

  export type TokenExt = [TokenIndex, [] | [Listing], [] | [Uint8Array | number[]]]
  
  export type ListingResponse = {
    item: [TokenIndex: TokenIndex, Listing: Listing, Metadata: Metadata]
  }
  