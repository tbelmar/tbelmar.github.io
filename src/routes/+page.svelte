<script lang="ts">
  import { onMount } from "svelte";
  import Header from "../lib/Header.svelte";
  import { Application, Assets, Sprite, Renderer } from "pixi.js";

  onMount(() => {
    const app = new Application({
      width: 100,
      height: 100,
    });

    console.log(app);
  });
</script>
