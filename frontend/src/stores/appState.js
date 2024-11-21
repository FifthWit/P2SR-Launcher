import { writable } from 'svelte/store';

export const appState = writable({
    SRConfigs: false,
    isFirstLoad: true,
    route: 'home',
    filePath: '',
});

export const args = writable('-novid');
