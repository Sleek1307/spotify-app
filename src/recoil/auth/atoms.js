import { atom } from 'recoil';

const isAuthenticated = atom({
    key: "isAuthenticated",
    default: false,
})

const spotifyRefreshToken = atom({
    key: 'spotifyRefreshToken',
    default: ''
})

const spotifyTokenResponse = atom({
    key: 'spotifyTokenResponse',
    default: ''
})

export { isAuthenticated, spotifyRefreshToken, spotifyTokenResponse }