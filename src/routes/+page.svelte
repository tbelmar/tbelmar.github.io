<script lang="ts">
    import {onMount} from 'svelte';
    import {
        AnimatedSprite,
        Application,
        Circle,
        Graphics,
        Rectangle,
        type ICanvas
    } from 'pixi.js';

    import {loadAnimatedSprite} from '../lib/helpers.js';
    import Header from '$lib/components/Header.svelte';

    let canvas: ICanvas;
    let app: Application;

    let objects: Array<AnimatedSprite> = [];

    let background: AnimatedSprite;
    let belmarDefault: AnimatedSprite;
    let belmarLook: AnimatedSprite;
    let belmarTransitionOut: AnimatedSprite;
    let belmarWave: AnimatedSprite;

    let isHoveringOverCharacter = false;

    $: {
        if (canvas) {
            canvas.style!.cursor = isHoveringOverCharacter
                ? 'pointer'
                : 'default';
        }
    }

    onMount(async () => {
        app = new Application({
            width: window.innerWidth,
            height: window.innerHeight,
            view: canvas,
            backgroundAlpha: 0
        });

        let shouldResize: number;
        // only call resize once the user has stopped resizing for 30ms
        window.addEventListener('resize', () => {
            clearTimeout(shouldResize);
            shouldResize = setTimeout(() => {
                app.resizeTo = window;
                app.resize();
                drawScene();
            }, 100);
        });

        drawScene();
    });

    const drawScene = async () => {
        app.stage.removeChildren();

        background = await loadAnimatedSprite('background-no-belmar', 64);
        belmarDefault = await loadAnimatedSprite('bigbelmar-default', 64);
        belmarLook = await loadAnimatedSprite('bigbelmar-look', 34);
        belmarTransitionOut = await loadAnimatedSprite(
            'bigbelmar-transition-out',
            4
        );
        belmarWave = await loadAnimatedSprite('bigbelmar-wave', 13);

        belmarDefault.hitArea = new Rectangle(-380, 100, 200, 300);
        belmarLook.hitArea = new Rectangle(-380, 100, 200, 300);
        belmarTransitionOut.hitArea = new Rectangle(-380, 100, 200, 300);
        belmarWave.hitArea = new Rectangle(-380, 100, 200, 300);

        let scale = 1;

        scale = window.innerHeight / background.height;

        background.animationSpeed = 0.2;
        background.anchor.set(1, 0);
        background.position.set(app.renderer.width, 0);
        background.play();
        background.scale.set(scale, scale);

        belmarDefault.interactive = true;
        belmarDefault.animationSpeed = 0.2;
        belmarDefault.anchor.set(1, 0);
        belmarDefault.position.set(app.renderer.width, 0);
        belmarDefault.pivot.set(36, -390);
        belmarDefault.play();
        belmarDefault.scale.set(scale, scale);

        belmarLook.animationSpeed = 0.2;
        belmarLook.anchor.set(1, 0);
        belmarLook.position.set(app.renderer.width, 0);
        belmarLook.pivot.set(36, -390);
        belmarLook.scale.set(scale, scale);
        belmarLook.loop = false;
        belmarLook.interactive = true;

        belmarTransitionOut.animationSpeed = 0.2;
        belmarTransitionOut.anchor.set(1, 0);
        belmarTransitionOut.position.set(app.renderer.width, 0);
        belmarTransitionOut.pivot.set(36, -390);
        belmarTransitionOut.scale.set(scale, scale);
        belmarTransitionOut.loop = false;

        belmarWave.animationSpeed = 0.2;
        belmarWave.anchor.set(1, 0);
        belmarWave.position.set(app.renderer.width, 0);
        belmarWave.pivot.set(36, -390);
        belmarWave.scale.set(scale, scale);
        belmarWave.loop = false;
        belmarWave.interactive = true;

        belmarLook.onmouseout = () => {
            app.stage.removeChild(belmarLook);
            belmarTransitionOut.gotoAndPlay(0);
            app.stage.addChild(belmarTransitionOut);
            isHoveringOverCharacter = false;
        };

        belmarLook.onclick = () => {
            app.stage.removeChild(belmarLook);
            belmarWave.gotoAndPlay(0);
            isHoveringOverCharacter = true;
            app.stage.addChild(belmarWave);
        };

        belmarLook.onmouseover = () => {
            isHoveringOverCharacter = true;
        };

        belmarDefault.onmouseout = () => {
            isHoveringOverCharacter = false;
        };

        belmarWave.onComplete = () => {
            app.stage.removeChild(belmarWave);

            if (isHoveringOverCharacter) {
                belmarLook.gotoAndPlay(33);
                app.stage.addChild(belmarLook);
            } else {
                belmarTransitionOut.gotoAndPlay(0);
                app.stage.addChild(belmarTransitionOut);
            }
        };

        belmarWave.onmouseout = () => {
            isHoveringOverCharacter = false;
        };

        belmarTransitionOut.onComplete = () => {
            app.stage.removeChild(belmarTransitionOut);
            app.stage.addChild(belmarDefault);
        };

        belmarDefault.onmouseover = () => {
            app.stage.removeChild(belmarDefault);
            belmarLook.gotoAndPlay(0);
            app.stage.addChild(belmarLook);
        };

        belmarDefault.on('pointerdown', () => {
            belmarLook.onComplete = () => {
                app.stage.removeChild(belmarLook);
                belmarWave.gotoAndPlay(0);
                app.stage.addChild(belmarWave);
            };

            app.stage.removeChild(belmarDefault);
            belmarLook.gotoAndPlay(0);
            app.stage.addChild(belmarLook);
        });

        app.stage.addChild(background);
        app.stage.addChild(belmarDefault);
    };
</script>

<div>
    <Header />

    <div class="app">
        <canvas bind:this={canvas} />
    </div>
</div>

<style>
</style>
