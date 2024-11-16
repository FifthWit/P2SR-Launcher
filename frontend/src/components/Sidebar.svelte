<script >
    import clsx from 'clsx'
    import portalImage from '../assets/images/portal2.png';
    
    /**
     * @typedef {Object} Game
     * @property {string} name
     * @property {string} [imgLink]
     */
    /** @type {Game[]} */
    const games = [
        {
            name: "Portal 2",
            imgLink: {portalImage}
        }
    ]; // Will add things like Reloaded and Mel but....... im lazy
    let activeGame = 0;
</script>
<div class="p-4 w-fit h-screen bg-black bg-opacity-10 flex flex-col *:mx-2" style="height: calc(100vh - 72px);">
    {#each games as game, index}
        <button class={clsx("flex flex-row items-center duration-200 transition-all p-2 px-4 rounded-lg hover:bg-opacity-15 hover:bg-black bg-black", { "bg-white bg-opacity-5 font-semibold": index === activeGame }, { "bg-black bg-opacity-0": index != activeGame })}>
            <img src={portalImage} alt="" class="w-[32px] aspect-square rounded-lg mr-2">
            {game.name}
        </button>
    {/each}
</div>