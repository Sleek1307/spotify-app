// import { keysAbleToSave } from "../../component/DebugObserver";
// import { spotifyRefreshToken, spotifyTokenResponse, isAuthenticated } from "../auth/atoms";

// const atomsToSave = [
//     {
//         key: keysAbleToSave[0],
//         atom: spotifyRefreshToken
//     },
//     {
//         key: keysAbleToSave[1],
//         atom: spotifyTokenResponse
//     },
//     {
//         key: keysAbleToSave[2],
//         atom: isAuthenticated
//     }
// ]

// const initRecoilState = ({ set }) => {
//     const localStorageLength = localStorage.length;

//     //Recorre el localStorage
//     for (let i = 0; i < localStorageLength; i++) {
//         //Trae la llave del elemento sobre el que estés iterando
//         const localStorageKey = localStorage.key(i);
//         //Traeme la posicion del arreglo keysAbleToSave que contiene el atomo a guardar 
//         const indexOfKey = keysAbleToSave.indexOf(localStorageKey)

//         if (indexOfKey !== -1) {
//             //Traeme el atomo a guardar
//             const atom = atomsToSave[indexOfKey].atom;
//             set(atom, JSON.parse(localStorage.getItem(localStorageKey))?.value ?? '');
//         }
//     }
// };

// export { initRecoilState }