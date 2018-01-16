
declare module 'latlon-geohash' {

    export type LatLon = {
        lat: number,
        lon: number
    }

    export type Bounds = {
        sw: LatLon,
        ne: LatLon
    }

    export type Neighbours = {
        n: string,
        e: string,
        s: string,
        w: string,
        nw: string,
        ne: string,
        se: string,
        sw: string
    }

    export type Direction = 'N' | 'E' | 'S' | 'W'


    export function encode(lat: number, lon: number, precision?: number): string

    export function decode(geohash: string): LatLon

    export function bounds(geohash: string): Bounds

    export function adjacent(geohash: string, direction: Direction): string

    export function neighbours(geohash: string): Neighbours


}