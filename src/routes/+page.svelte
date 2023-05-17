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
        Text,
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
        textboxPortrait,
        textbox,
        textboxMobile,
        roomWindow,
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
    import {
        TEXTBOX_MOBILE_HEIGHT,
        TEXTBOX_MOBILE_WIDTH,
        TEXTBOX_UI_HEIGHT,
        TEXTBOX_UI_WIDTH
    } from '$lib/consts';

    //import {Text} from '@pixi/text';

    let canvas: ICanvas;
    let app: Application;

    let belmarContainer: Container = new Container();
    let textboxContainer: Container = new Container();

    let animatedSprites = [
        belmarDefault,
        belmarLook,
        belmarTransitionOut,
        belmarWave,
        smallShelfPlant,
        smallShelfFlower,
        smallShelfPeashooter,
        roomWindow,
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

    let staticSprites = [
        downwardsArrow,
        textboxPortrait,
        textbox,
        textboxMobile
    ];

    let isClickable = false;

    let percentageText: any;

    let itemsLoaded = 0;
    let totalItemsToLoad = animatedSprites.length + staticSprites.length;

    let scale = 1;

    $: {
        if (canvas) {
            canvas.style!.cursor = isClickable ? 'pointer' : 'default';
        }
    }

    $: {
        if (itemsLoaded / totalItemsToLoad === 1) percentageText.remove();
    }

    /*async function displayText(text: string) {
        text.textContent = text;
    }*/

    // Gets a spritesheet's name and turns it into an AnimatedSprite
    async function loadAnimatedSprite(spriteSheetName: string) {
        const sheet = await Assets.load(`spritesheets/${spriteSheetName}.json`);
        let sprite = new AnimatedSprite(
            Object.values(sheet.textures) as Array<Texture>
        );

        return sprite;
    }

    // Sets basic properties to all sprites
    async function setupProps() {
        const bgTexture = await Texture.fromURL('sprites/background-img.png');
        background.sprite = background.sprite || Sprite.from(bgTexture);
        background.sprite.anchor.set(1, 0);
        background.sprite.position.set(app.renderer.width, 0);
        scale = window.innerHeight / bgTexture.height;
        background.sprite.scale.set(scale, scale);

        app.stage.addChild(background.sprite);

        for (let i = 0; i < animatedSprites.length; i++) {
            const spriteObject = animatedSprites[i];
            const sprite =
                spriteObject.sprite ||
                (await loadAnimatedSprite(spriteObject.name));

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

            if (spriteObject.rotation) {
                sprite.rotation = spriteObject.rotation;
            }

            if (spriteObject.anchor) {
                sprite.anchor.set(spriteObject.anchor.x, spriteObject.anchor.y);
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

            if (!spriteObject.dontAutoRender) fadeIn(sprite);
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

    const itemHover = (elem: Sprite | AnimatedSprite) => {
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

    const fadeOut = (elem: Sprite | AnimatedSprite | Container) => {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                elem.alpha -= 0.1;
                if (elem.alpha <= 0) {
                    clearInterval(interval);
                    app.stage.removeChild(elem);
                    resolve(null);
                }
            }, 20);
        });
    };

    const fadeIn = (elem: Sprite | AnimatedSprite | Container) => {
        return new Promise((resolve) => {
            elem.alpha = 0;
            app.stage.addChild(elem);
            var interval = setInterval(() => {
                elem.alpha += 0.05;
                if (elem.alpha >= 1) {
                    clearInterval(interval);
                    resolve(null);
                }
            }, 20);
        });
    };

    // Sets up behavior of "Belmar" character
    async function setupCharacter() {
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

        belmarDefault.sprite.onpointerdown = () => {
            if (!app.stage.children.includes(textboxContainer)) {
                fadeIn(textboxMobile.sprite as Sprite).then(() => {
                    window.onpointerup = () => {
                        fadeOut(textboxMobile.sprite as Sprite);
                        window.onpointerup = null;
                    };
                });
            }
        };

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

            if (!app.stage.children.includes(textboxContainer)) {
                fadeIn(textboxContainer).then(() => {
                    window.onclick = () => {
                        fadeOut(textboxContainer);
                        window.onclick = null;
                    };
                });
            }

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

    // Sets up behavior of textbox, sound icons, and item box
    async function setupGUI() {
        if (!textbox.sprite || !textboxPortrait.sprite) {
            return;
        }

        textboxContainer.addChild(textbox.sprite);
        textboxContainer.addChild(textboxPortrait.sprite);

        textboxContainer.children.forEach((textboxElement) => {
            if (textboxElement instanceof Sprite) {
                textboxElement.texture.on('update', () => {
                    textboxContainer.pivot.set(
                        (window.innerWidth - textboxContainer.width) / 2,
                        -(window.innerHeight - textboxContainer.height - 50)
                    );
                });
            }
        });

        const text = new Text(
            "Gah! I wasn't expecting you here \nso soon. I'm still cleaning up my \nroom, but check back in a couple \nof days.",
            {
                fontFamily: 'o4b',
                fontSize: 18,
                fill: 0xffffff,
                align: 'left'
            }
        );

        text.anchor.set(0, 0);
        //text.position.set(app.renderer.width - TEXTBOX_UI_WIDTH + 30, 26);
        if (text.scale.x === 1 && text.scale.y === 1) {
            text.scale.set(scale, scale);
        }

        //textboxContainer.addChild(text);

        textboxMobile.sprite?.texture.on('update', () => {
            textboxMobile.sprite?.pivot.set(
                (window.innerWidth - textboxMobile.sprite.width) / 2,
                -(window.innerHeight - textboxMobile.sprite.height)
            );

            console.log(window.innerHeight);
            console.log(textboxMobile.sprite?.scale);

            textboxMobile.sprite?.pivot.set(
                (window.innerWidth - textboxMobile.sprite.width) /
                    2 /
                    textboxMobile.sprite?.scale.x,
                -(window.innerHeight - textboxMobile.sprite?.height - 15) /
                    textboxMobile.sprite?.scale.y
            );
        });

        const mobileText = new Text(
            "Gah! I wasn't expecting you \nso soon. I'm still cleaning \nup my room, but check back \nin a couple of days.",
            {
                fontFamily: 'o4b',
                fontSize: 16,
                fill: 0xffffff,
                align: 'left'
            }
        );

        mobileText.anchor.set(0, 0);
        mobileText.position.set(app.renderer.width - 660, 26);
        if (mobileText.scale.x === 1 && mobileText.scale.y === 1) {
            mobileText.scale.set(scale, scale);
        }

        //textboxMobile.sprite?.addChild(mobileText);
    }

    async function render() {
        await setupProps();
        await setupCharacter();
        await setupGUI();

        // Added items to stage with fadeIn above. If you want to remove the fadeIn uncomment this and delete it above
        /*for (const spriteObject of animatedSprites) {
            if (spriteObject.sprite && !spriteObject.dontAutoRender) {
                app.stage.addChild(spriteObject.sprite);
            }
        }*/

        fadeIn(belmarContainer);
        //app.stage.addChild(belmarContainer);

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
                fadeIn(spriteObject.sprite);
                //app.stage.addChild(spriteObject.sprite);
            }
        }

        itemHover(downwardsArrow.sprite as Sprite);
    }

    onMount(async () => {
        app = new Application({
            height: window.innerHeight,
            width: window.innerWidth,
            view: canvas,
            backgroundAlpha: 0
        });

        await render();

        window.onresize = () => {
            location.reload();
        };
    });
</script>

<svelte:head>
    <title>Tomás Belmar | Software Developer</title>
</svelte:head>

<div id="body">
    <Header />

    <h1
        bind:this={percentageText}
        style="position: absolute; left: 50%; transform: translate(-50%, 0); font-family: o4b; text-align: center; color: white; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        5px 5px 0 #000;"
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
    @font-face {
        font-family: merchant-copy;
        src: url('https://fonts.cdnfonts.com/s/16592/HandwritingCR-2.woff');
    }
</style>
