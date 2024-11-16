import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import path from 'path';

export default defineConfig({
    plugins: [
        svelte({
            preprocess: sveltePreprocess({
                typescript: true,
            }),
        }),
    ],
    resolve: {
        alias: {
            '@wails': path.resolve(__dirname, './wailsjs/go/main/App'),
            '@stores': path.resolve(__dirname, './src/stores'),
            '@components': path.resolve(__dirname, './src/components'),
            $lib: path.resolve('./src/lib'),
        },
    },
});
