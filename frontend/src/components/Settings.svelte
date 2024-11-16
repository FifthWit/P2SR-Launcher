<script>
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Settings } from "lucide-svelte";
    import { args } from '@stores/appState';

    import { get } from 'svelte/store';

    let novid = true;
    let mutlirun = false;
    let mat_enable_motion_blur = false;
    let vulkan = false;

    $: {
        const currentArgs = get(args);
        novid = currentArgs.includes("-novid");
        mutlirun = currentArgs.includes("-mutlirun");
        mat_enable_motion_blur = currentArgs.includes("+mat_enable_motion_blur 0");
        vulkan = currentArgs.includes("-vulkan");
    }

    $: {
        let updatedArgs = "";
        if (novid) updatedArgs += "-novid ";
        if (mutlirun) updatedArgs += "-mutlirun ";
        if (mat_enable_motion_blur) updatedArgs += "+mat_enable_motion_blur 0 ";
        if (vulkan) updatedArgs += "-vulkan ";

        args.set(updatedArgs.trim());
    }

    function onArgsChange(event) {
        const newArgs = event.target.value;
        args.set(newArgs);
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
        <Button
            variant="outline"
            builders={[builder]}
            class="group bg-black bg-opacity-10 hover:bg-opacity-15 duration-150 transition-all text-3xl z-10 p-4 rounded-r-lg h-full rounded-l-none group"
        >
            <Settings class="transform transition-transform duration-350 group-hover:rotate-[450deg]" />
        </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="bg-black bg-opacity-10 hover:bg-opacity-15">
        <DropdownMenu.Label>Arguments</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.CheckboxItem bind:checked={novid}>
            -novid
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem bind:checked={mutlirun}>
            -mutlirun
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem bind:checked={mat_enable_motion_blur}>
            +mat_enable_motion_blur 0
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem bind:checked={vulkan}>
            -vulkan
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.Separator />
        <div>
            <input
                type="text"
                class="bg-transparent text-white focus:outline-none focus:border border-muted-foreground hover:bg-transparent"
                bind:value={$args}
                on:input={onArgsChange}
                on:keydown={(event) => event.stopPropagation()}
            />
        </div>
    </DropdownMenu.Content>
</DropdownMenu.Root>