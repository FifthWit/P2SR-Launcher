<!-- App.svelte -->
<script>
    import './index.css'
    import './global.css'
    import { onMount } from 'svelte';
    import { appState } from './stores/appState';
    import { IsFirstLoad } from '../wailsjs/go/main/App';
    import FirstLoad from './components/FirstLoad.svelte';
    import MainApp from './components/MainApp.svelte';
    import Navbar from '@components/Navbar.svelte';
    import Sidebar from '@components/Sidebar.svelte';
    import Autoreset from '@components/Autoreset.svelte';

    onMount(async () => {
        const isFirstLoad = await IsFirstLoad();
        $appState.isFirstLoad = isFirstLoad;
    });
</script>

{#if $appState.isFirstLoad}
    <FirstLoad />
{:else}
    <div class="flex flex-col h-screen">
        <Navbar />
        <div class="flex flex-1">
            <Sidebar />
                {#if $appState.route == 'home'}
                    <MainApp />
                {:else if $appState.route == 'autoreset'}
                    <Autoreset />
                {/if}
        </div>
            
    </div>
{/if}