<script>
    import { PlayPortal2 } from '@wails';
    import { appState } from '@stores/appState';
    import Navbar from '@components/Navbar.svelte';
    import Sidebar from '@components/Sidebar.svelte';
    import Newsfeed from '@components/Newsfeed.svelte';
    import { Button } from "$lib/components/ui/button";
    import { Settings } from 'lucide-svelte';
    import Dialog from './Dialog.svelte';
    let dialog
    let ValidPortal2 = true;

    function handlePlayPortal2(override) {
        PlayPortal2(override).then(result => {
            console.log(result);
            if (result === "Invalid SAR hash.") {
                dialog.showModal()
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
<div class="flex flex-col h-screen">
    <Navbar />
    <div class="flex flex-1">
        <Sidebar />
        <main class="flex-1 w-full flex flex-col justify-between">
            <div class="relative overflow-hidden flex items-center justify-center p-8 flex-col">
                <div class="flex flex-col *:m-4">
                    <h1 class="text-3xl font-bold underline relative z-10">Welcome.</h1>
                    <div class="flex flex-row">
                        <button on:click={() => handlePlayPortal2(false)} class="flex flex-row items-center bg-green-500 hover:bg-green-600 duration-200 transition-all text-3xl z-10 p-4 rounded-l-lg">
                            <img src="/src/assets/images/portal2.png" alt="" class="w-[40px] rounded-lg mr-3">
                            Play Portal 2
                        </button>
                        <button on:click={() => handlePlayPortal2(true)} class="bg-black bg-opacity-10 hover:bg-opacity-15 duration-150 transition-all text-3xl z-10 p-4 rounded-r-lg"><Settings /></button>
                    </div>
                </div>
            </div>
            <Newsfeed />
        </main>
    </div>
</div>