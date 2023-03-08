<script lang="ts">
    import {onMount} from 'svelte';
    import {
        AnimatedSprite,
        Application,
        Assets,
        Container,
        Rectangle,
        Sprite,
        Texture,
        type ICanvas
    } from 'pixi.js';

    import {GlowFilter} from 'pixi-filters';

    import Header from '$lib/components/Header.svelte';
    import {
        background,
        belmarDefault,
        belmarLook,
        belmarTransitionOut,
        belmarWave,
        smallShelfPlant,
        smallShelfFlower,
        smallShelfPeashooter,
        bike,
        flag,
        knight,
        steve,
        viola,
        flowerPlant,
        tallPlant,
        shortPlant,
        purplePlant,
        speakerLeft,
        speakerRight,
        lightStrip,
        downwardsArrow
    } from '$lib/assets';

    let canvas: ICanvas;
    let app: Application;

    let belmarContainer: Container = new Container();

    let animatedSprites = [
        background,
        belmarDefault,
        belmarLook,
        belmarTransitionOut,
        belmarWave,
        smallShelfPlant,
        smallShelfFlower,
        smallShelfPeashooter,
        bike,
        flag,
        knight,
        steve,
        viola,
        flowerPlant,
        tallPlant,
        shortPlant,
        purplePlant,
        speakerLeft,
        speakerRight,
        lightStrip
    ];

    let staticSprites = [downwardsArrow];

    let isClickable = false;

    let percentageText: any;

    let itemsLoaded = 0;
    let totalItemsToLoad = animatedSprites.length + staticSprites.length;

    $: {
        if (canvas) {
            canvas.style!.cursor = isClickable ? 'pointer' : 'default';
        }
    }

    $: {
        if (itemsLoaded / totalItemsToLoad === 1) percentageText.remove();
    }

    // Gets a spritesheet's name and turns it into an AnimatedSprite
    async function getAnimatedSprite(spriteSheetName: string) {
        const sheet = await Assets.load(`spritesheets/${spriteSheetName}.json`);
        let sprite = new AnimatedSprite(
            Object.values(sheet.textures) as Array<Texture>
        );

        return sprite;
    }

    // Sets basic properties to all sprites
    async function spritesSetup() {
        background.sprite =
            background.sprite || (await getAnimatedSprite('background'));

        const scale = window.innerHeight / background.sprite.height;
        background.sprite.scale.set(scale, scale);

        for (let i = 0; i < animatedSprites.length; i++) {
            const spriteObject = animatedSprites[i];
            const sprite =
                spriteObject.sprite ||
                (await getAnimatedSprite(spriteObject.name));

            spriteObject.sprite = sprite;

            sprite.animationSpeed = spriteObject.animationSpeed || 0.2;
            sprite.anchor.set(1, 0);
            sprite.position.set(app.renderer.width, 0);
            if (sprite.scale.x === 1 && sprite.scale.y === 1) {
                sprite.scale.set(scale, scale);
            }

            if (spriteObject.autoplay) {
                sprite.play();
            }

            if (spriteObject.pivot) {
                sprite.pivot.set(spriteObject.pivot.x, spriteObject.pivot.y);
            }

            if (spriteObject.hitArea) {
                sprite.hitArea = new Rectangle(...spriteObject.hitArea);
            }

            if (spriteObject.playOnMouseover) {
                sprite.interactive = true;
                sprite.loop = false;

                sprite.onmouseover = () => {
                    sprite.gotoAndPlay(0);
                };
                sprite.onComplete = () => {
                    sprite.gotoAndStop(0);
                };
            }

            if (spriteObject.playOnHover) {
                sprite.interactive = true;
                sprite.loop = false;

                sprite.onmouseenter = () => {
                    if (!sprite.playing) sprite.gotoAndPlay(0);
                };
                sprite.onmouseleave = () => {
                    sprite.gotoAndStop(0);
                };
            }

            if (spriteObject.playOnClick) {
                sprite.interactive = true;
                sprite.loop = false;

                sprite.onmouseenter = () => {
                    isClickable = true;
                };
                sprite.onmouseleave = () => {
                    isClickable = false;
                };

                sprite.onclick = () => {
                    if (!sprite.playing) sprite.gotoAndPlay(0);
                };

                sprite.onComplete = () => {
                    sprite.gotoAndStop(0);
                };
            }

            itemsLoaded++;
        }

        // Normal Sprites Setup
        for (let i = 0; i < staticSprites.length; i++) {
            const spriteObject = staticSprites[i];
            const sprite =
                spriteObject.sprite ||
                Sprite.from(`sprites/${spriteObject.name}.png`);
            spriteObject.sprite = sprite;

            sprite.anchor.set(1, 0);
            sprite.position.set(app.renderer.width, 0);
            sprite.scale.set(scale, scale);

            if (spriteObject.pivot) {
                sprite.pivot.set(spriteObject.pivot.x, spriteObject.pivot.y);
            }

            itemsLoaded++;
        }
    }

    const hover = (elem: Sprite | AnimatedSprite) => {
        let up = true;
        setInterval(() => {
            const x = elem.x;
            const y = elem.y;

            elem.position.set(x, up ? y - 2 : y + 2);
        }, 100);

        setInterval(() => {
            up = !up;
        }, 700);
    };

    const fadeOut = (elem: Sprite | AnimatedSprite) => {
        setInterval(() => {
            elem.alpha -= 0.1;
            if (elem.alpha <= 0) app.stage.removeChild(elem);
        }, 20);
    };

    // Sets up behavior of "Belmar" character
    async function characterSetup() {
        if (
            !belmarDefault.sprite ||
            !belmarLook.sprite ||
            !belmarTransitionOut.sprite ||
            !belmarWave.sprite
        ) {
            return;
        }

        belmarContainer.addChild(belmarDefault.sprite);
        belmarDefault.sprite.play();

        belmarDefault.sprite.interactive = true;
        belmarLook.sprite.interactive = true;
        belmarWave.sprite.interactive = true;

        belmarLook.sprite.loop = false;
        belmarTransitionOut.sprite.loop = false;
        belmarWave.sprite.loop = false;

        belmarLook.sprite.onmouseout = () => {
            if (!belmarTransitionOut.sprite) {
                return;
            }

            belmarContainer.removeChild(belmarLook.sprite as AnimatedSprite);

            belmarTransitionOut.sprite.gotoAndPlay(0);

            belmarContainer.addChild(belmarTransitionOut.sprite);
            isClickable = false;
        };

        belmarLook.sprite.onclick = () => {
            if (!belmarLook.sprite || !belmarWave.sprite) {
                return;
            }

            belmarContainer.removeChild(belmarLook.sprite);

            belmarWave.sprite.gotoAndPlay(0);
            isClickable = true;

            belmarContainer.addChild(belmarWave.sprite);
        };

        belmarLook.sprite.onmouseover = () => {
            isClickable = true;
        };

        belmarDefault.sprite.onmouseout = () => {
            isClickable = false;
        };

        belmarWave.sprite.onComplete = () => {
            if (
                !belmarWave.sprite ||
                !belmarLook.sprite ||
                !belmarTransitionOut.sprite
            ) {
                return;
            }
            belmarContainer.removeChild(belmarWave.sprite);

            if (isClickable) {
                belmarLook.sprite.gotoAndPlay(33);
                belmarContainer.addChild(belmarLook.sprite);
            } else {
                belmarTransitionOut.sprite.gotoAndPlay(0);
                belmarContainer.addChild(belmarTransitionOut.sprite);
            }
        };

        belmarWave.sprite.onmouseout = () => {
            isClickable = false;
        };

        belmarTransitionOut.sprite.onComplete = () => {
            if (!belmarTransitionOut.sprite || !belmarDefault.sprite) {
                return;
            }
            belmarContainer.removeChild(belmarTransitionOut.sprite);
            belmarContainer.addChild(belmarDefault.sprite);
        };

        belmarDefault.sprite.onmouseover = () => {
            if (!belmarDefault.sprite || !belmarLook.sprite) {
                return;
            }
            belmarContainer.removeChild(belmarDefault.sprite);
            belmarLook.sprite.gotoAndPlay(0);
            belmarContainer.addChild(belmarLook.sprite);

            if (downwardsArrow.sprite) fadeOut(downwardsArrow.sprite);
        };

        belmarDefault.sprite.on('pointerdown', () => {
            if (!belmarLook.sprite || !belmarDefault.sprite) {
                return;
            }
            belmarLook.sprite.onComplete = () => {
                if (!belmarLook.sprite || !belmarWave.sprite) {
                    return;
                }
                belmarContainer.removeChild(belmarLook.sprite);
                belmarWave.sprite.gotoAndPlay(0);
                belmarContainer.addChild(belmarWave.sprite);
            };

            belmarContainer.removeChild(belmarDefault.sprite);

            belmarLook.sprite.gotoAndPlay(0);
            belmarContainer.addChild(belmarLook.sprite);

            if (downwardsArrow.sprite) fadeOut(downwardsArrow.sprite);
        });
    }

    async function render() {
        await spritesSetup();
        await characterSetup();

        for (const spriteObject of animatedSprites) {
            if (spriteObject.sprite && !spriteObject.dontAutoRender) {
                app.stage.addChild(spriteObject.sprite);
            }
        }

        app.stage.addChild(belmarContainer);

        downwardsArrow.sprite!.filters = [
            new GlowFilter({
                distance: 15,
                outerStrength: 3,
                color: 0xffda87,
                quality: 0.5
            })
        ];

        for (const spriteObject of staticSprites) {
            if (spriteObject.sprite && !spriteObject.dontAutoRender) {
                app.stage.addChild(spriteObject.sprite);
            }
        }

        hover(downwardsArrow.sprite as Sprite);
    }

    onMount(() => {
        app = new Application({
            width: window.innerWidth,
            height: window.innerHeight,
            view: canvas,
            backgroundAlpha: 0
        });

        render();
    });

    /*

    const loadSprites = async () => {
        // load all sprites
        loadPercentage = 0;
        background = await loadAnimatedSprite('bg-non-interactive', 64);
        loadPercentage = 5;
        background.interactive = true;

        background.on('click', (e) => {
            console.log('First:');
            console.log(background.toLocal(e.data.global));
        });

        belmarDefault = await loadAnimatedSprite('bigbelmar-default', 64);
        belmarLook = await loadAnimatedSprite('bigbelmar-look', 34);
        loadPercentage = 15;
        belmarTransitionOut = await loadAnimatedSprite(
            'bigbelmar-transition-out',
            4
        );
        loadPercentage = 20;
        belmarWave = await loadAnimatedSprite('bigbelmar-wave', 13);
        loadPercentage = 25;

        belmarContainer.addChild(belmarDefault);

        lightStrip = await loadAnimatedSprite('light-strip', 6);
        loadPercentage = 30;
        purplePlant = await loadAnimatedSprite('purple-plant', 8);
        loadPercentage = 35;
        speakerLeft = await loadAnimatedSprite('speaker-left', 5);
        loadPercentage = 40;
        speakerRight = await loadAnimatedSprite('speaker-right', 5);
        loadPercentage = 45;

        bike = await loadAnimatedSprite('bike', 12);
        loadPercentage = 50;
        flag = await loadAnimatedSprite('flag', 11);
        loadPercentage = 55;
        knight = await loadAnimatedSprite('knight', 10);
        loadPercentage = 60;
        steve = await loadAnimatedSprite('steve', 5);
        loadPercentage = 65;
        flowerPlant = await loadAnimatedSprite('plant-flowers', 11);
        loadPercentage = 70;
        tallPlant = await loadAnimatedSprite('plant-tall', 12);
        loadPercentage = 75;
        shortPlant = await loadAnimatedSprite('plant-short', 10);
        loadPercentage = 80;
        viola = await loadAnimatedSprite('viola', 7);
        loadPercentage = 85;

        smallShelfFlower = await loadAnimatedSprite('small-shelf-flower', 4);
        loadPercentage = 90;
        smallShelfPlant = await loadAnimatedSprite('small-shelf-plant', 5);
        loadPercentage = 95;
        smallShelfPeashooter = await loadAnimatedSprite(
            'small-shelf-peashooter',
            7
        );
        loadPercentage = 100;

        downwardsArrow = new Sprite(
            await Texture.from('images/downwards-arrow.png')
        );

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
            speakerRight,
            bike,
            flag,
            knight,
            steve,
            flowerPlant,
            tallPlant,
            shortPlant,
            viola,
            smallShelfFlower,
            smallShelfPlant,
            smallShelfPeashooter,
            downwardsArrow
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

    const fadeOut = (elem: Sprite | AnimatedSprite) => {
        setInterval(() => {
            elem.alpha -= 0.1;
        }, 20);
        //app.stage.removeChild(elem);
    };

    const setupFloorItems = () => {
        bike.pivot.set(1182, -373);
        bike.interactive = true;
        bike.loop = false;
        bike.animationSpeed = 1;
        bike.onmouseover = () => {
            bike.gotoAndPlay(0);
        };
        bike.onmouseleave = () => {
            bike.gotoAndStop(0);
        };
    };

    const setupWall = () => {
        flag.pivot.set(678, -330);
        flag.interactive = true;
        flag.loop = false;
        flag.animationSpeed = 0.3;
        flag.onmouseenter = () => {
            isClickable = true;
        };
        flag.onmouseleave = () => {
            isClickable = false;
        };
        flag.onmouseup = () => {
            if (!flag.playing) flag.gotoAndPlay(0);
        };
        flag.onComplete = () => {
            flag.gotoAndStop(0);
        };

        viola.pivot.set(704, -176);
        viola.interactive = true;
        viola.loop = false;
        viola.animationSpeed = 0.3;
        viola.onmouseenter = () => {
            isClickable = true;
        };
        viola.onmouseleave = () => {
            isClickable = false;
        };
        viola.onmouseup = () => {
            if (!viola.playing) viola.gotoAndPlay(0);
        };
        viola.onComplete = () => {
            viola.gotoAndStop(0);
        };
    };

    const setupSmallShelf = () => {
        smallShelfPlant.pivot.set(898, -263);
        smallShelfPlant.interactive = true;
        smallShelfPlant.loop = false;
        smallShelfPlant.animationSpeed = 0.15;
        smallShelfPlant.onmouseover = () => {
            smallShelfPlant.gotoAndPlay(0);
        };
        smallShelfPlant.onComplete = () => {
            smallShelfPlant.gotoAndStop(0);
        };

        smallShelfPeashooter.pivot.set(740, -242);
        smallShelfPeashooter.interactive = true;
        smallShelfPeashooter.loop = false;
        smallShelfPeashooter.animationSpeed = 0.3;
        smallShelfPeashooter.onmouseover = () => {
            smallShelfPeashooter.gotoAndPlay(0);
        };
        smallShelfPeashooter.onComplete = () => {
            smallShelfPeashooter.gotoAndStop(0);
        };

        smallShelfFlower.pivot.set(650, -246);
        smallShelfFlower.interactive = true;
        smallShelfFlower.loop = false;
        smallShelfFlower.animationSpeed = 0.15;
        smallShelfFlower.onmouseover = () => {
            smallShelfFlower.gotoAndPlay(0);
        };
        smallShelfFlower.onComplete = () => {
            smallShelfFlower.gotoAndStop(0);
        };
    };

    const setupBed = () => {
        steve.pivot.set(660, -456);
        steve.interactive = true;
        steve.loop = false;
        steve.animationSpeed = 0.3;
        steve.onmouseover = () => {
            steve.gotoAndPlay(0);
        };
        steve.onComplete = () => {
            steve.gotoAndStop(0);
        };

        knight.pivot.set(756, -492);
        knight.interactive = true;
        knight.loop = false;
        knight.animationSpeed = 0.2;
        knight.onmouseover = () => {
            knight.gotoAndPlay(0);
        };
        knight.onComplete = () => {
            knight.gotoAndStop(0);
        };
    };

    const setupPlants = () => {
        shortPlant.pivot.set(1050, -432);
        shortPlant.interactive = true;
        shortPlant.loop = false;
        shortPlant.animationSpeed = 0.3;

        shortPlant.onmouseenter = () => {
            isClickable = true;
        };
        shortPlant.onmouseleave = () => {
            isClickable = false;
        };
        shortPlant.onmouseup = () => {
            if (!shortPlant.playing) shortPlant.gotoAndPlay(0);
        };
        shortPlant.onComplete = () => {
            shortPlant.gotoAndStop(0);
        };

        flowerPlant.pivot.set(-1, -690);
        flowerPlant.interactive = true;
        flowerPlant.loop = false;
        flowerPlant.animationSpeed = 0.3;
        flowerPlant.onmouseenter = () => {
            isClickable = true;
        };
        flowerPlant.onmouseleave = () => {
            isClickable = false;
        };
        flowerPlant.onmouseup = () => {
            if (!flowerPlant.playing) flowerPlant.gotoAndPlay(0);
        };
        flowerPlant.onComplete = () => {
            flowerPlant.gotoAndStop(0);
        };

        tallPlant.visible = false;
    };

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
            belmarContainer.removeChild(belmarLook);

            belmarTransitionOut.gotoAndPlay(0);

            belmarContainer.addChild(belmarTransitionOut);
            isClickable = false;
        };

        belmarLook.onclick = () => {
            belmarContainer.removeChild(belmarLook);

            belmarWave.gotoAndPlay(0);
            isClickable = true;

            belmarContainer.addChild(belmarWave);
        };

        belmarLook.onmouseover = () => {
            isClickable = true;
        };

        belmarDefault.onmouseout = () => {
            isClickable = false;
        };

        belmarWave.onComplete = () => {
            belmarContainer.removeChild(belmarWave);

            if (isClickable) {
                belmarLook.gotoAndPlay(33);
                belmarContainer.addChild(belmarLook);
            } else {
                belmarTransitionOut.gotoAndPlay(0);
                belmarContainer.addChild(belmarTransitionOut);
            }
        };

        belmarWave.onmouseout = () => {
            isClickable = false;
        };

        belmarTransitionOut.onComplete = () => {
            belmarContainer.removeChild(belmarTransitionOut);
            belmarContainer.addChild(belmarDefault);
        };

        belmarDefault.onmouseover = () => {
            belmarContainer.removeChild(belmarDefault);
            belmarLook.gotoAndPlay(0);
            belmarContainer.addChild(belmarLook);

            fadeOut(downwardsArrow);
        };

        belmarDefault.on('pointerdown', () => {
            belmarLook.onComplete = () => {
                belmarContainer.removeChild(belmarLook);
                belmarWave.gotoAndPlay(0);
                belmarContainer.addChild(belmarWave);
            };

            belmarContainer.removeChild(belmarDefault);

            belmarLook.gotoAndPlay(0);
            belmarContainer.addChild(belmarLook);

            fadeOut(downwardsArrow);
        });
    };

    const setupMisc = () => {
        downwardsArrow.pivot.set(270, -420);
        console.log('setting arrow scale');
        //downwardsArrow.scale.set(0.6, 0.6);
        downwardsArrow.filters = [
            new GlowFilter({
                distance: 15,
                outerStrength: 3,
                color: 0xffda87,
                quality: 0.5
            })
        ];

        const hover = () => {
            let up = true;
            setInterval(() => {
                const x = downwardsArrow.x;
                const y = downwardsArrow.y;

                downwardsArrow.position.set(x, up ? y - 2 : y + 2);
            }, 100);

            setInterval(() => {
                up = !up;
            }, 500);
        };

        hover();
    };

    const setupSprites = async () => {
        let scale = window.innerHeight / background.height;

        for (let i = 0; i < sprites.length; i++) {
            sprites[i].animationSpeed = 0.2;
            sprites[i].anchor.set(1, 0);
            sprites[i].position.set(app.renderer.width, 0);
            if (sprites[i].scale.x === 1 && sprites[i].scale.y === 1)
                sprites[i].scale.set(scale, scale);
        }
    };

    const drawScene = async () => {
        app.stage.removeChildren();

        await setupSprites();

        await setupBelmar();
        await setupRightShelf();
        await setupFloorItems();
        await setupWall();
        await setupBed();
        await setupSmallShelf();

        await setupMisc();
        await setupPlants();

        background.play();

        app.stage.addChild(background);
        app.stage.addChild(belmarContainer);
        app.stage.addChild(purplePlant);
        app.stage.addChild(speakerLeft);
        app.stage.addChild(speakerRight);
        app.stage.addChild(lightStrip);
        app.stage.addChild(bike);
        app.stage.addChild(flag);
        app.stage.addChild(knight);
        app.stage.addChild(steve);
        app.stage.addChild(flowerPlant);
        app.stage.addChild(tallPlant);
        app.stage.addChild(shortPlant);
        app.stage.addChild(viola);
        app.stage.addChild(smallShelfPlant);
        app.stage.addChild(smallShelfFlower);
        app.stage.addChild(smallShelfPeashooter);
        app.stage.addChild(downwardsArrow);
    };
    */
</script>

<div id="body">
    <Header />

    <h1
        bind:this={percentageText}
        style="position: absolute; left: 50%; transform: translate(-50%, 0); font-family: o4b; text-align: center"
    >
        <br />
        <br />
        <br />
        <br />
        <br />
        Loading...
        <br />
        {Math.trunc(100 * (itemsLoaded / totalItemsToLoad))}%
    </h1>

    <div class="app">
        <canvas bind:this={canvas} />
    </div>
</div>

<style>
</style>
