<script>
    import clsx from 'clsx'

    /**
     * @typedef {Object} Tab
     * @property {string} name
     * @property {string} [icon]
     */

    /** @type {Tab[]} */
    const tabs = [
        {
            name: "Portal 2",
            icon: null,
        },
        {
            name: "Modpacks",
            icon: null,
        },
        {
            name: "Settings",
            icon: null,
        },
    ];
    let activeTab = 0;
</script>

<div class="p-4 h-fit w-screen bg-black bg-opacity-15 flex flex-row *:mx-2">
    {#each tabs as tab, index}
        <button class={clsx("duration-200 transition-all p-2 px-4 rounded-lg hover:bg-opacity-30 hover:bg-black bg-black", { "bg-white bg-opacity-5 font-semibold": index === activeTab }, { "bg-black bg-opacity-0": index != activeTab })}>
            {tab.name}
        </button>
    {/each}
</div>