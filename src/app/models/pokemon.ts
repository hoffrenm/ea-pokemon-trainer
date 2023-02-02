import { PokemonType } from "./type"

export interface Pokemon {
    id: number
    name: string
    types?: PokemonType[]
    imageUrl: string;
    stats?: any[] // ?
}