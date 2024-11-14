<script>
    import { appState } from '@stores/appState';
    import { SetFirstLoadComplete, SaveFilePath, CheckSRConfigs } from '@wails';
    import { onMount } from 'svelte';
    let path = 'C:/Program Files (x86)/Steam/steamapps/common/Portal 2';
    onMount(() => {
        $appState.filePath = path;
    });
    function completeSetup() {
        savePath()
        SetFirstLoadComplete().then(() => {
            $appState.isFirstLoad = false;
        });
    }
    function savePath() {
        SaveFilePath($appState.filePath)
            .then(() => alert('File path saved!'))
            .catch((err) => console.error(err));
    }
    function setSRConfigs(status){
        $appState.SRConfigs = status
        CheckSRConfigs(status)
    }
</script>

<main class="flex flex-col justify-center items-center w-full">
    <div class="flex flex-col justify-center items-center *:m-2 max-w-3xl">
        <h1 class="text-4xl font-bold text-center">Welcome to Portal 2 Speedrunning Launcher</h1>
        <p class="text-gray-400 text-center">P2SR launcher is your go to app to manage all things Portal 2 Speedrunning related</p>
    </div>
    <div class="flex flex-col justify-center items-center *:m-2 max-w-xl w-full">
        <div class="flex flex-col *:m-1 w-full">
            <label for="">Portal 2 Directory</label>
            <input class="w-full bg-transparent border border-gray-400 p-2 rounded-lg focus:rounded-2xl duration-300 transition-all focus:border-white focus:outline-none" type="text" bind:value={$appState.filePath}>
            <button on:click={savePath} class="p-4 rounded-full bg-white bg-opacity-15 hover:bg-green-500 hover:bg-opacity-30 duration-300 transition-all">Set as filepath</button>
        </div>
        <div class="flex flex-col *:m-1 w-full">
            <label for="">Do you use SRConfigs?</label>
            <button on:click={() => setSRConfigs(!$appState.SRConfigs)} class="p-4 rounded-full bg-white bg-opacity-15 hover:bg-green-500 hover:bg-opacity-30 duration-300 transition-all">{ $appState.SRConfigs ? "Yes" : "No" }</button>
        </div>
    </div>
    <button on:click={completeSetup} class="p-4 rounded-full bg-white bg-opacity-15 hover:bg-red-500 hover:bg-opacity-30 duration-300 transition-all">Proceed to app?</button>
</main>