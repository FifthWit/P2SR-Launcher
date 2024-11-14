<script>
    import { PlayPortal2 } from '@wails';
    import { appState } from '@stores/appState';
</script>

<main class="p-4">
    <div class="relative overflow-hidden flex items-center justify-center p-8 w-fit h-fit">
        <div class="absolute inset-0 bg-[url('https://static01.nyt.com/images/2011/05/10/arts/portal/portal-articleLarge.jpg')] bg-cover bg-center blur-md"></div>
        <div class="flex flex-col *:m-4">
            <h1 class="text-3xl font-bold underline relative z-10">Welcome.</h1>
            <button on:click={PlayPortal2} class="bg-green-500 text-3xl z-10 p-4 rounded-lg">Play Portal 2</button>
        </div>
    </div>
</main>