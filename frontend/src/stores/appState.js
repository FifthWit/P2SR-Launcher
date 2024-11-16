import { writable } from 'svelte/store';

export const appState = writable({
    SRConfigs: false,
    isFirstLoad: true,
    filePath: '',
});

export const args = writable('-novid');
