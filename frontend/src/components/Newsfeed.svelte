<script>
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import { BrowserOpenURL } from '../../wailsjs/runtime/runtime.js';
    /**
     * @typedef {Object} Post
     * @property {string} title
     * @property {string} content
     * @property {string} href
     */
    /** @type {Post[]} */
    const news = [
        {
            title: "New Rule!!",
            content: "xyz is now banned in all SP runs",
            href: "https://example.com"
        },        {
            title: "New Rule!!",
            content: "xyz is now banned in all SP runs",
            href: "https://example.com"
        },        {
            title: "New Rule!!",
            content: "xyz is now banned in all SP runs",
            href: "https://example.com"
        },        {
            title: "New Rule!!",
            content: "xyz is now banned in all SP runs",
            href: "https://example.com"
        },
    ]
</script>

<Carousel.Root
  opts={{
    align: "start"
  }}
class="ml-16 w-[calc(100%-132px)]"
>
  <Carousel.Content class="p-4">
    {#each news as post, index}
      <Carousel.Item class="md:basis-1/3 bg-black bg-opacity-10 rounded-xl aspect-square m-2">
        <div class="flex flex-col aspect-square items-center justify-center p-6">
              <span class="text-3xl font-semibold">{post.title}</span>
              <p class="text-muted-foreground">{post.content} <a class="font-semibold" href="/nothing" on:click|preventDefault={() => BrowserOpenURL(post.href)}>Read More</a></p>
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>