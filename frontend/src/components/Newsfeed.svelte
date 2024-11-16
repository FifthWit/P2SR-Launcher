<script>
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import { BrowserOpenURL } from '../../wailsjs/runtime/runtime.js';
    import { onMount } from 'svelte';
    import clsx from 'clsx';
    let news = [];
    
    onMount(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        console.log('API URL:', apiUrl); // Log the API URL to verify it's correct
        
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                news = data;
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    });
    
    /**
     * @typedef {Object} Post
     * @property {string} title
     * @property {string} content
     * @property {string} href
     */
    /** @type {Post[]} */
</script>

<Carousel.Root
  opts={{
    align: "start"
  }}
  class="ml-16 w-[calc(100%-132px)]"
>
  <Carousel.Content class="px-16 -ml-20">
    {#each news as post, index}
    <Carousel.Item class={clsx("basis-1/3 bg-black bg-opacity-10 rounded-xl flex flex-col items-center justify-center p-6 m-1 aspect-square text-center", index === 0 && "ml-4")}>
              <span class="text-3xl font-semibold">{post.title}</span>
              <p class="text-muted-foreground">{post.content} <button class="font-semibold" on:click={() => BrowserOpenURL(post.href)}>Read More</button>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>