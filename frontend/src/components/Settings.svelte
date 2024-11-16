<script>
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Settings } from "lucide-svelte";

    let novid = true;
    let mutlirun = false;
    let mat_enable_motion_blur = false;
    let vulkan = false;

    let args = "-novid";

    function updateArgs() {
        let updatedArgs = "";
        if (novid) updatedArgs += "-novid ";
        if (mutlirun) updatedArgs += "-mutlirun ";
        if (mat_enable_motion_blur) updatedArgs += "+mat_enable_motion_blur 0 ";
        if (vulkan) updatedArgs += "-vulkan ";
        args = updatedArgs.trim();
    }

    function onArgsChange(event) {
        args = event.target.value;
        // bs syncing that I thought wouldnt have to be this complex
        novid = args.includes("-novid");
        mutlirun = args.includes("-mutlirun");
        mat_enable_motion_blur = args.includes("+mat_enable_motion_blur 0");
        vulkan = args.includes("-vulkan");
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
        <DropdownMenu.CheckboxItem bind:checked={novid} on:change={updateArgs}>
            -novid
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem bind:checked={mutlirun} on:change={updateArgs}>
            -mutlirun
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem bind:checked={mat_enable_motion_blur} on:change={updateArgs}>
            +mat_enable_motion_blur 0
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem bind:checked={vulkan} on:change={updateArgs}>
            -vulkan
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.Separator />
            <div>
              <input
                type="text"
                class="bg-transparent text-white focus:outline-none focus:border border-muted-foreground hover:bg-transparent"
                bind:value={args}
                on:input={onArgsChange}
                on:keydown={(event) => event.stopPropagation()}
              />
            </div>
    </DropdownMenu.Content>
</DropdownMenu.Root>