<script>
    import { toast } from 'svelte-sonner';
    import { Toaster } from '$lib/components/ui/sonner';
    import { Button } from '$lib/components/ui/button';
    import { parseMtriggers, parseTitle } from '$lib/parser';
    import { Input } from '$lib/components/ui/input';
    import { writable } from 'svelte/store';
    import { Label } from '$lib/components/ui/label';
    import { SaveAutoreset } from '@wails';
    import * as HoverCard from '$lib/components/ui/hover-card/index.js';
    import { Info } from 'lucide-svelte';

    let fileName = writable('');
    let fileContent = null;
    let title = writable('');
    let mtriggers = writable([]);

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            fileName.set(file.name);
            const reader = new FileReader();
            reader.onload = function (e) {
                fileContent = e.target.result;
            };
            reader.readAsArrayBuffer(file);
        }
    }

    function parseFile() {
        if (fileContent) {
            title.set(parseTitle(fileContent));
            mtriggers.set(parseMtriggers(fileContent));
        }
    }
    let padding = 0;
    function submitAutoreset() {
        return SaveAutoreset($mtriggers, $title);
    }
    let newMtriggers = writable([]);

    $: {
        if (padding != '') {
            newMtriggers.set(
                $mtriggers.map((trigger) => trigger + parseInt(padding))
            );
        } else {
            newMtriggers.set($mtriggers);
        }
    }
</script>

<Toaster />
<main class="flex-1 w-full flex flex-col items-center">
    <h2 class="font-bold text-4xl my-20">Create Autoreset File!</h2>
    <div class="flex flex-col items-center w-full max-w-md *:m-2">
        <Label>Demo:</Label>
        <Input
            type="file"
            class="bg-opacity-20 bg-black w-full"
            on:change={handleFileChange}
        />
        <Button
            class="w-full"
            on:click={() => {
                parseFile();
                toast.success('Mtriggers Found!', {
                    description: '',
                });
            }}>Parse File</Button
        >
        <Label class="flex items-center justify-center w-full"
            >Add padding {JSON.stringify(parseInt(padding)) | 'None'}
            <HoverCard.Root
                ><HoverCard.Trigger>
                    <Info class="ml-2 opacity-35" />
                </HoverCard.Trigger>
                <HoverCard.Content
                    side="right"
                    class="bg-opacity-25 bg-black text-muted-foreground"
                >
                    Padding is extra time you have per mtrigger, if your
                    mtriggers are 1,2,3 and your padding is 5, the new mtriggers
                    will be 6,7,8.
                </HoverCard.Content>
            </HoverCard.Root></Label
        >
        <Input
            class="bg-opacity-25 bg-black w-full"
            placeholder="Padding"
            bind:value={padding}
        />

        <Button
            class="w-full"
            on:click={() => {
                submitAutoreset()
                    .then((result) => {
                        toast.success('Added Autoreset', {
                            description: `${result}`,
                        });
                    })
                    .catch((error) => {
                        toast.error('Failed to add Autoreset', {
                            description: `${error.message}`,
                        });
                    });
            }}>Add Autoreset</Button
        >
    </div>
</main>
