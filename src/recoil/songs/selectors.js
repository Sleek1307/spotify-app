import { selector } from "recoil";

import { album, artist, episode, playlist } from './atoms';

export const filterType = selector({
    key: 'filterType',
    get: ({ get }) => {
        const atoms = ['track', get(album), get(artist), get(playlist), get(episode)];
        const notNullAtoms = atoms.filter((item) => !!item);
        return notNullAtoms.length > 0 ? notNullAtoms.join(",") : null;
    },
    set: ({ set }) => {
        set(album, null);
        set(artist, null);
        set(playlist, null);
        set(episode, null);
    },
});