import { atom } from "recoil";

export const spotifyResult = atom({
    key: "spotifyResult",
    default: ''
})

export const album = atom({
    key: "album",
    default: null
})

export const artist = atom({
    key: "artist",
    default: null
})

export const playlist = atom({
    key: "playlist",
    default: null
})

export const episode = atom({
    key: "episode",
    default: null
})