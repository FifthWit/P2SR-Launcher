<!-- App.svelte -->
<script>
    import './index.css'
    import './global.css'
    import { onMount } from 'svelte';
    import { appState } from './stores/appState';
    import { IsFirstLoad } from '../wailsjs/go/main/App';
    import FirstLoad from './components/FirstLoad.svelte';
    import MainApp from './components/MainApp.svelte';

    onMount(async () => {
        const isFirstLoad = await IsFirstLoad();
        $appState.isFirstLoad = isFirstLoad;
    });
</script>

{#if $appState.isFirstLoad}
    <FirstLoad />
{:else}
    <MainApp />
{/if}