<script>
    import { PlayPortal2 } from '@wails';
    import { appState, args } from '@stores/appState';
    import Navbar from '@components/Navbar.svelte';
    import portalImage from '../assets/images/portal2.png';
    import Sidebar from '@components/Sidebar.svelte';
    import Newsfeed from '@components/Newsfeed.svelte';
    import { Button } from "$lib/components/ui/button";
    import Dialog from './Dialog.svelte';
    import Settings from '@components/Settings.svelte';
    import "../assets/fonts/D-DIN.otf";

    $: {
        console.log($args);
    }
    let dialog;
    let ValidPortal2 = true;

    function handlePlayPortal2(override) {
        PlayPortal2(override, $args).then(result => {
            console.log(result);
            if (result === "Invalid SAR hash.") {
                dialog.showModal();
            }
        }).catch(err => {
            console.error(err);
        });
    }
</script>

<Dialog bind:dialog on:close={() => console.log('closed')}>
	Are you sure you want to open Portal 2, we detected your SAR file is not up to date. <br />
    <div class="flex flex-row justify-between items center p-2">
        <Button on:click={() => {dialog.close()}}>Exit</Button>
        <Button class="bg-destructive" on:click={() => PlayPortal2(true)}>Play Portal 2 anways</Button>
    </div>
</Dialog>
        <main class="flex-1 w-full flex flex-col justify-between">
            <div class="relative overflow-hidden flex items-center justify-center p-8 flex-col">
                <div class="flex flex-col m-4 text-center *:m-2">
                    <h1 class="text-3xl font-bold underline relative">Welcome.</h1>
                    <div class="flex flex-row">
                        <button on:click={() => handlePlayPortal2(false, $args)} class="p2-font font-bold flex flex-row items-center shadow-lg bg-green-500 hover:bg-green-600 duration-200 transition-all text-3xl z-10 p-4 rounded-l-lg">
                            <img src={portalImage} alt="" class="w-[40px] rounded-lg mr-3">
                            Play Portal 2
                        </button>
                        <Settings />
                    </div>
                </div>
            </div>
            <Newsfeed />
        </main>

<style>
@font-face {
    font-family: 'D-DIN';
    src: url('../assets/fonts/D-DIN.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
}

:global(.p2-font) {
    font-family: 'D-DIN', sans-serif;
}
</style>