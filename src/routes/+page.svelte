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

    let sprites: Array<AnimatedSprite> = [];

    let background: AnimatedSprite;

    let belmarDefault: AnimatedSprite;
    let belmarLook: AnimatedSprite;
    let belmarTransitionOut: AnimatedSprite;
    let belmarWave: AnimatedSprite;

    let lightStrip: AnimatedSprite;
    let purplePlant: AnimatedSprite;
    let speakerLeft: AnimatedSprite;
    let speakerRight: AnimatedSprite;

    let isHoveringOverCharacter = false;

    $: {
        if (canvas) {
            canvas.style!.cursor = isHoveringOverCharacter
                ? 'pointer'
                : 'default';
        }
    }

    const loadSprites = async () => {
        // load all sprites
        background = await loadAnimatedSprite('bg-non-interactive', 64);
        background.interactive = true;

        background.on('click', (e) => {
            console.log('First:');
            console.log(background.toLocal(e.data.global));
        });

        belmarDefault = await loadAnimatedSprite('bigbelmar-default', 64);
        belmarLook = await loadAnimatedSprite('bigbelmar-look', 34);
        belmarTransitionOut = await loadAnimatedSprite(
            'bigbelmar-transition-out',
            4
        );
        belmarWave = await loadAnimatedSprite('bigbelmar-wave', 13);

        lightStrip = await loadAnimatedSprite('light-strip', 6);
        purplePlant = await loadAnimatedSprite('purple-plant', 8);
        speakerLeft = await loadAnimatedSprite('speaker-left', 5);
        speakerRight = await loadAnimatedSprite('speaker-right', 5);

        sprites = [
            ...sprites,
            background,
            belmarDefault,
            belmarLook,
            belmarTransitionOut,
            belmarWave,
            lightStrip,
            purplePlant,
            speakerLeft,
            speakerRight
        ];
    };

    onMount(async () => {
        await loadSprites();

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

    const setupRightShelf = () => {
        purplePlant.pivot.set(96, -286);
        purplePlant.interactive = true;
        purplePlant.loop = false;
        purplePlant.animationSpeed = 0.3;
        purplePlant.onmouseover = () => {
            purplePlant.gotoAndPlay(0);
        };
        purplePlant.onComplete = () => {
            purplePlant.gotoAndStop(0);
        };

        lightStrip.hitArea = new Rectangle(-320, -20, 120, 120);
        lightStrip.pivot.set(-24, -330);
        lightStrip.interactive = true;
        lightStrip.loop = false;
        lightStrip.animationSpeed = 0.3;
        lightStrip.onmouseover = () => {
            lightStrip.gotoAndPlay(0);
        };
        lightStrip.onComplete = () => {
            lightStrip.gotoAndStop(0);
        };

        speakerLeft.pivot.set(109, -378);
        speakerLeft.interactive = true;
        speakerLeft.loop = false;
        speakerLeft.onmouseover = () => {
            speakerLeft.gotoAndPlay(0);
        };
        speakerLeft.onComplete = () => {
            speakerLeft.gotoAndStop(0);
        };

        speakerRight.pivot.set(-18, -462);
        speakerRight.interactive = true;
        speakerRight.loop = false;
        speakerRight.onmouseover = () => {
            speakerRight.gotoAndPlay(0);
        };
        speakerRight.onComplete = () => {
            speakerRight.gotoAndStop(0);
        };
    };

    const setupBelmar = () => {
        const belmarDimensions = new Rectangle(-380, 100, 200, 300);

        belmarDefault.hitArea = belmarDimensions;
        belmarLook.hitArea = belmarDimensions;
        belmarTransitionOut.hitArea = belmarDimensions;
        belmarWave.hitArea = belmarDimensions;

        belmarDefault.pivot.set(37, -390);
        belmarLook.pivot.set(37, -390);
        belmarTransitionOut.pivot.set(37, -390);
        belmarWave.pivot.set(37, -390);

        belmarDefault.interactive = true;
        belmarDefault.play();

        belmarLook.loop = false;
        belmarLook.interactive = true;

        belmarTransitionOut.loop = false;

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
    };

    const setupSprites = async () => {
        let scale = window.innerHeight / background.height;

        for (let i = 0; i < sprites.length; i++) {
            sprites[i].animationSpeed = 0.2;
            sprites[i].anchor.set(1, 0);
            sprites[i].position.set(app.renderer.width, 0);
            sprites[i].scale.set(scale, scale);
        }
    };

    const drawScene = async () => {
        app.stage.removeChildren();

        await setupSprites();

        await setupBelmar();
        await setupRightShelf();

        background.play();

        app.stage.addChild(background);
        app.stage.addChild(belmarDefault);
        app.stage.addChild(purplePlant);
        app.stage.addChild(speakerLeft);
        app.stage.addChild(speakerRight);
        app.stage.addChild(lightStrip);
    };
</script>

<div id="body">
    <Header />

    <div class="app">
        <canvas bind:this={canvas} />
    </div>
</div>

<style>
</style>
