<script>
    import clsx from 'clsx';
    import { appState } from '../stores/appState';
    
    $: {
        console.log($appState);
    }

    /**
     * @typedef {Object} Tab
     * @property {string} name
     * @property {string} [icon]
     * @property {string} [route]
     */

    /** @type {Tab[]} */
    const tabs = [
        {
            name: "Portal 2",
            icon: null,
            route: "home"
        },
        {
            name: "Autoreset",
            icon: null,
            route: "autoreset"
        },
        {
            name: "Modpacks",
            icon: null,
            route: "modpacks"
        },
        {
            name: "Settings",
            icon: null,
            route: null
        },
    ];
    let activeTab = 0;

    function handleTabChange(index, route) {
        activeTab = index;
        $appState.route = route || "home";
    }
</script>

<div class="p-4 h-fit w-screen bg-black bg-opacity-15 flex flex-row *:mx-2">
    {#each tabs as tab, index}
        <button on:click={() => handleTabChange(index, tab.route)} class={clsx("duration-200 transition-all p-2 px-4 rounded-lg hover:bg-opacity-30 hover:bg-black bg-black", { "bg-white bg-opacity-5 font-semibold": index === activeTab }, { "bg-black bg-opacity-0": index != activeTab })}>
            {tab.name}
        </button>
    {/each}
</div>